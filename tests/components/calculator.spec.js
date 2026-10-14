import { describe, test, expect, vi, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { registerEndpoint } from '@nuxt/test-utils/runtime';
import { readBody, setResponseStatus } from 'h3';
import Calculator from '@/components/Calculator.vue';

// A stand-in for the real /api/calculate endpoint; each test sets the reply
let received;
let reply;

registerEndpoint('/api/calculate', {
  method: 'POST',
  handler: async (event) => {
    received = await readBody(event);
    setResponseStatus(event, reply.status);
    return reply.body;
  },
});

describe('Calculator component tests: ', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('It posts both operands to the API', async () => {
    reply = { status: 200, body: { error: false, text: '' } };
    const wrapper = mount(Calculator);
    const inputs = wrapper.findAll('input');
    await inputs[0].setValue(2);
    await inputs[1].setValue(3);
    await wrapper.find('form').trigger('submit');
    await vi.waitFor(() => expect(received).toEqual({ operand01: 2, operand02: 3 }));
  });

  test('It shows the answer from the API', async () => {
    reply = { status: 200, body: { error: false, text: 'The answer is: 5' } };
    const wrapper = mount(Calculator);
    await wrapper.find('form').trigger('submit');
    await vi.waitFor(() => expect(wrapper.text()).toContain('The answer is: 5'));
  });

  test('It shows the error message when the API fails', async () => {
    vi.spyOn(console, 'log').mockImplementation(() => {});
    reply = { status: 500, body: { error: true, text: 'Request body could not be read.' } };
    const wrapper = mount(Calculator);
    await wrapper.find('form').trigger('submit');
    await vi.waitFor(() => expect(wrapper.text()).toContain('Request body could not be read.'));
  });
});
