/**
 * @jest-environment jsdom
 */

import { mount } from '@vue/test-utils';
import Testing from '@/components/Testing.vue';

describe('Testing component tests: ', () => {
  test('It renders the heading', () => {
    const wrapper = mount(Testing);
    expect(wrapper.find('h2').text()).toContain('Testing');
  });

  test('It links to the tests on GitHub', () => {
    const wrapper = mount(Testing);
    expect(wrapper.find('a').attributes('href')).toContain(
      'github.com/ckhatton/nuxt-example-app',
    );
  });
});
