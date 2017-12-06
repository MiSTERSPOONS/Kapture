import { expect } from 'chai';

import { setUserType, setSnapshotType, setUser, removeUser } from '../../client/store';

describe('Action Creators', () => {

  it('Returns the proper user type', () => {
    expect(setUserType('student')).to.be.deep.equal({ type: 'USER_TYPE', typeString: 'student' })
  })

  it('sets the correct snapshot type', () => {
    expect(setSnapshotType('signup')).to.be.deep.equal({ type: 'SIGNUP_SNAPSHOT', typeString: 'signup'})
  })

  it('sets the user', () => {
    expect(setUser({ firstName: 'Test', lastName: 'Example' })).to.be.deep.equal({ type: 'RETRIEVE_USER', user: { firstName: 'Test', lastName: 'Example' }})
  })

  it('removes the user', () => {
    expect(removeUser()).to.be.deep.equal({ type: 'REMOVE_USER' })
  })

})