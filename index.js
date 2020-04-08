require('dotenv').config();

const express = require('express');
const passport = require('passport');
const morgan = require('morgan');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();
const PORT = process.env.PORT || 5000;

app.use(morgan('dev'));

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
  },
  (accessToken, refreshToken, profile, done) => {
    console.log(accessToken, refreshToken, profile);
  }
));

app.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback', passport.authenticate('google'));

app.get('/login', (req, res, next) => {
  res.send('fail');
});

app.listen(PORT, () => {
  console.log(`Express app up at port: ${PORT}`);
});