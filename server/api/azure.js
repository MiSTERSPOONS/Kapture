const router = require('express').Router();
const axios = require('axios');

const Emotion  = require('../db/models/emotions')

module.exports = router

router.post('/recognize', (req, res, next) => {
  console.log('HITTING POST REQUEST TO MICROSOFT')
  axios.post('https://westus.api.cognitive.microsoft.com/emotion/v1.0/recognize', { "url": req.body.info.imageURL }, {
    headers: {
      'Content-type': "application/json",
      'Ocp-Apim-Subscription-Key': '5e6633ee5ced4060aa9ee5b657e9de28'
    }
  })
  .then(response => {
    Emotion.findOrCreate({
      where: Object.assign({}, response.data[0].scores, { studentId: req.body.info.studentId })
    })
    .spread((emotion, _) => {
      res.json(emotion)
    })
  })
})