const { expect } = require('chai');
const db = require('../../db');

const Student = db.model('student');
const Instructor = db.model('instructor');

describe('Student model', () => {

  beforeEach( () => db.sync({ force: true }));

  describe('Create Student', () => {

    let testStudent;
    let testInstructor;

    beforeEach( () => Student.create({
      firstName: 'StudentFirst',
      lastName: 'StudentLast',
      email: 'student@example.com',
      password: 'password',
    })
    .then( student => {
      testStudent = student;
      return Instructor.create({
        firstName: 'Inst1First',
        lastName: 'Inst1Last',
        email: 'inst1@example.com',
        password: 'pw1',
      })
    })
    .then( instructor => {
      testInstructor = instructor;
      return testStudent.setInstructors([testInstructor]);
    }));

    it('returns a firstName', () => {
      expect(testStudent.firstName).to.be.equal('StudentFirst');
    })
    it('returns a lastName', () => {
      expect(testStudent.lastName).to.be.equal('StudentLast');
    })
    it('returns an email', () => {
      expect(testStudent.email).to.be.equal('student@example.com');
    })
    it('returns a password', () => {
      expect(testStudent.password).to.be.equal('password');
    })
    it('returns a student\'s instructor', () => {
      testStudent.getInstructors()
      .then( instructors => {
        expect(instructors[0].firstName).to.be.equal('Inst1First');
      })
    })
  })
})
