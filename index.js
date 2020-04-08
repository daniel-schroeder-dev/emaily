require('dotenv').config();

const express = require('express');
const passport = require('passport');
const morgan = require('morgan');
const mongoose = require('mongoose');

const authRouter = require('./routes/authRouter');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(morgan('dev'));
app.use(passport.initialize());

require('./services/passport');

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).catch(console.error);

mongoose.connection.on('error', err => {
  console.error(err);
});

mongoose.set('debug', true);

app.use('/auth/google', authRouter);

app.get('/', (req, res, next) => {
  res.send('Homepage route');
});

app.listen(PORT, () => {
  console.log(`Express app up at port: ${PORT}`);
});
