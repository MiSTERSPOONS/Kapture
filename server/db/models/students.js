const db = require('../db');
const Sequelize = require('sequelize');
const crypto = require('crypto');

const Student = db.define('student', {
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    }
  },
  password: {
    type: Sequelize.STRING
  },
  salt: {
    type: Sequelize.STRING
  }
});

module.exports = Student

Student.prototype.correctPassword = function(candidatePwd) {
  return Student.encryptPassword(candidatePwd, this.salt) === this.password;
};

Student.encryptPassword = function(plainText, salt) {
  return crypto
  .createHash('RSA-SHA256')
  .update(plainText)
  .update(salt)
  .digest('hex');
};

Student.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64');
};

const setSaltAndPassword = function(student) {
  if (student.changed('password')) {
    student.salt = Student.generateSalt();
    student.password = Student.encryptPassword(student.password, student.salt);
  }
};

Student.beforeCreate(setSaltAndPassword);
Student.beforeUpdate(setSaltAndPassword);
