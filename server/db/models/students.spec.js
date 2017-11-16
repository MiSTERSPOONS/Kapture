const { expect } = require('chai');
const db = require('../index');

const Student = db.model('student');

describe('Student model', () => {

  beforeEach( () => db.sync({ force: true }));

  describe('Create Student', () => {

    let testStudent;

    beforeEach( () => Student.create({
      firstName: 'Some',
      lastName: 'Student',
      email: 'student@example.com',
      password: 'password'
    })
    .then( student => {
      testStudent = student;
    }));

    it('returns a firstName', () => {
      expect(testStudent.firstName).to.be.equal('Some');
    })
    it('returns a lastName', () => {
      expect(testStudent.lastName).to.be.equal('Student');
    })
    it('returns an email', () => {
      expect(testStudent.email).to.be.equal('student@example.com');
    })
    it('returns a password', () => {
      expect(testStudent.password).to.be.equal('password');
    })
  })
})
