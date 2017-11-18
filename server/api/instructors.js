const router = require('express').Router();
const Instructor = require('../db').model('instructor');
module.exports = router;

router.post('/', (req, res, next) => {
  Instructor.findOrCreate({ where: req.body })
    .spread((instructor, _) => {
      const currentInstructor = {
        id: instructor.id,
        firstName: instructor.firstName,
        lastName: instructor.lastName,
        email: instructor.email
      }
      res.json(currentInstructor)
    })
    .catch(next);
});

router.post('/login', (req, res, next) => {
  const { email, password } = req.body;
  Instructor.findOne({ where: { email, password }})
    .then(instructor => res.json(instructor))
    .catch(next);
});
