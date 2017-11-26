const router = require('express').Router();
const axios = require('axios');

const Emotion  = require('../db/models/emotions')
const api = require('../../secrets')

module.exports = router

router.post('/recognize', (req, res, next) => {
  axios.post('https://westus.api.cognitive.microsoft.com/emotion/v1.0/recognize', { "url": req.body.info.imageURL }, {
    headers: {
      'Content-type': "application/json",
      'Ocp-Apim-Subscription-Key': api.azureKey
    }
  })
  .then(response => {
    Emotion.findOrCreate({
      where: Object.assign({}, response.data[0].scores, { studentId: req.body.info.userId })
    })
    .spread((emotion, _) => {
      res.json(emotion)
    })
  })
})
