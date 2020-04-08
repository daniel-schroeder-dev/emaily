const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get('/', passport.authenticate('google', { scope: ['profile'] }));

router.get('/callback', passport.authenticate('google', { session: false}), (req, res, next) => {
  res.json({ user: req.user })
});

module.exports = router;
