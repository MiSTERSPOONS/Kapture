const { expect } = require('chai');
const db = require('../../db');

const Cohort = db.model('cohort');

describe('Cohort model', () => {
  beforeEach(() => db.sync({ force: true }));

  describe('Create Cohort', () => {
    let testCohort;

    beforeEach(() => Cohort.create({
      name: 'Some Cohort',
    })
      .then((cohort) => {
        testCohort = cohort;
      }));

    it('returns a name', () => {
      expect(testCohort.name).to.be.equal('Some Cohort');
    });
  });
});
