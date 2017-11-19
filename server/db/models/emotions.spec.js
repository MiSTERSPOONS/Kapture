const { expect } = require('chai');
const db = require('../../db');

const Emotion = db.model('emotion');

beforeEach( () => db.sync({ force: true }));

describe('Emotion model', () => {
  let testEmotion;

  beforeEach( () => Emotion.create({
    anger: 0.3012,
    disgust: 4.4512,
    fear: 0.0212,
    joy: 30.1312,
    sadness: 0.3512,
    surprise: 0.1112,
    attention: 0.3412,
    faceId: 'EmotFaceId',
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
      expect(testEmotion.anger).to.be.equal(0.3012);
    });
    it('returns disgust', () => {
      expect(testEmotion.disgust).to.be.equal(4.4512);
    });
    it('returns fear', () => {
      expect(testEmotion.fear).to.be.equal(0.0212);
    });
    it('returns joy', () => {
      expect(testEmotion.joy).to.be.equal(30.1312);
    });
    it('returns sadness', () => {
      expect(testEmotion.sadness).to.be.equal(0.3512);
    });
    it('returns surprise', () => {
      expect(testEmotion.surprise).to.be.equal(0.1112);
    });
    it('returns attention', () => {
      expect(testEmotion.attention).to.be.equal(0.3412);
    });
    it('returns a faceId', () => {
      expect(testEmotion.faceId).to.be.equal('EmotFaceId');
    });
  });

  describe('Emotion Associations', () => {
    it(`Returns an Emotion's student`, () => {
      expect(testEmotion.student.email).to.be.equal('emotStudent@example.com');
    });
  });
});
