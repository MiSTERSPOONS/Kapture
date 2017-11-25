const router = require('express').Router()
module.exports = router

router.post('/logout', (req, res, next) => {
  req.logout()
  res.redirect('/')
})
