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

router.route('/inProgress')
  .get((req, res) => {
    Tasks.findAll({
      where: {
        status: 'In-Progress'
      }
    })
    .then((inProgress) => {
      res.json({data: inProgress});
    });
  });

router.route('/done')
  .get((req, res) => {
    Tasks.findAll({
      where: {
        status: 'Done'
      }
    })
    .then((done) => {
      res.json({data: done});
    });
  });

module.exports = router;