import { formatOhms, ledResistor, nextE12, ohmsLaw, resistorValue } from '~/utils/electronics';

describe('Electronics maths tests: ', () => {
  test('It reads a resistor colour code', () => {
    expect(resistorValue('Yellow', 'Violet', 'Red')).toBe(4700);
    expect(resistorValue('Brown', 'Black', 'Black')).toBe(10);
    expect(resistorValue('Yellow', 'Violet', 'Gold')).toBe(4.7);
  });

  test('It formats resistances with units', () => {
    expect(formatOhms(4.7)).toBe('4.7 Ω');
    expect(formatOhms(4700)).toBe('4.7 kΩ');
    expect(formatOhms(1000000)).toBe('1 MΩ');
    expect(formatOhms(2200000000)).toBe('2.2 GΩ');
  });

  test('It works out the missing Ohm\'s law value and the power', () => {
    expect(ohmsLaw({ voltage: 9, current: Number.NaN, resistance: 1000 })).toEqual({
      voltage: 9,
      current: 0.009,
      resistance: 1000,
      power: 0.081,
    });
    expect(ohmsLaw({ voltage: Number.NaN, current: 2, resistance: 5 }).voltage).toBe(10);
    expect(ohmsLaw({ voltage: 12, current: 3, resistance: Number.NaN }).resistance).toBe(4);
  });

  test('It needs exactly two Ohm\'s law values, and avoids dividing by zero', () => {
    expect(ohmsLaw({ voltage: 9, current: 1, resistance: 9 })).toBeNull();
    expect(ohmsLaw({ voltage: 9, current: Number.NaN, resistance: Number.NaN })).toBeNull();
    expect(ohmsLaw({ voltage: 9, current: Number.NaN, resistance: 0 })).toBeNull();
  });

  test('It rounds up to the next standard E12 value', () => {
    expect(nextE12(150)).toBe(150);
    expect(nextE12(151)).toBe(180);
    expect(nextE12(9.9)).toBe(10);
    expect(nextE12(1000)).toBe(1000);
    expect(nextE12(0)).toBeNull();
  });

  test('It sizes an LED series resistor', () => {
    expect(ledResistor({ supply: 5, forward: 2, current: 20 })).toEqual({
      exact: 150,
      standard: 150,
      current: 20,
      power: 0.06,
    });
    expect(ledResistor({ supply: 9, forward: 2, current: 20 })).toEqual({
      exact: 350,
      standard: 390,
      current: 17.9487179487,
      power: 0.125641025641,
    });
  });

  test('It refuses an LED supply at or below the forward voltage', () => {
    expect(ledResistor({ supply: 2, forward: 2, current: 20 })).toBeNull();
    expect(ledResistor({ supply: 5, forward: 2, current: 0 })).toBeNull();
  });
});
