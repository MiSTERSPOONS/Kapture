const { expect } = require('chai');
const db = require('../../db');

const Instructor = db.model('instructor');
const Student = db.model('student');

describe('Instructor model', () => {

  beforeEach( () => db.sync({ force: true }));

  describe('Create Instructor', () => {

    let testInstructor;
    let testStudent;

    beforeEach( () => Instructor.create({
      firstName: 'Corey',
      lastName: 'Greenwald',
      email: 'corey@greenwald.com',
      password: 'smite',
    })
    .then( instructor => {
      testInstructor = instructor;
      return Student.create({
        firstName: 'StudentFirst',
        lastName: 'StudentLast',
        email: 'student@example.com',
        password: 'password',
      })
    }).then( student => {
      testStudent = student;
      return testInstructor.setStudents([testStudent]);
    }));

    it('returns a firstName', () => {
      expect(testInstructor.firstName).to.be.equal('Corey');
    })
    it('returns a lastName', () => {
      expect(testInstructor.lastName).to.be.equal('Greenwald');
    })
    it('returns an email', () => {
      expect(testInstructor.email).to.be.equal('corey@greenwald.com');
    })
    it('returns a password', () => {
      expect(testInstructor.password).to.be.equal('smite');
    })
    it('returns an instructor\'s student', () => {
      testInstructor.getStudents()
      .then( students => {
        expect(students[0].firstName).to.be.equal('StudentFirst');
      })
    })
  })
})
