const db = require('../db');
const Sequelize = require('sequelize');

const Emotion = db.define('emotion', {
  anger: Sequelize.FLOAT,
  contempt: Sequelize.FLOAT,
  disgust: Sequelize.FLOAT,
  fear: Sequelize.FLOAT,
  happiness: Sequelize.FLOAT,
  neutral: Sequelize.FLOAT,
  sadness: Sequelize.FLOAT,
  surprise: Sequelize.FLOAT,
});

module.exports = Emotion;
