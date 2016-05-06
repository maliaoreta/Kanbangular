'use strict';

const express = require('express');
const router = express.Router();
const passport = require('passport');

// router.get('/sucesss', (req, res) => {
//   res.json({success: true});
// });

// router.get('/failure', (req, res) => {
//   res.json({success: false});
// });

router.post('/', passport.authenticate('login', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

module.exports = router;