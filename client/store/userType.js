// Action Type

const USER_TYPE = 'USER_TYPE';

// Action Creators

export const setUserType = typeString => ({type: USER_TYPE, typeString });

export default (state = '', action) => {
  switch (action.type) {
    case USER_TYPE:
      return action.typeString;
    default:
      return state;
  }
};
