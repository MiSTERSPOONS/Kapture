const db = require('../db');
const Sequelize = require('sequelize');

const Cohort = db.define('cohort', {
  name: {
    type: Sequelize.STRING,
  },
});

module.exports = Cohort;
