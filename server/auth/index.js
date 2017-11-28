const router = require('express').Router()
const Student = require('../db').model('student');
const Instructor = require('../db').model('instructor');
module.exports = router

router.get('/me', (req, res, next) => {
  console.log("REQ DOT USER", req.user);
  if (req.user instanceof Student) {
    // res.redirect(`/students/${req.user.id}`)
    res.json({ userType: "students", user: req.user })
  } else if (req.user instanceof Instructor) {
    res.json({ userType: "instructors", user: req.user })
  }
})

router.post('/login', (req, res, next) => {
  console.log(req.body);
  const email = req.body.email
  const password = req.body.password
  const userType = req.body.userType
  if (userType === 'students') {

    Student.findOne({
      where: { email }
    })
      .then(foundStudent => {
        if (foundStudent.correctPassword(password)) {
          const currentStudent = {
            id: foundStudent.id,
            firstName: foundStudent.firstName,
            lastName: foundStudent.lastName,
            email: foundStudent.email
          };
          req.login({ userType, userId: foundStudent.id }, err => (err ? next(err) : res.json(currentStudent)));
        } else {
          console.log('Email or Password is Incorrect')
        }
      })
  } else if (userType === 'instructors') {
    Instructor.findOne({
      where: { email },
    })
      .then(foundInstructor => {
        if (foundInstructor.correctPassword(password)) {
          const currentStudent = {
            id: foundInstructor.id,
            firstName: foundInstructor.firstName,
            lastName: foundInstructor.lastName,
            email: foundInstructor.email
          };
          req.login({ userType, userId: foundInstructor.id }, err => (err ? next(err) : res.json(currentStudent)));
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
    Student.findById(userId)
      .then(foundStudent => {
        req.login({ userType, userId: foundStudent.id }, err => (err ? next(err) : res.json(foundStudent)));
      })
  } else if (userType === 'instructors') {
    Instructor.findById(userId)
      .then(foundInstructor => {
        req.login({ userType, userId: foundInstructor.id }, err => (err ? next(err) : res.json(foundInstructor)));
      })
  }
})

router.post('/logout', (req, res, next) => {
  req.logout()
  res.redirect('/')
})
