const router = require('express').Router();
const axios = require('axios');
var stringify = require('json-stringify-safe');

module.exports = router;

router.post('/enroll', (req, res, next) => {
  console.log('Hitting api/kairos/enroll route')
  const { image, gallery_name, subject_id } = req.body
  axios.post('https://api.kairos.com/enroll', {
    image,
    gallery_name,
    subject_id
  }, {
    headers: {
      'Content-type': "application/json",
      'app_id': '9f418065',
      'app_key': '8b444ff262d134d358136dd0f35da763'
    },
  }
)
  .then(response => {
    console.log('AFTER GETTING RESPONSE')
    res.send(stringify(response));
  })
  .catch(next)
})
