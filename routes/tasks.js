'use strict'
const express = require('express');
const router = express.Router();

router.route('/')
  .get((req, res) => {
    res.send('ok');
  })
  .post((req, res) => {
    res.send('ok');
  });

module.exports = router;