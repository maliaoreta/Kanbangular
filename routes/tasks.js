'use strict'
const express = require('express');
const router = express.Router();

const Tasks = require('../models').Task;

router.route('/')
  .get((req, res) => {
    res.send('ok');
  })
  .post((req, res) => {
    res.send('ok');
  });

router.route('/todo')
  .get((req, res) => {
    Tasks.findAll({
      where: {
        status: 'Todo'
      }
    })
    .then((todos) => {
      res.json({data: todos});
    });
  });

module.exports = router;