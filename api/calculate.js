import express from 'express';
const app = express();

app.use(express.json());

app.get('/api/calculate', (req, res) => {
  res.status(405).json({
    error: true,
    text: `Sorry! You can't get me! 😝`
  });
});

app.post('/api/calculate', (req, res) => {
  const answer = req.body.operand01 + req.body.operand02;
  res.json({
    error: false,
    text: `The answer is: ${answer}`
  });
  res.status(200).end();
});

export default app;
