'use strict'

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

const db = require('./models');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
// app.use('/')


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