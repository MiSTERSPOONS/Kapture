const { expect } = require('chai');
const db = require('../../db');

const Course = db.model('course');

describe('Course model', () => {
  beforeEach(() => db.sync({ force: true }));

  describe('Create Course', () => {
    let testCourse;

    beforeEach(() => Course.create({
      name: 'JavaScript 9000',
    })
      .then((course) => {
        testCourse = course;
      }));

    it('returns a name', () => {
      expect(testCourse.name).to.be.equal('JavaScript 9000');
    });
  });
});
