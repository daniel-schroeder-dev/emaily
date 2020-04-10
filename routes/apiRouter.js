const express = require('express');
const router = express.Router();

router.get('/current_user', (req, res, next) => {
  res.json(req.user);
});

router.get('/logout', (req, res, next) => {
  req.logout();
  res.send(req.user);
});

module.exports = router;
