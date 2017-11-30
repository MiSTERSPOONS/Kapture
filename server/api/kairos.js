const router = require('express').Router();
const axios = require('axios');
var stringify = require('json-stringify-safe');

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
      'app_id': process.env.APP_ID,
      'app_key': process.env.APP_KEY
    },
  }
)
  .then(response => {
    res.send(stringify(response));
  })
  .catch(next)
})


router.post('/recognize', (req, res, next) => {
  const { image, gallery_name, subject_id } = req.body
  axios.post('https://api.kairos.com/recognize', {
    image,
    gallery_name,
  }, {
    headers: {
      'Content-type': "application/json",
      'app_id': process.env.APP_ID,
      'app_key': process.env.APP_KEY
    },
  }
)
  .then(response => {
    res.send(stringify(response));
  })
  .catch(next)
})

// <-------- Route to display all galleries ---------->
// router.post('/recognize', (req, res, next) => {
//   const { image, gallery_name, subject_id } = req.body
//   axios.post('https://api.kairos.com/gallery/list_all',{},{
//     headers: {
//       'Content-type': "application/json",
//       'app_id': api.app_id,
//       'app_key': api.app_key
//     },
//   }
// )
//   .then(response => {
//     res.send(stringify(response));
//   })
//   .catch(next)
// })
