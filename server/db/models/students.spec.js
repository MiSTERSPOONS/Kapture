const { expect } = require('chai');
const db = require('../../db');

const Student = db.model('student');

beforeEach( () => db.sync({ force: true }));

describe('Student Model', () => {
  let testStudent;

  beforeEach( () => Student.create({
    firstName: 'StudentFirst',
    lastName: 'StudentLast',
    email: 'student@example.com',
    password: 'studentPw',
    instructors: [{ // Multiple Instructors
      firstName: 'InstFirst',
      lastName: 'InstLast',
      email: 'inst@example.com',
      password: 'instPw',
    }],
    courses: [{ // Multiple Courses
      name: 'StudentCourse'
    }],
    cohort: { // Single Cohort
      name: 'StudentCohort'
    }
  }, { include: [{ all: true }]} )
  .then( student => {
    testStudent = student;
  }));

  describe('Student Creation', () => {
    it('returns a firstName', () => {
      expect(testStudent.firstName).to.be.equal('StudentFirst');
    });
    it('returns a lastName', () => {
      expect(testStudent.lastName).to.be.equal('StudentLast');
    });
    it('returns an email', () => {
      expect(testStudent.email).to.be.equal('student@example.com');
    });
    it('returns a password', () => {
      expect(testStudent.password).to.be.equal('studentPw');
    });
  });

  describe('Student Associations', () => {
    it(`Returns a student's instructor`, () => {
      expect(testStudent.instructors[0].firstName).to.be.equal('InstFirst');
    });
    it(`Returns a student's courses`, () => {
      expect(testStudent.courses[0].name).to.be.equal('StudentCourse');
    });
    it(`Returns a student's cohort`, () => {
      expect(testStudent.cohort.name).to.be.equal('StudentCohort');
    });
  });
});
