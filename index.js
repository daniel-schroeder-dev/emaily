require('dotenv').config();

const express = require('express');
const passport = require('passport');
const morgan = require('morgan');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const authRouter = require('./routes/authRouter');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(morgan('dev'));
app.use(passport.initialize());

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
  },
  (accessToken, refreshToken, profile, done) => {
    done(null, { profile });
  }
));

app.use('/auth/google', authRouter);

app.get('/', (req, res, next) => {
  res.send('Homepage route');
});


app.listen(PORT, () => {
  console.log(`Express app up at port: ${PORT}`);
});