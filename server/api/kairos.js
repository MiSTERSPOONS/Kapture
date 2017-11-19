const router = require('express').Router();
const axios = require('axios');
var stringify = require('json-stringify-safe');
const api = require('../../secrets');

module.exports = router;

router.post('/enroll', (req, res, next) => {
  const { image, gallery_name, subject_id } = req.body
  axios.post('https://api.kairos.com/enroll', {
    image,
    gallery_name,
    subject_id
  }, {
    headers: {
      'Content-type': "application/json",
      'app_id': api.app_id,
      'app_key': api.app_key
    },
  }
)
  .then(response => {
    res.send(stringify(response));
  })
  .catch(next)
})
