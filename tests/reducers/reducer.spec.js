import { expect } from 'chai';
import { createStore } from 'redux';

import store from '../../client/store';
import { showSpinner, removeSpinner } from '../../client/store/spinner';
import { setUser, removeUser } from '../../client/store/currentUser';

describe('Reducer', () => {
  let testStore;

  beforeEach('make testStore', () => {
    console.log('store from reducer.spec', store.getState())
    testStore = store
  })

  it('checks initial state', () => {
    console.log('but does not really do anythin')
    expect(store.getState()).to.be.deep.equal(
      {
        snapshotType: '',
        currentUser: {},
        userType: '',
        instructor: [],
        toast: {},
        spinner: false,
        course: {}
      }
    )
  })

  it('switches spinner reducer to true when SHOW_SPINNER called', () => {
    testStore.dispatch(showSpinner())
    expect(store.getState().spinner).to.be.equal(true)
  })

  it('switches spinner reducer back to false when REMOVE_SPINNER called', () => {
    testStore.dispatch(removeSpinner())
    expect(store.getState().spinner).to.be.equal(false)
  })

  it('adds user to the Store when setUser is called', () => {
    testStore.dispatch(setUser({
      firstName: 'StudentFirst',
      lastName: 'StudentLast',
      email: 'student@example.com',
      instructors: [{
        firstName: 'InstFirst',
        lastName: 'InstLast',
      }],
      courses: [{
        name: 'StudentCourse'
      }],
      cohort: {
        name: 'StudentCohort'
      }
    }))
    expect(store.getState().currentUser).to.be.deep.equal(
      {
        firstName: 'StudentFirst',
        lastName: 'StudentLast',
        email: 'student@example.com',
        instructors: [{
          firstName: 'InstFirst',
          lastName: 'InstLast',
        }],
        courses: [{
          name: 'StudentCourse'
        }],
        cohort: {
          name: 'StudentCohort'
        }
      }
    )
  })

  it('removes user from the Store when removeUser is called', () => {
    testStore.dispatch(removeUser())
    expect(store.getState().currentUser).to.be.deep.equal({})
  })
})