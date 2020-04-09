require('dotenv').config();

const express = require('express');
const passport = require('passport');
const morgan = require('morgan');
const authRouter = require('./routes/authRouter');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(morgan('dev'));
app.use(passport.initialize());

require('./services/passport');
require('./db/connect');

app.use('/auth/google', authRouter);

app.get('/', (req, res, next) => {
  res.send('Homepage route');
});

app.listen(PORT, () => {
  console.log(`Express app up at port: ${PORT}`);
});
