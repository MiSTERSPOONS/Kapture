const router = require('express').Router();

module.exports = router;

router.use('/students', require('./students'))
router.use('/instructors', require('./instructors'))

router.use((req, res, next) => {
  const error = new Error('not found');
  error.status = 404;
  next(error);
});
