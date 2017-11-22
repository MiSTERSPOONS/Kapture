import axios from 'axios';

// Action Type

const RETRIEVE_USER = 'RETRIEVE_USER';

// Action Creators

const retrieveUser = user => ({type: RETRIEVE_USER, user });


// THUNK

export const retrieveUserThunk = (userType, userId) => (dispatch) => {
  axios.get(`/api/${userType}/${userId}`)
    .then((foundUser) => {
      dispatch(retrieveUser(foundUser.data));
    })
    .catch(err => console.error(err));
};

export default (state = {}, action) => {
  switch (action.type) {
    case RETRIEVE_USER:
      return action.user;
    default:
      return state;
  }
};
