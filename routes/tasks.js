'use strict'
const express = require('express');
const router = express.Router();

const Tasks = require('../models').Task;

router.route('/')
  .post((req, res) => {
    console.log(req.body);
    Tasks.create({
      title: req.body.title,
      description: req.body.description,
      status: "Todo"
    })
    .then((task) => {
      res.json({newTask: task});
    });
  });

router.route('/todo')
  .get((req, res) => {
    Tasks.findAll({
      where: {
        status: 'Todo'
      }
    })
    .then((todos) => {
      res.json({todoList: todos});
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
      res.json({inProgressList: inProgress});
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
      res.json({doneList: done});
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
    var updatedStatus;
    switch (req.body.currStatus) {
      case 'Todo':
        updatedStatus = 'In-Progress'
        break;
      case 'In-Progress':
        updatedStatus = 'Done'
        break;
    }

    Tasks.update({
      status: updatedStatus
    }, {
      where: {
        id: req.params.id
      }
    })
    .then(() => {
      res.json({updatedStatus: updatedStatus});
    });
  });

module.exports = router;