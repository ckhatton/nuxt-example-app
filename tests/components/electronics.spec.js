/**
 * @jest-environment jsdom
 */

import { mount } from '@vue/test-utils';
import Electronics from '@/components/Electronics.vue';

describe('Electronics component tests: ', () => {
  test('It shows the default resistor value', () => {
    const wrapper = mount(Electronics);
    expect(wrapper.find('.resistor-value').text()).toBe('4.7 kΩ ±5%');
  });

  test('It updates the resistor value when a band colour is picked', async () => {
    const wrapper = mount(Electronics);
    await wrapper.find('[aria-label="Multiplier: Orange"]').trigger('click');
    expect(wrapper.find('.resistor-value').text()).toBe('47 kΩ ±5%');
  });

  test('It works out Ohm\'s law from two values', async () => {
    const wrapper = mount(Electronics);
    expect(wrapper.find('.ohm-result').text()).toContain('0.009 A');

    await wrapper.find('.ohm-voltage').setValue('');
    await wrapper.find('.ohm-current').setValue(2);
    await wrapper.find('.ohm-resistance').setValue(5);
    expect(wrapper.find('.ohm-result').text()).toContain('10 V');
  });

  test('It asks for exactly two Ohm\'s law values', async () => {
    const wrapper = mount(Electronics);
    await wrapper.find('.ohm-current').setValue(1);
    expect(wrapper.find('.ohm-result').text()).toBe('Enter exactly two values.');
  });

  test('It sizes an LED resistor', async () => {
    const wrapper = mount(Electronics);
    expect(wrapper.find('.led-result').text()).toContain('150 Ω');

    await wrapper.find('.led-supply').setValue(9);
    expect(wrapper.find('.led-result').text()).toContain('390 Ω');
    expect(wrapper.find('.led-result').text()).toContain('17.9 mA');
  });
});
