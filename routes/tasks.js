'use strict'
const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middleware/authentication');

const Tasks = require('../models').Task;
const inputValidation = require('../middleware/inputValidation');

router.route('/')
  .get(isAuthenticated, (req, res) => {
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
  .post(isAuthenticated, inputValidation(['title', 'description']), (req, res) => {
    let status = req.body.status;

    if(status !== 'Todo' && status !== 'In-Progress' && status !== 'Done') {

      req.errorMsg.status = 'missing status';
    }

    if (Object.keys(req.errorMsg).length !== 0) {
      return res.status(400).json({errorMsg: req.errorMsg});
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
  .delete(isAuthenticated, (req, res) => {
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
  .put(isAuthenticated, inputValidation(['title', 'description', 'status']), (req, res) => {
    let status = req.body.status;

    if(status !== 'Todo' && status !== 'In-Progress' && status !== 'Done') {

      req.errorMsg.status = 'missing status';
    }

    if (Object.keys(req.errorMsg).length !== 0) {
      return res.status(400).json({errorMsg: req.errorMsg});
    }


    Tasks.update({
      title: req.body.title,
      description: req.body.description,
      status: req.body.status
    }, {
      where: {
        id: req.params.id
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