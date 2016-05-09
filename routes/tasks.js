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
    })
    .catch((err) => {
      res.status(500).json({
        messages: {
          database: "Database Error"
        }
      });
    });
  })
  .post((req, res) => {
    let status = req.body.status;
    if(status !== 'Todo' && status !== 'In-Progress' && status !== 'Done') {
      return res.status(400).json({
        messages: {
          status: "Bad Status"
        }
      });
    }
    Tasks.create({
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      user_id: req.user.id
    })
    .then((task) => {
      res.json({newTask: task});
    })
    .catch((err) => {
      res.status(500).json({
        messages: {
          database: "Database Error"
        }
      });
    });
  });

router.route('/:id')
  .delete((req, res) => {
    Tasks.destroy({
      where: {
        id: req.params.id,
        // user_id: req.user.id
      }
    })
    .then(() => {
      res.json({success: true});
    })
    .catch((err) => {
      res.status(500).json({
        messages: {
          database: "Database Error"
        }
      });
    });
  })
  .put((req, res) => {
    Tasks.update(req.body.updatedFields, {
      where: {
        id: req.params.id,
        // user_id: req.user.id
      }
    })
    .then(() => {
      res.json({success: true});
    })
    .catch((err) => {
      res.status(500).json({
        messages: {
          database: "Database Error"
        }
      });
    });
  });

module.exports = router;