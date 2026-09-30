import { APPTS, CHAIRS, NOON_SLOT, SLOTS, WAITLIST, slotTime, type Patient } from '../data/clinic';

type Seat = {
  id: string;
  chair: number;
  s: number;
  l: number;
  ini: string;
  name: string;
  state: 'booked' | 'open' | 'new';
};
type Q = Patient & { state: 'waiting' | 'booked'; tag: string; slot: string };

const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const sleep = (ms: number) => (reduce ? Promise.resolve() : new Promise<void>((r) => setTimeout(r, ms)));
const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);
const mins = (n: number) => `${n * 30} min`;
const initials = (name: string) =>
  name
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .toUpperCase();

const hourMark = (i: number) => {
  if (i % 2) return '';
  const h = 9 + i / 2;
  return h === 12 ? '12 pm' : String(((h + 11) % 12) + 1);
};

export function mountStage(root: HTMLElement) {
  const planEl = root.querySelector<HTMLElement>('[data-plan]')!;
  const queueEl = root.querySelector<HTMLElement>('[data-queue]')!;
  const logEl = root.querySelector<HTMLElement>('[data-log]')!;
  const statusEl = root.querySelector<HTMLElement>('[data-status]')!;
  const resetBtn = root.querySelector<HTMLButtonElement>('[data-reset]')!;

  let seats: Seat[] = [];
  let queue: Q[] = [];
  let gen = 0;
  let chain: Promise<void> = Promise.resolve();
  let nextId = 0;
  let started = false;

  const load = () => {
    gen++;
    chain = Promise.resolve();
    seats = APPTS.map((a) => ({ id: a.id, chair: a.chair, s: a.s, l: a.l, ini: a.ini, name: a.name, state: a.open ? 'open' : 'booked' }));
    queue = WAITLIST.map((p) => ({ ...p, state: 'waiting', tag: '', slot: '' }));
    logEl.innerHTML = '';
    setStatus('Seat returned. Offers start now.');
    renderPlan();
    renderQueue();
  };

  const setStatus = (t: string) => {
    statusEl.textContent = t;
  };

  const log = (min: number, text: string, kind: string) => {
    const li = document.createElement('li');
    li.className = `k-${kind}`;
    li.innerHTML = `<time>+${min} min</time><span>${esc(text)}</span>`;
    logEl.appendChild(li);
    while (logEl.children.length > 14) logEl.firstElementChild!.remove();
    logEl.scrollTop = logEl.scrollHeight;
  };

  function renderPlan(focusId?: string) {
    const times = `<div class="col times" aria-hidden="true"><div class="head"></div><div class="slots">${Array.from({ length: SLOTS }, (_, i) => `<span class="tick" style="--i:${i}">${hourMark(i)}</span>`).join('')}${seats.filter((s) => s.state === 'open').map((s) => `<span class="beat" style="--s:${s.s};--l:${s.l}"></span>`).join('')}</div></div>`;
    const cols = CHAIRS.map((c, ci) => {
      const cells = Array.from({ length: SLOTS }, (_, i) => `<span class="cell" style="--i:${i}" aria-hidden="true"></span>`).join('');
      const items = seats
        .filter((s) => s.chair === ci)
        .map((s) => {
          const t = slotTime(s.s);
          const len = mins(s.l);
          const style = `style="--s:${s.s};--l:${s.l}"`;
          if (s.state === 'open') {
            return `<button type="button" class="seat is-open" data-id="${s.id}" aria-disabled="true" ${style} aria-label="${c.room}, ${t}, ${len}: seat returned, being offered to the waitlist"><span class="ini">Open</span><span class="len">${len}</span></button>`;
          }
          const flag = s.state === 'new' ? '<span class="flag">New</span>' : '';
          const what = s.state === 'new' ? `refilled by ${esc(s.name)}` : esc(s.name);
          return `<button type="button" class="seat is-${s.state}" data-id="${s.id}" ${style} aria-label="${c.room}, ${t}, ${len}, ${what}. Cancel this appointment"><span class="ini">${esc(s.ini)}</span><span class="len">${len}</span>${flag}</button>`;
        })
        .join('');
      return `<div class="col"><div class="head"><b>${c.room}</b><span>${esc(c.who)}</span></div><div class="slots">${cells}${items}</div></div>`;
    }).join('');
    planEl.innerHTML = times + cols;
    if (focusId) planEl.querySelector<HTMLElement>(`[data-id="${focusId}"]`)?.focus();
  }

  function renderQueue() {
    const when = { any: 'any time', am: 'mornings only', pm: 'afternoons only' };
    queueEl.innerHTML = queue
      .map((p, i) => {
        const st = p.state === 'booked' ? `Booked, ${p.slot}` : p.tag || 'Waiting';
        const cls = p.state === 'booked' ? 'is-booked' : p.tag.startsWith('Offered') ? 'is-offered' : p.tag.startsWith('Skipped') ? 'is-skipped' : '';
        return `<li class="${cls}"><b class="pos">${i + 1}</b><span class="nm">${esc(p.name)}</span><span class="meta">${mins(p.need)}, ${when[p.when]}</span><span class="st">${esc(st)}</span></li>`;
      })
      .join('');
  }

  const misfit = (p: Q, s: Seat): string => {
    if (p.need > s.l) return `needs ${mins(p.need)}, gap is ${mins(s.l)}`;
    if (p.when === 'am' && s.s >= NOON_SLOT) return 'mornings only';
    if (p.when === 'pm' && s.s < NOON_SLOT) return 'afternoons only';
    return '';
  };

  async function cycle(seat: Seat, g: number) {
    const where = `${CHAIRS[seat.chair].room}, ${slotTime(seat.s)}`;
    let elapsed = 0;
    log(0, `Seat returned: ${where}, ${mins(seat.l)}.`, 'open');
    setStatus(`${where} is open. Offering it down the waitlist.`);
    await sleep(700);
    for (const p of queue) {
      if (g !== gen) return;
      if (p.state !== 'waiting') continue;
      const why = misfit(p, seat);
      if (why) {
        p.tag = `Skipped: ${why}`;
        renderQueue();
        log(elapsed, `${p.name} skipped (${why}). Keeps their place.`, 'skip');
        await sleep(650);
        if (g !== gen) return;
        continue;
      }
      p.tag = 'Offered by text';
      renderQueue();
      log(elapsed, `Offered to ${p.name} by text.`, 'offer');
      await sleep(1000);
      if (g !== gen) return;
      elapsed += p.delay;
      if (p.reply === 'yes') {
        p.state = 'booked';
        p.slot = `${slotTime(seat.s)}, ${CHAIRS[seat.chair].room}`;
        p.tag = '';
        const left = seat.l - p.need;
        Object.assign(seat, { l: p.need, ini: initials(p.name), name: p.name, state: 'new' });
        log(elapsed, `${p.name} said yes. Diary updated.`, 'fill');
        setStatus(`Filled by ${p.name}, ${elapsed} minutes after it opened (illustrative).`);
        if (left > 0) {
          const rest: Seat = { id: `x${nextId++}`, chair: seat.chair, s: seat.s + p.need, l: left, ini: '', name: '', state: 'open' };
          seats.push(rest);
          renderPlan();
          renderQueue();
          await sleep(600);
          if (g !== gen) return;
          log(elapsed, `${mins(left)} left over goes back on sale.`, 'open');
          return cycle(rest, g);
        }
        renderPlan();
        finish();
        return;
      }
      p.tag = 'No reply, moved on';
      renderQueue();
      log(elapsed, `${p.name}: no reply after ${p.delay} min. Moved on.`, 'skip');
      await sleep(500);
    }
    if (g !== gen) return;
    log(elapsed, 'No one left who fits. The seat stays open for the front desk.', 'end');
    setStatus(`${where} stays open. Nobody on the list fits it, so it is handed back to the desk.`);
    finish();
  }

  const finish = () => {
    queue.forEach((p) => {
      if (p.state === 'waiting') p.tag = '';
    });
    renderQueue();
  };

  planEl.addEventListener('click', (e) => {
    const b = (e.target as HTMLElement).closest<HTMLButtonElement>('.seat');
    if (!b) return;
    const seat = seats.find((s) => s.id === b.dataset.id);
    if (!seat || seat.state === 'open') return;
    seat.state = 'open';
    seat.ini = '';
    const g = gen;
    renderPlan(seat.id);
    chain = chain.then(() => cycle(seat, g));
  });

  resetBtn.addEventListener('click', () => {
    load();
    started = true;
    chain = chain.then(() => cycle(seats.find((s) => s.state === 'open')!, gen));
    resetBtn.focus();
  });

  load();
  const start = () => {
    if (started) return;
    started = true;
    const open = seats.find((s) => s.state === 'open')!;
    const g = gen;
    setTimeout(() => void (chain = chain.then(() => cycle(open, g))), reduce ? 0 : 900);
  };
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (es) => {
        if (es.some((x) => x.isIntersecting)) {
          io.disconnect();
          start();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(planEl);
  } else start();
}
