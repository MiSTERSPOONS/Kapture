const router = require('express').Router()
const { Student, Instructor } = require('../db')
module.exports = router

router.post('/login', (req, res, next) => {
  // check if userType is Student or Instructor
  // check email
  // check password
})

router.post('/logout', (req, res, next) => {
  req.logout()
  res.redirect('/')
})
