const router = require('express').Router();
const Student = require('../db').model('student');
module.exports = router;

router.post('/register', (req, res, next) => {
  Student.findOrCreate({ where: req.body })
    .spread((student, _) => {
      res.json(student)
    })
    .catch(next);
});

router.post('/login', (req, res, next) => {
  const { email, password } = req.body;
  Student.findOne({ where: { email, password }})
    .then(student => res.json(student))
    .catch(next);
});