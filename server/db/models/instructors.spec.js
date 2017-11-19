const { expect } = require('chai');
const db = require('../../db');

const Instructor = db.model('instructor');

beforeEach( () => db.sync({ force: true }));

describe('Instructor model', () => {
  let testInstructor;

  beforeEach( () => Instructor.create({
    firstName: 'InstFirst',
    lastName: 'InstLast',
    email: 'inst@example.com',
    password: 'instPw',
    cohorts: [{
      name: 'InstCohort'
    }],
    courses: [{
      name: 'InstCourse'
    }],
    students: [{
      firstName: 'InstStudentFirst',
      lastName: 'InstStudentLast',
      email: 'instStudent@example.com',
      password: 'instStudentPw',
    }]
  }, { include: [{ all: true }]} )
  .then( instructor => {
    testInstructor = instructor;
  }));

  describe('Create Instructor', () => {
    it('returns a firstName', () => {
      expect(testInstructor.firstName).to.be.equal('InstFirst');
    });
    it('returns a lastName', () => {
      expect(testInstructor.lastName).to.be.equal('InstLast');
    });
    it('returns an email', () => {
      expect(testInstructor.email).to.be.equal('inst@example.com');
    });
    it('returns a password', () => {
      let salt = testInstructor.salt;
      let testPassword = Instructor.encryptPassword('instPw', salt);
      expect(testInstructor.password).to.be.equal(testPassword);
    });
  });

  describe('Instructor Associations', () => {
    it(`Returns an instructor's cohorts`, () => {
      expect(testInstructor.cohorts[0].name).to.be.equal('InstCohort');
    });
    it(`Returns an instructor's courses`, () => {
      expect(testInstructor.courses[0].name).to.be.equal('InstCourse');
    });
    it(`Returns an instructor's students`, () => {
      expect(testInstructor.students[0].firstName).to.be.equal('InstStudentFirst');
    });
  });
});
