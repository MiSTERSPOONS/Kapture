const { expect } = require('chai');
const db = require('../../db');

const Cohort = db.model('cohort');

beforeEach(() => db.sync({ force: true }));

describe('Cohort Model', () => {
  let testCohort;

  beforeEach(() => Cohort.create({
    name: 'Some Cohort',
    courses: [{
      name: 'CohortCourse'
    }],
    instructors: [{
      firstName: 'CohortInstFirst',
      lastName: 'CohortInstLast',
      email: 'cohortStudent@example.com',
      password: 'cohortStudentPw',
    }],
    students: [{
      firstName: 'CohortStudentFirst',
      lastName: 'CohortStudentLast',
      email: 'cohortInst@example.com',
      password: 'cohortInstPw',
    }]
  }, { include: [{ all: true }]} )
  .then((cohort) => {
    testCohort = cohort;
  }));

  describe('Cohort Creation', () => {
    it('returns a name', () => {
      expect(testCohort.name).to.be.equal('Some Cohort');
    });
  });

  describe('Student Associations', () => {
    it(`Returns a student's instructor`, () => {
      expect(testCohort.courses[0].name).to.be.equal('CohortCourse');
    });
    it(`Returns a student's courses`, () => {
      expect(testCohort.instructors[0].firstName).to.be.equal('CohortInstFirst');
    });
    it(`Returns a student's cohort`, () => {
      expect(testCohort.students[0].firstName).to.be.equal('CohortStudentFirst');
    });
  });
});
