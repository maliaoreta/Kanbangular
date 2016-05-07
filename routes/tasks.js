'use strict'
const express = require('express');
const router = express.Router();

const Tasks = require('../models').Task;

router.route('/')
  .get((req, res) => {
    Tasks.findAll()
    .then((tasks) => {
      res.json({taskList: tasks});
    });
  })
  .post((req, res) => {
    console.log(req.body);
    Tasks.create({
      title: req.body.title,
      description: req.body.description,
      status: req.body.status
    })
    .then((task) => {
      res.json({newTask: task});
    });
  });

router.route('/:id')
  .delete((req, res) => {
    Tasks.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(() => {
      res.json({success: true});
    });
  })
  .put((req, res) => {
    console.log(req.params.id);
    Tasks.update(req.body.updatedFields, {
      where: {
        id: req.params.id
      }
    })
    .then(() => {
      res.json({success: true});
    });
  });

module.exports = router;