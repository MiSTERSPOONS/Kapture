// Action Type

const SIGNUP_SNAPSHOT = 'SIGNUP_SNAPSHOT';

// Action Creators

export const setSnapshotType = typeString => ({type: SIGNUP_SNAPSHOT, typeString });

export default (state = '', action) => {
  switch (action.type) {
    case SIGNUP_SNAPSHOT:
      return action.typeString;
    default:
      return state;
  }
};
