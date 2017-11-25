import axios from 'axios';
import history from '../history';

// Action Type

const RETRIEVE_USER = 'RETRIEVE_USER';
const REMOVE_USER = 'REMOVE_USER';

// Action Creators

export const setUser = user => ({ type: RETRIEVE_USER, user });
const removeUser = () => ({ type: REMOVE_USER })

// THUNK

export const retrieveUserThunk = (userType, userId) => (dispatch) => {
  axios.get(`/api/${userType}/${userId}`)
    .then((foundUser) => {
      console.log('foundUser', foundUser)
      dispatch(setUser(foundUser.data));
    })
    .catch(err => console.error(err));
};

export const registerUserWithAPI = (imageSrc, userType, userInfo) => (dispatch) => {
  axios.post(`/api/${userType}`, userInfo)
    .then(newUser => {
      const reqBody = { image: imageSrc, gallery_name: userType, subject_id: newUser.data.id };
      dispatch(setUser(newUser.data));
      return axios.post('/api/kairos/enroll', reqBody)
        .then(response => {
          history.push(`/${userType}/${newUser.data.id}`)
          console.log(response);
        })
    })
    .catch(error => console.error(error));
};

export const loginUserWithAPI = (imageSrc, userType) => (dispatch) => {
  const reqBody = { image: imageSrc, gallery_name: userType };
  let confidence;
  axios.post('/api/kairos/recognize', reqBody)
    .then( response => {
      confidence = response.data.data.images[0].candidates[0].confidence
      let imageURL = response.data.data.uploaded_image_url
      let studentId = response.data.data.images[0].candidates[0].subject_id
      return { imageURL, studentId }
    })
    .then( info => {
      if (userType === 'students') {
        axios.post('/api/azure/recognize', { info })
        .then( response => {
          if (confidence > 0.60) {
            history.push(`/${userType}/${info.studentId}`)
            dispatch(retrieveUserThunk(userType, info.studentId));
          }
        })
      } else {
        history.push(`/${userType}/${info.studentId}`)
        dispatch(retrieveUserThunk(userType, info.studentId));
      }
      // return something
    })
    .then(() => {
      console.log('HIT currentUser at the End')
    })
    .catch(error => console.error(error));
};

export const logout = () => dispatch => {
    axios.post('/auth/logout')
      .then(_ => {
        dispatch(removeUser())
        history.push('/')
      })
      .catch(err => console.log(err))
}

export default (state = {}, action) => {
  switch (action.type) {
    case RETRIEVE_USER:
      return action.user;
    case REMOVE_USER:
      return {}
    default:
      return state;
  }
};
