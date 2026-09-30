// Illustrative pricing for a fictional product.
export type Plan = {
  id: 'single' | 'clinic' | 'group';
  name: string;
  rooms: string;
  monthly: number | null;
  lines: string[];
};

export const PLANS: Plan[] = [
  {
    id: 'single',
    name: 'Single room',
    rooms: '1 room',
    monthly: 49,
    lines: ['One diary, one waitlist', 'Offers by text and email', 'Fit rules: length, day, time of day'],
  },
  {
    id: 'clinic',
    name: 'Small clinic',
    rooms: '2 to 6 rooms',
    monthly: 129,
    lines: ['Everything in Single room', 'Rules per clinician', 'Consent records and a full offer log'],
  },
  {
    id: 'group',
    name: 'Group',
    rooms: '7 or more rooms',
    monthly: null,
    lines: ['Several sites, one waitlist each', 'Set up with you by phone', 'Priced after a short call'],
  },
];

// Annual billing is ten months for twelve.
export const annualMonthly = (m: number) => Math.round((m * 10) / 12);

export const planForRooms = (rooms: number) => (rooms <= 1 ? PLANS[0] : PLANS[1]);
