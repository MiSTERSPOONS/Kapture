const Sequelize = require('sequelize');
const db = require('../db');

const Instructor = db.define('instructor', {
  firstName: {
    type: Sequelize.STRING,
  },
  lastName: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: Sequelize.STRING,
  }
});

module.exports = Instructor;
