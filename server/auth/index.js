const router = require('express').Router()
const Student = require('../db').model('student');
const Instructor = require('../db').model('instructor');
module.exports = router

router.get('/me', (req, res, next) => {
  console.log('req.user in auth/me', req.user)
  console.log('req.session', req.session.id)
  if (req.user instanceof Student) {
    // res.redirect(`/students/${req.user.id}`)
    res.json({ userType: "students", user: req.user })
  } else if (req.user instanceof Instructor) {
    res.json({ userType: "instructors", user: req.user })
  }
})

router.post('/login', (req, res, next) => {
  const email = req.body.email
  const password = req.body.password
  const userType = req.body.userType
  // check if userType is Student or Instructor
  // check email
  // check password
  if (userType === 'students') {
    console.log('hitting Student login in auth')
    Student.findOne({ where: { email } })
      .then(foundStudent => {
        console.log('foundStudent.data in auth/index', foundStudent)
        if (foundStudent.correctPassword(password)) {
          console.log('FoundStudent id from login route: ', foundStudent.id)
          req.login({ userType, user: foundStudent }, err => (err ? next(err) : res.json(foundStudent)));
        } else {
          console.log('Email or Password is Incorrect')
        }
      })
  } else if (userType === 'instructors') {
    Instructor.findOne({ where: { email } })
      .then(foundInstructor => {
        console.log('foundInstructor.data in auth/index', foundInstructor)
        if (foundInstructor.correctPassword(password)) {
          console.log('FoundInstrfoundInstructor id from login route: ', foundInstructor.id)
          req.login({ userType, user: foundInstructor }, err => (err ? next(err) : res.json(foundInstructor)));
        } else {
          console.log('Email or Password is Incorrect')
        }
      })
  }
})

router.post('/loginFace', (req, res, next) => {
  const userType = req.body.userType
  const userId = req.body.userId
  if (userType === 'students') {
    console.log('hitting Student login in auth')
    Student.findById(userId)
      .then(foundStudent => {
        console.log('foundStudent.data in auth/index', foundStudent)
        req.login({ userType, user: foundStudent }, err => (err ? next(err) : res.json(foundStudent)));
      })
  } else if (userType === 'instructors') {
    Instructor.findById(userId)
      .then(foundInstructor => {
        console.log('foundInstructor.data in auth/index', foundInstructor)
        req.login({ userType, user: foundInstructor }, err => (err ? next(err) : res.json(foundInstructor)));
      })
  }
})

router.post('/logout', (req, res, next) => {
  req.logout()
  res.redirect('/')
})
