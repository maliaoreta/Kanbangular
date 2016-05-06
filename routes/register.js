'use strict';

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const User = require('../models').User;

router.post('/', (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;

  User.findOne({where: {username: username}})
  .then((user) => {
    if (user) {
      return res.json({path: '/register'});
    } else {
      bcrypt.hash(password, saltRounds, (err, hash) => {
        User.create({
          username: username,
          password: hash
        })
        .then((user) => {
          req.login(user, (err) => {
            if (err) {
              return next({status: 500, message: 'Login failed'});
            }
            return res.json({path: '/login'});
          });
        });
      });
    };
  });
});

module.exports = router;