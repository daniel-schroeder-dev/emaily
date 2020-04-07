const express = require('express');

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req, res, next) => {
  res.json({ hi: 'there' });
});

app.listen(PORT, () => {
  console.log(`Express app up at port: ${PORT}`);
});