'use strict';

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const inputValidation = require('../middleware/inputValidation');
const User = require('../models').User;

router.post('/', inputValidation(['username', 'password']), (req, res, next) => {

  if (Object.keys(req.errorMsg).length !== 0) {
    return res.status(400).json({errorMsg: req.errorMsg});
  }

  let username = req.body.username;
  let password = req.body.password;

  User.findOne({where: {username: username}})
  .then((user) => {
    if (user) {
      console.log("USER IS FOUND", user);
      return res.status(401).json({
        path: '/register',
        userExistsErrorMsg: 'User already exists'
      });
    } else {
      bcrypt.hash(password, saltRounds, (err, hash) => {
        User.create({
          username: username,
          password: hash
        })
        .then((user) => {
          req.login(user, (err) => {
            if (err) {
              return res.status(401).json({
                path: '/register',
                loginErrorMsg: 'Login Failed!'
              });
            }
            return res.json({path: '/', welcomeMsg: 'welcome ' + username + '!'});
          });
        });
      });
    }
  });
});

module.exports = router;