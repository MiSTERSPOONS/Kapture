const db = require('../db');
const Sequelize = require('sequelize');

const Student = db.define('student', {
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true,
      allowNull: false
    }
  },
  password: {
    type: Sequelize.STRING
  }
})

module.exports = Student
