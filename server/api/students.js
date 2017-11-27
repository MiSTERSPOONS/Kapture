const router = require('express').Router();
const Student = require('../db').model('student');
const Instructor = require('../db').model('instructor');

module.exports = router;

router.post('/', (req, res, next) => {
  Student.create(req.body)
    .then((student) => {
      Instructor.findById(1)
      .then( instructor => {
        student.addInstructor(instructor);
      })
      const currentStudent = {
        id: student.id,
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email
      };
      req.login({userType: 'students', userId: student.id}, err => (err ? next(err) : res.json(currentStudent)));
    })
    .catch((err) => {
      if (err.name === 'SequelizeUniqueConstraintError') {
        res.status(401).send('User already exists');
      } else {
        next(err);
      }
    });
});

router.get('/:id', (req, res, next) => {
  Student.findById(req.params.id, {
    include: [{ all: true }],
    attributes: { exclude: ['password', 'salt']  },
  })
    .then(student => res.json(student))
    .catch(next);
});

// router.get('/allStudents/:instructorId', (req, res, next) => {
//   Student.findAll({
//     where: {
//       instructorId: req.params.instructorId
//     }
//   })
//   .then(students => {
//     console.log('students in student/allstudennt api route', students)
//     res.json(students)
//   })
// })

// router.post('/', (req, res, next) => {
//   Student.findOrCreate({
//     where: req.body
//   })
//   .spread((student, _) => {
//     // findOrCreate used findOne() and then create()
//     // create() does not accept the attributes parameter!
//     const currentStudent = {
//       id: student.id,
//       firstName: student.firstName,
//       lastName: student.lastName,
//       email: student.email
//     }
//     res.json(currentStudent)
//   })
//   .catch(next);
// });

// router.post('/login', (req, res, next) => {
//   const { email, password } = req.body;
//   Student.findOne({ where: { email, password } })
//     .then(student => res.json(student))
//     .catch(next);
// });
