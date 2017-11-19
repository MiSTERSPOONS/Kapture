const router = require('express').Router();
const axios = require('axios')

module.exports = router;

router.post('/enroll', (req, res, next) => {
  console.log('Hitting api/kairos/enroll route')
  // console.log('reqbody*******', req.body)
  axios.post('https://api.kairos.com/enroll', {
    data: req.body
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
    res.json(response)
  })
  .catch(next)
})

// const payload = {
//   ,
//   type     : "POST",
//   dataType : "raw",
//   data     : JSON.stringify(data),
//   success  : callback,
//   error    : callback
// }