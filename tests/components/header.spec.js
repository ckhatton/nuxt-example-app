/**
 * @jest-environment jsdom
 */

import { mount } from '@vue/test-utils';
import Header from '@/components/Header.vue';

describe('Header component tests: ', () => {
  test('It is a Vue component', () => {
    const wrapper = mount(Header);
    expect(wrapper.isVisible()).toBeTruthy();
  });

  test('It renders my name', () => {
    const name = 'Nuxt v3 Example App';
    const wrapper = mount(Header);
    expect(wrapper.html()).toContain(name);
  });
});
