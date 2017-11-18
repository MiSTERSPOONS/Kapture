const router = require('express').Router();
const Student = require('../db').model('student');
module.exports = router;

router.post('/', (req, res, next) => {
  Student.findOrCreate({
    where: req.body
  })
  .spread((student, _) => {
    // findOrCreate used findOne() and then create()
    // create() does not accept the attributes parameter!
    let currentStudent = {
      id: student.id,
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email
    }
    res.json(currentStudent)
  })
  .catch(next);
});

router.post('/login', (req, res, next) => {
  const { email, password } = req.body;
  Student.findOne({ where: { email, password }})
    .then(student => res.json(student))
    .catch(next);
});
