require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const passport = require('passport');
const cookieSession = require('cookie-session');

const authRouter = require('./routes/authRouter');
const apiRouter = require('./routes/apiRouter');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(morgan('dev'));
app.use(cookieSession({
  maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  keys: [process.env.COOKIE_KEY],
}));
app.use(passport.initialize());
app.use(passport.session());

require('./db/connect');
require('./models/user');
require('./services/passport');

app.use('/auth/google', authRouter);
app.use('/api', apiRouter);

app.get('/', (req, res, next) => {
  res.send('Homepage route');
});

app.listen(PORT, () => {
  console.log(`Express app up at port: ${PORT}`);
});
