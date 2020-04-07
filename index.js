const express = require('express');
const app = express();

app.get('/', (req, res, next) => {
  res.json({ hi: 'there' });
});

app.listen(5000);