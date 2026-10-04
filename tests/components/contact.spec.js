/**
 * @jest-environment jsdom
 */

import { mount } from '@vue/test-utils';
import Contact from '@/components/Contact.vue';

describe('Contact component tests: ', () => {
  test('It renders my name', () => {
    const wrapper = mount(Contact);
    expect(wrapper.find('h3').text()).toBe('Christopher Hatton');
  });

  test('It links to my email address', () => {
    const wrapper = mount(Contact);
    expect(wrapper.find('a[href^="mailto:"]').attributes('href')).toBe(
      'mailto:mail@ckhatton.com',
    );
  });

  test('It links to my phone number', () => {
    const wrapper = mount(Contact);
    expect(wrapper.find('a[href^="tel:"]').attributes('href')).toBe(
      'tel:+447961711210',
    );
  });
});
