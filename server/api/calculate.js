export default defineEventHandler(async (event) => {
  if (event.node.req.method === 'GET') {
    event.node.res.statusCode = 405;

    return {
      error: true,
      text: `Sorry! You can't get me! 😝`,
    };
  }

  if (event.node.req.method === 'POST') {
    const body = await readBody(event).catch(() => {
      event.node.res.statusCode = 500;

      return {
        error: true,
        text: 'Request body could not be read.',
      }
    });
    const answer = body.operand01 + body.operand02;

    event.node.res.statusCode = 200;

    return {
      error: false,
      text: `The answer is: ${answer}`,
    };
  }
});
