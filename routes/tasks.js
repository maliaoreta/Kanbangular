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
    var updatedStatus;

    if (req.body.direction === 'right') {

      switch (req.body.currStatus) {
        case 'Todo':
          updatedStatus = 'In-Progress';
          break;
        case 'In-Progress':
          updatedStatus = 'Done';
          break;
      }
    }
    else if (req.body.direction === 'left') {

     switch (req.body.currStatus) {
        case 'Done':
          updatedStatus = 'In-Progress';
          break;
        case 'In-Progress':
          updatedStatus = 'Todo';
          break;
      } 
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