'use strict';

const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/sucesss', (req, res) => {
  res.json({path: '/'});
});

router.get('/failure', (req, res) => {
  res.json({path: '/login'});
});

router.post('/', passport.authenticate('login', {
  successRedirect: '/login/success',
  failureRedirect: '/login/failure'
}));

module.exports = router;