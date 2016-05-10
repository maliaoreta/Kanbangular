'use strict';

const express = require('express');
const router = express.Router();
// const { router } from 'express';
const passport = require('passport');

router.get('/success', (req, res) => {
  res.json({path: '/'});
});

router.get('/failure', (req, res) => {
  res.status(401).json({
    path: '/login',
    errorMsg: 'The username or password is invalid'
  });
});

router.post('/', passport.authenticate('login', {
  successRedirect: '/login/success',
  failureRedirect: '/login/failure'
}));

module.exports = router;

// export router;