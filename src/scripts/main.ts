import { mountStage } from './stage';
import { mountCalc, mountPricing, mountSignup } from './calc';

const q = <T extends HTMLElement>(s: string) => document.querySelector<T>(s);

const stage = q('[data-stage]');
if (stage) mountStage(stage);
const calc = q('[data-calc]');
if (calc) mountCalc(calc);
const pricing = q('[data-pricing]');
if (pricing) mountPricing(pricing);
const signup = q<HTMLFormElement>('[data-signup]');
if (signup) mountSignup(signup);

// Dock: mark the section in view.
const links = [...document.querySelectorAll<HTMLAnchorElement>('.dock a[href^="#"]')];
const map = new Map(links.map((a) => [a.getAttribute('href')!.slice(1), a]));
if ('IntersectionObserver' in window && map.size) {
  const io = new IntersectionObserver(
    (es) => {
      es.forEach((e) => {
        if (!e.isIntersecting) return;
        links.forEach((a) => a.removeAttribute('aria-current'));
        map.get(e.target.id)?.setAttribute('aria-current', 'location');
      });
    },
    { rootMargin: '-45% 0px -50% 0px' }
  );
  map.forEach((_, id) => {
    const el = document.getElementById(id);
    if (el) io.observe(el);
  });
}
