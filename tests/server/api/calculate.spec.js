// @vitest-environment node
import { describe, test, expect, vi } from 'vitest';

// Stand in for the Nitro/H3 auto-imports used by the handler
vi.stubGlobal('defineEventHandler', (handler) => handler);
vi.stubGlobal('readBody', (event) => Promise.resolve(event.body));

const { default: handler } = await import('~~/server/api/calculate.js');

const createEvent = (method, body) => ({
  node: { req: { method }, res: {} },
  body,
});

describe('Calculate API tests: ', () => {
  test('It refuses GET requests', async () => {
    const event = createEvent('GET');
    const response = await handler(event);
    expect(event.node.res.statusCode).toBe(405);
    expect(response.error).toBe(true);
  });

  test('It adds the two operands', async () => {
    const event = createEvent('POST', { operand01: 2, operand02: 3 });
    const response = await handler(event);
    expect(event.node.res.statusCode).toBe(200);
    expect(response).toEqual({ error: false, text: 'The answer is: 5' });
  });

  test('It adds numeric strings rather than joining them', async () => {
    const event = createEvent('POST', { operand01: '2', operand02: '3' });
    const response = await handler(event);
    expect(response.text).toBe('The answer is: 5');
  });

  test('It rejects operands that are not numbers', async () => {
    const event = createEvent('POST', { operand01: 'two', operand02: 3 });
    const response = await handler(event);
    expect(event.node.res.statusCode).toBe(500);
    expect(response.error).toBe(true);
  });

  test('It rejects a missing body', async () => {
    const event = createEvent('POST', undefined);
    const response = await handler(event);
    expect(response.error).toBe(true);
  });
});
