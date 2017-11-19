const db = require('../db');
const Sequelize = require('sequelize');

const Emotion = db.define('emotion', {
  anger: Sequelize.FLOAT,
  disgust: Sequelize.FLOAT,
  fear: Sequelize.FLOAT,
  joy: Sequelize.FLOAT,
  sadness: Sequelize.FLOAT,
  surprise: Sequelize.FLOAT,
  attention: Sequelize.FLOAT,
  faceId: Sequelize.STRING
});

module.exports = Emotion;
