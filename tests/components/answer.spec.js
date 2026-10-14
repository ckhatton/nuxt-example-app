/**
 * @jest-environment jsdom
 */

import { mount } from '@vue/test-utils';
import Answer from '@/components/Answer.vue';

describe('Answer component tests: ', () => {
  test('It labels and shows the answer', () => {
    const wrapper = mount(Answer, { slots: { default: '42' } });
    expect(wrapper.find('.label').text()).toBe('Answer');
    expect(wrapper.find('.value').text()).toBe('42');
  });

  test('It asks to check the input when there is an error', () => {
    const wrapper = mount(Answer, { props: { error: true }, slots: { default: 'Oops' } });
    expect(wrapper.find('.label').text()).toBe('Check your input');
    expect(wrapper.classes()).toContain('error');
  });
});
