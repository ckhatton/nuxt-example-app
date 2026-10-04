/**
 * @jest-environment jsdom
 */

import { mount } from '@vue/test-utils';
import Footer from '@/components/Footer.vue';

describe('Footer component tests: ', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('It renders placeholders before the clock starts', () => {
    const wrapper = mount(Footer);
    expect(wrapper.find('.time').text()).toBe('00:00:00');
    expect(wrapper.find('.date').text()).toBe('--/--/----');
  });

  test('It shows the time and date after a second', async () => {
    const wrapper = mount(Footer);
    jest.advanceTimersByTime(1000);
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.time').text()).not.toBe('00:00:00');
    expect(wrapper.find('.date').text()).not.toBe('--/--/----');
  });

  test('It stops the clock when unmounted', () => {
    const clearIntervalSpy = jest.spyOn(global, 'clearInterval');
    const wrapper = mount(Footer);
    const { timerID } = wrapper.vm;
    wrapper.unmount();
    expect(clearIntervalSpy).toHaveBeenCalledWith(timerID);
  });
});
