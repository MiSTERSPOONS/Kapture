const { expect } = require('chai');
const db = require('../../db');

const Instructor = db.model('instructor');

describe('Instructor model', () => {

  beforeEach( () => db.sync({ force: true }));

  describe('Create Instructor', () => {

    let testInstructor;

    beforeEach( () => Instructor.create({
      firstName: 'Corey',
      lastName: 'Greenwald',
      email: 'corey@greenwald.com',
      password: 'smite',
    })
    .then( instructor => {
      testInstructor = instructor;
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
  })
})
