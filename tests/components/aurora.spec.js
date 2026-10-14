/**
 * @jest-environment jsdom
 */

import { mount } from '@vue/test-utils';
import Aurora from '@/components/Aurora.vue';

describe('Aurora component tests: ', () => {
  test('It renders the colour blobs, dots and spotlight', () => {
    const wrapper = mount(Aurora);
    expect(wrapper.findAll('.blob')).toHaveLength(4);
    expect(wrapper.find('.dots').exists()).toBeTruthy();
    expect(wrapper.find('.spotlight').exists()).toBeTruthy();
  });

  test('It is hidden from screen readers', () => {
    const wrapper = mount(Aurora);
    expect(wrapper.attributes('aria-hidden')).toBe('true');
  });

  test('It moves the spotlight with the mouse', () => {
    const wrapper = mount(Aurora, { attachTo: document.body });
    window.dispatchEvent(Object.assign(new Event('pointermove'), { clientX: 120, clientY: 80 }));
    expect(wrapper.element.style.getPropertyValue('--x')).toBe('120px');
    expect(wrapper.element.style.getPropertyValue('--y')).toBe('80px');
    wrapper.unmount();
  });
});
