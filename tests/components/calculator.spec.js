/**
 * @jest-environment jsdom
 */

import { mount, flushPromises } from '@vue/test-utils';
import Calculator from '@/components/Calculator.vue';

describe('Calculator component tests: ', () => {
  afterEach(() => {
    delete global.$fetch;
  });

  test('It posts both operands to the API', async () => {
    global.$fetch = jest.fn().mockResolvedValue({ error: false, text: '' });
    const wrapper = mount(Calculator);
    const inputs = wrapper.findAll('input');
    await inputs[0].setValue(2);
    await inputs[1].setValue(3);
    await wrapper.find('form').trigger('submit');
    expect(global.$fetch).toHaveBeenCalledWith('/api/calculate', {
      method: 'POST',
      body: { operand01: 2, operand02: 3 },
    });
  });

  test('It shows the answer from the API', async () => {
    global.$fetch = jest
      .fn()
      .mockResolvedValue({ error: false, text: 'The answer is: 5' });
    const wrapper = mount(Calculator);
    await wrapper.find('form').trigger('submit');
    await flushPromises();
    expect(wrapper.text()).toContain('The answer is: 5');
  });

  test('It shows the error message when the API fails', async () => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
    global.$fetch = jest.fn().mockRejectedValue({
      data: { error: true, text: 'Request body could not be read.' },
    });
    const wrapper = mount(Calculator);
    await wrapper.find('form').trigger('submit');
    await flushPromises();
    expect(wrapper.text()).toContain('Request body could not be read.');
  });
});
