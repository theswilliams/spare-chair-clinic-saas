import { annualMonthly, planForRooms } from '../data/plans';

const money = new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 });
const WEEKS = 4.33;

export function mountCalc(root: HTMLElement) {
  const get = (n: string) => root.querySelector<HTMLInputElement>(`[name="${n}"]`)!;
  const out = root.querySelector<HTMLElement>('[data-result]')!;
  const fields = ['rooms', 'appts', 'miss', 'refill', 'value'].map(get);

  const run = () => {
    const [rooms, appts, miss, refill, value] = fields.map((f) => Number(f.value));
    fields.forEach((f) => {
      const o = root.querySelector<HTMLOutputElement>(`output[for="${f.id}"]`);
      if (!o) return;
      const v = Number(f.value);
      o.textContent = f.name === 'miss' || f.name === 'refill' ? `${v}%` : f.name === 'value' ? money.format(v) : String(v);
      f.style.setProperty('--fill', `${((v - Number(f.min)) / (Number(f.max) - Number(f.min))) * 100}%`);
    });
    const lost = appts * (miss / 100);
    const back = lost * (refill / 100);
    const gross = back * value * WEEKS;
    const plan = planForRooms(rooms);
    const cost = annualMonthly(plan.monthly!);
    const net = gross - cost;
    const r = (n: number) => (n < 10 ? Math.round(n * 10) / 10 : Math.round(n));
    const tail =
      net > 0
        ? `After the ${plan.name} plan (${money.format(cost)} a month on annual billing), that is ${money.format(net)} a month left over.`
        : `That does not cover the ${plan.name} plan (${money.format(cost)} a month on annual billing). At these numbers it would not pay for itself.`;
    out.innerHTML = `About <b>${r(lost)}</b> seats a week go empty. If Spare Chair refilled <b>${refill}%</b> of them, that is <b>${r(back)}</b> a week, worth about <b>${money.format(gross)}</b> a month. ${tail}`;
  };
  root.addEventListener('input', run);
  run();
}

export function mountPricing(root: HTMLElement) {
  const sw = root.querySelector<HTMLButtonElement>('[data-switch]')!;
  const prices = root.querySelectorAll<HTMLElement>('[data-monthly]');
  const notes = root.querySelectorAll<HTMLElement>('[data-bill]');
  const set = (annual: boolean) => {
    sw.setAttribute('aria-checked', String(annual));
    prices.forEach((p) => {
      const m = Number(p.dataset.monthly);
      p.textContent = money.format(annual ? annualMonthly(m) : m);
    });
    notes.forEach((n) => (n.textContent = annual ? 'a month, billed yearly' : 'a month, billed monthly'));
  };
  sw.addEventListener('click', () => set(sw.getAttribute('aria-checked') !== 'true'));
  set(false);
}

export function mountSignup(form: HTMLFormElement) {
  const email = form.querySelector<HTMLInputElement>('[name="email"]')!;
  const err = form.querySelector<HTMLElement>('[data-err]')!;
  const done = form.querySelector<HTMLElement>('[data-done]')!;
  const btn = form.querySelector<HTMLButtonElement>('button[type="submit"]')!;
  form.noValidate = true;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    done.hidden = true;
    const ok = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.value.trim());
    email.setAttribute('aria-invalid', String(!ok));
    err.textContent = ok ? '' : 'Enter an email address like name@clinic.example.';
    if (!ok) return email.focus();
    btn.disabled = true;
    btn.dataset.loading = 'true';
    btn.textContent = 'Checking';
    setTimeout(() => {
      btn.disabled = false;
      delete btn.dataset.loading;
      btn.textContent = 'Start free trial';
      done.hidden = false;
      done.focus();
    }, 700);
  });
  email.addEventListener('input', () => {
    if (email.getAttribute('aria-invalid') === 'true') {
      email.setAttribute('aria-invalid', 'false');
      err.textContent = '';
    }
  });
}
