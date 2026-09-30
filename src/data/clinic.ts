// Everything here is invented for the concept: clinic rooms, clinicians, patients and replies.

export const SLOTS = 12; // half-hour seats, 9:00 to 15:00
export const NOON_SLOT = 6;

export function slotTime(i: number): string {
  const m = 9 * 60 + i * 30;
  const h = Math.floor(m / 60);
  const mm = m % 60;
  return `${((h + 11) % 12) + 1}:${String(mm).padStart(2, '0')} ${h < 12 ? 'am' : 'pm'}`;
}

export type Chair = { room: string; who: string };
export const CHAIRS: Chair[] = [
  { room: 'Room 1', who: 'Dr Ilves' },
  { room: 'Room 2', who: 'Dr Marsh' },
  { room: 'Room 3', who: 'Hygiene, P. Quill' },
  { room: 'Room 4', who: 'Dr Boateng' },
];

export type Appt = { id: string; chair: number; s: number; l: number; ini: string; name: string };

// `open: true` starts the day with that seat already returned, so the demo has a story on load.
export const APPTS: (Appt & { open?: boolean })[] = [
  { id: 'a1', chair: 0, s: 0, l: 2, ini: 'MT', name: 'M. Tran' },
  { id: 'a2', chair: 0, s: 3, l: 1, ini: 'RH', name: 'R. Haddad' },
  { id: 'a3', chair: 0, s: 5, l: 2, ini: 'JO', name: 'J. Osei' },
  { id: 'a4', chair: 0, s: 8, l: 2, ini: 'LK', name: 'L. Kaur' },
  { id: 'a5', chair: 0, s: 11, l: 1, ini: 'NP', name: 'N. Pereira' },
  { id: 'b1', chair: 1, s: 0, l: 2, ini: 'AD', name: 'A. Dubois' },
  { id: 'b2', chair: 1, s: 2, l: 2, ini: 'FE', name: 'F. Eze', open: true },
  { id: 'b3', chair: 1, s: 5, l: 1, ini: 'CB', name: 'C. Brandt' },
  { id: 'b4', chair: 1, s: 7, l: 3, ini: 'VS', name: 'V. Sato' },
  { id: 'b5', chair: 1, s: 10, l: 2, ini: 'OM', name: 'O. Mwangi' },
  { id: 'c1', chair: 2, s: 0, l: 1, ini: 'ZT', name: 'Z. Toth' },
  { id: 'c2', chair: 2, s: 2, l: 1, ini: 'DH', name: 'D. Hale' },
  { id: 'c3', chair: 2, s: 3, l: 2, ini: 'YI', name: 'Y. Ito' },
  { id: 'c4', chair: 2, s: 6, l: 2, ini: 'WQ', name: 'W. Quinn' },
  { id: 'c5', chair: 2, s: 9, l: 1, ini: 'EK', name: 'E. Kowal' },
  { id: 'c6', chair: 2, s: 10, l: 2, ini: 'GF', name: 'G. Fontaine' },
  { id: 'd1', chair: 3, s: 1, l: 2, ini: 'HB', name: 'H. Bianchi' },
  { id: 'd2', chair: 3, s: 4, l: 3, ini: 'SN', name: 'S. Nwosu' },
  { id: 'd3', chair: 3, s: 8, l: 1, ini: 'TU', name: 'T. Underhill' },
  { id: 'd4', chair: 3, s: 9, l: 3, ini: 'BA', name: 'B. Aziz' },
];

export type Patient = {
  id: string;
  name: string;
  need: number; // seats (30 min each)
  when: 'any' | 'am' | 'pm';
  reply: 'yes' | 'none';
  delay: number; // illustrative minutes before they answer
};

// Order is the waitlist order. Position 4 (H. Reyes) is the first who fits the opening gap.
export const WAITLIST: Patient[] = [
  { id: 'p1', name: 'D. Farrow', need: 3, when: 'any', reply: 'yes', delay: 2 },
  { id: 'p2', name: 'S. Lindqvist', need: 2, when: 'any', reply: 'none', delay: 4 },
  { id: 'p3', name: 'K. Amadi', need: 1, when: 'pm', reply: 'yes', delay: 3 },
  { id: 'p4', name: 'H. Reyes', need: 2, when: 'any', reply: 'yes', delay: 2 },
  { id: 'p5', name: 'T. Nakamura', need: 1, when: 'any', reply: 'yes', delay: 3 },
  { id: 'p6', name: 'B. Oyelaran', need: 2, when: 'am', reply: 'yes', delay: 2 },
  { id: 'p7', name: 'C. Wray', need: 1, when: 'pm', reply: 'yes', delay: 5 },
];
