const router = require('express').Router();
const Student = require('../db').model('student');

module.exports = router;

router.post('/', (req, res, next) => {
  console.log('hitting student post signup......')
  Student.create(req.body)
    .then((student) => {
      const currentStudent = {
        id: student.id,
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email,
      };
      req.login({userType: 'students', user: student}, err => (err ? next(err) : res.json(currentStudent)));
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
