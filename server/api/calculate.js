export default defineEventHandler(async (event) => {
  if (event.node.req.method === 'GET') {
    event.node.res.statusCode = 405;

    return {
      error: true,
      text: `Sorry! You can't get me! 😝`,
    };
  }

  if (event.node.req.method === 'POST') {
    const body = (await readBody(event).catch(() => null)) ?? {};
    const operand01 = parseFloat(body.operand01);
    const operand02 = parseFloat(body.operand02);

    if (isNaN(operand01) || isNaN(operand02)) {
      event.node.res.statusCode = 500;

      return {
        error: true,
        text: 'Request body could not be read.',
      };
    }

    const answer = operand01 + operand02;

    event.node.res.statusCode = 200;

    return {
      error: false,
      text: `The answer is: ${answer}`,
    };
  }
});
