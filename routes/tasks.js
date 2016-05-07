'use strict'
const express = require('express');
const router = express.Router();

const Tasks = require('../models').Task;

router.route('/')
  .get((req, res) => {
    Tasks.findAll({
      where: {
        user_id: req.user.id  
      }
    })
    .then((tasks) => {
      res.json({taskList: tasks});
    });
  })
  .post((req, res) => {
    Tasks.create({
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      user_id: req.user.id
    })
    .then((task) => {
      res.json({newTask: task});
    });
  });

router.route('/:id')
  .delete((req, res) => {
    Tasks.destroy({
      where: {
        id: req.params.id,
        user_id: req.user.id
      }
    })
    .then(() => {
      res.json({success: true});
    });
  })
  .put((req, res) => {
    Tasks.update(req.body.updatedFields, {
      where: {
        id: req.params.id,
        user_id: req.user.id
      }
    })
    .then(() => {
      res.json({success: true});
    });
  });

module.exports = router;