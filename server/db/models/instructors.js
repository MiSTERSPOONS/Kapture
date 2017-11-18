const Sequelize = require('sequelize');
const db = require('../db');
const crypto = require('crypto');

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
  },
  salt: {
    type: Sequelize.STRING
  }
});

module.exports = Instructor;

Instructor.prototype.correctPassword = function(candidatePwd) {
  return Instructor.encryptPassword(candidatePwd, this.salt) === this.password;
};

Instructor.encryptPassword = function(plainText, salt) {
  return crypto
  .createHash('RSA-SHA256')
  .update(plainText)
  .update(salt)
  .digest('hex');
};

Instructor.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64');
};

const setSaltAndPassword = function(instructor) {
  if (instructor.changed('password')) {
    instructor.salt = Instructor.generateSalt();
    instructor.password = Instructor.encryptPassword(instructor.password, instructor.salt);
  }
};

Instructor.beforeCreate(setSaltAndPassword);
Instructor.beforeUpdate(setSaltAndPassword);
