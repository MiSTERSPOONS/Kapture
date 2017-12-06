import { expect } from 'chai';
import { createStore } from 'redux';

import store from '../../client/store';
import { showSpinner, removeSpinner } from '../../client/store/spinner';
import { setUser, removeUser } from '../../client/store/currentUser';

describe.only('Reducer', () => {
  let testStore;
  let x
  
  beforeEach('make testStore', () => {
    console.log('store from reducer.spec', store.getState())
    testStore = store
    x=4
  })

  it('checks initial state', () => {
    console.log('but does not really do anythin')
    expect(store.getState()).to.be.deep.equal(
      { snapshotType: '',
      currentUser: {},
      userType: '',
      instructor: [],
      toast: {},
      spinner: false }
    )
  })

  it('switches spinner reducer to true when SHOW_SPINNER called', () => {
    testStore.dispatch(showSpinner())
    expect(store.getState()).to.be.deep.equal(
      { snapshotType: '',
      currentUser: {},
      userType: '',
      instructor: [],
      toast: {},
      spinner: true }
    )
  })

  it('switches spinner reducer back to false when REMOVE_SPINNER called', () => {
    testStore.dispatch(removeSpinner())
    expect(store.getState()).to.be.deep.equal(
      { snapshotType: '',
      currentUser: {},
      userType: '',
      instructor: [],
      toast: {},
      spinner: false }
    )
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
    expect(store.getState()).to.be.deep.equal(
      { snapshotType: '',
      currentUser: {
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
      },
      userType: '',
      instructor: [],
      toast: {},
      spinner: false }
    )
  })

  it('removes user from the Store when removeUser is called', () => {
    testStore.dispatch(removeUser())
    expect(store.getState()).to.be.deep.equal(
      { snapshotType: '',
      currentUser: {},
      userType: '',
      instructor: [],
      toast: {},
      spinner: false }
    )
  })
})