const router = require('express').Router();
const Course = require('../db').model('course');


module.exports = router;

router.post('/', (req, res, next) => {
  console.log('in courses backend', req.body)
  Course.findOrCreate({
    where: {
      name: req.body.name,
      courseID: req.body.courseID,
      description: req.body.description
    }
  })
  .spread((course, _) => {
    res.json(course)
  })
  .catch(next)
})
