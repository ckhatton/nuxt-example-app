// Electronics maths for the calculators: resistor colour codes, Ohm's law and
// LED series resistors

// 4-band resistor colours: digit (bands 1 and 2), multiplier (band 3) and
// tolerance in % (band 4)
export const BAND_COLOURS = [
  { name: 'Black', hex: '#1f1f1f', digit: 0, multiplier: 1 },
  { name: 'Brown', hex: '#7b3f00', digit: 1, multiplier: 10, tolerance: 1 },
  { name: 'Red', hex: '#d32f2f', digit: 2, multiplier: 100, tolerance: 2 },
  { name: 'Orange', hex: '#f57c00', digit: 3, multiplier: 1e3 },
  { name: 'Yellow', hex: '#fbc02d', digit: 4, multiplier: 1e4 },
  { name: 'Green', hex: '#388e3c', digit: 5, multiplier: 1e5, tolerance: 0.5 },
  { name: 'Blue', hex: '#1976d2', digit: 6, multiplier: 1e6, tolerance: 0.25 },
  { name: 'Violet', hex: '#7b1fa2', digit: 7, multiplier: 1e7, tolerance: 0.1 },
  { name: 'Grey', hex: '#757575', digit: 8, multiplier: 1e8, tolerance: 0.05 },
  { name: 'White', hex: '#f5f5f5', digit: 9, multiplier: 1e9 },
  { name: 'Gold', hex: '#c9a227', multiplier: 0.1, tolerance: 5 },
  { name: 'Silver', hex: '#b0b0b0', multiplier: 0.01, tolerance: 10 },
];

// The E12 series of standard resistor values, per decade
export const E12 = [1.0, 1.2, 1.5, 1.8, 2.2, 2.7, 3.3, 3.9, 4.7, 5.6, 6.8, 8.2];

const colour = (name) => BAND_COLOURS.find((band) => band.name === name);

// Rounds away floating point noise, e.g. 47 * 0.1 = 4.7000000000000002
const tidy = (value) => Number.parseFloat(value.toPrecision(12));

export function resistorValue(first, second, multiplier) {
  return tidy((colour(first).digit * 10 + colour(second).digit) * colour(multiplier).multiplier);
}

export function formatOhms(ohms) {
  const units = [
    [1e9, 'GΩ'],
    [1e6, 'MΩ'],
    [1e3, 'kΩ'],
  ];
  const [scale, unit] = units.find(([size]) => ohms >= size) ?? [1, 'Ω'];

  return `${Number.parseFloat((ohms / scale).toPrecision(3))} ${unit}`;
}

// Given exactly two of voltage (V), current (A) and resistance (Ω), works out
// the third and the power (W). Returns null for anything else.
export function ohmsLaw({ voltage, current, resistance }) {
  const known = [voltage, current, resistance].filter((value) => Number.isFinite(value));
  if (known.length !== 2) return null;

  let v = voltage;
  let i = current;
  let r = resistance;

  if (!Number.isFinite(v)) v = i * r;
  else if (!Number.isFinite(i)) i = r === 0 ? Number.NaN : v / r;
  else r = i === 0 ? Number.NaN : v / i;

  if (![v, i, r].every(Number.isFinite)) return null;

  return { voltage: tidy(v), current: tidy(i), resistance: tidy(r), power: tidy(v * i) };
}

// The smallest standard E12 value at or above the given resistance
export function nextE12(ohms) {
  if (!(ohms > 0)) return null;

  const decade = 10 ** Math.floor(Math.log10(ohms));
  const match = E12.find((value) => tidy(value * decade) >= tidy(ohms));

  return tidy(match ? match * decade : 10 * decade);
}

// Series resistor for an LED: supply and forward voltages (V) and current (mA).
// The standard resistor is rounded up, so the actual current and power use it.
export function ledResistor({ supply, forward, current }) {
  if (![supply, forward, current].every(Number.isFinite) || supply <= forward || current <= 0) {
    return null;
  }

  const drop = supply - forward;
  const exact = tidy(drop / (current / 1000));
  const standard = nextE12(exact);

  return {
    exact,
    standard,
    current: tidy((drop / standard) * 1000),
    power: tidy((drop * drop) / standard),
  };
}
