const router = require('express').Router();
const Instructor = require('../db').model('instructor');
const Student = require('../db').model('student');
const Emotion = require('../db').model('emotion');
module.exports = router;

router.post('/', (req, res, next) => {
  Instructor.create(req.body)
    .then((instructor) => {
      const currentInstructor = {
        id: instructor.id,
        firstName: instructor.firstName,
        lastName: instructor.lastName,
        email: instructor.email,
      };
      req.login({userType: 'instructors', userId: instructor.id}, err => (err ? next(err) : res.json(currentInstructor)));
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
  Instructor.findById(req.params.id, {
    include: [{ 
      model: Student,
      include: [{
        model: Emotion
      }], 
      attributes: { 
        exclude: ['password', 'salt'] }     
    }
  ],
    attributes: { exclude: ['password', 'salt']
  }})
  .then(instructor => res.json(instructor))
  .catch(next);
});

// router.post('/login', (req, res, next) => {
//   const { email, password } = req.body;
//   Instructor.findOne({ where: { email, password }})
//   .then(instructor => res.json(instructor))
//   .catch(next);
// });

// router.post('/', (req, res, next) => {
//   Instructor.findOrCreate({ where: req.body })
//     .spread((instructor, _) => {
//       const currentInstructor = {
//         id: instructor.id,
//         firstName: instructor.firstName,
//         lastName: instructor.lastName,
//         email: instructor.email
//       }
//       res.json(currentInstructor)
//     })
//     .catch(next);
// });