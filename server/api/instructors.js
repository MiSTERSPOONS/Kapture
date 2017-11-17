const router = require('express').Router();
const Instructor = require('../db').model('instructor');
module.exports = router;

router.post('/register', (req, res, next) => {
  Instructor.findOrCreate({ where: req.body })
    .spread((instructor, _) => {
      res.json(instructor)
    })
    .catch(next);
});

router.post('/login', (req, res, next) => {
  const { email, password } = req.body;
  Instructor.findOne({ where: { email, password }})
    .then(instructor => res.json(instructor))
    .catch(next);
});
