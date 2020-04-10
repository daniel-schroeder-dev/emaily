const mongoose = require('mongoose');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  /*
  *   TODO: figure out if findById returns null if there is no User with the 
  *   given id. In that case, you would need to ensure the catch() runs.
  */
  User.findById(id)
    .then(user => done(null, user))
    .catch(done);
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
  },
  (accessToken, refreshToken, profile, done) => {

    const userInfo = { googleId: profile.id };
    
    User.findOne(userInfo)
      .then(user => {
        return user ? Promise.resolve(user) : new User(userInfo).save();
      })
      .then(user => done(null, user))
      .catch(done);
  }
));
