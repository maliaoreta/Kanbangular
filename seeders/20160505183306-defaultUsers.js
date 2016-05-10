'use strict';
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
  up: function (queryInterface, Sequelize) {
    let hash = bcrypt.hashSync('password', saltRounds);
    return queryInterface.bulkInsert('Users', [{
      username: 'username',
      password: hash,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', [{
      username: 'username'      
    }], {});
  }
};
