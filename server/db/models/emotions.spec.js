const { expect } = require('chai');
const db = require('../../db');

const Emotion = db.model('emotion');

beforeEach( () => db.sync({ force: true }));

describe('Emotion model', () => {
  let testEmotion;

  beforeEach( () => Emotion.create({
    anger: 0.1,
    contempt: 0.2,
    disgust: 0.3,
    fear: 0.4,
    happiness: 0.5,
    neutral: 0.6,
    sadness: 0.7,
    surprise: 0.8,
    student: {
      firstName: 'EmotStudentFirst',
      lastName: 'EmotStudentLast',
      email: 'emotStudent@example.com',
      password: 'emotStudentPw',
    }
  }, { include: [{ all: true }]} )
  .then( emotion => {
    testEmotion = emotion;
  }));

  describe('Create Emotion', () => {
    it('returns anger', () => {
      expect(testEmotion.anger).to.be.equal(0.1);
    });
    it('returns contempt', () => {
      expect(testEmotion.contempt).to.be.equal(0.2);
    });
    it('returns disgust', () => {
      expect(testEmotion.disgust).to.be.equal(0.3);
    });
    it('returns fear', () => {
      expect(testEmotion.fear).to.be.equal(0.4);
    });
    it('returns happiness', () => {
      expect(testEmotion.happiness).to.be.equal(0.5);
    });
    it('returns neutral', () => {
      expect(testEmotion.neutral).to.be.equal(0.6);
    });
    it('returns sadness', () => {
      expect(testEmotion.sadness).to.be.equal(0.7);
    });
    it('returns surprise', () => {
      expect(testEmotion.surprise).to.be.equal(0.8);
    });
  });
  describe('Emotion Associations', () => {
    it(`Returns an Emotion's student`, () => {
      expect(testEmotion.student.email).to.be.equal('emotStudent@example.com');
    });
  });
});
