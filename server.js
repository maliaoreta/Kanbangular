'use strict'

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./models');
const passport = require('passport');
const session = require('express-session');
const setUpPassport = require('./passport/passport');
const tasks = require('./routes/tasks');
const login = require('./routes/login');
const register = require('./routes/register');
const isAuthenticated = require('./middleware/authentication');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
setUpPassport();

app.use('/register', register);
app.use('/login', login);
app.use('/api/tasks', isAuthenticated, tasks);

app.get('/logout', (req, res) => {
  req.logout();
  res.send('ok');
  // res.json({path :'/'});
});

app.get('*', (req, res) => {
  res.sendFile('/public/index.html', {
    root: __dirname
  });
});

db.sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log("Listening on 3000!");
  });
});
