import axios from 'axios';
import history from '../history';

// Action Type

const RETRIEVE_USER = 'RETRIEVE_USER';
const REMOVE_USER = 'REMOVE_USER';
const LOGIN_USER_WITH_EMAIL_PASSWORD = 'LOGIN_USER_WITH_EMAIL_PASSWORD'

// Action Creators

export const setUser = user => ({ type: RETRIEVE_USER, user });
const removeUser = () => ({ type: REMOVE_USER })
const loginUserWithEmailPassword = user => ({ type: LOGIN_USER_WITH_EMAIL_PASSWORD, user })

// THUNK
export const me = () => dispatch => {
  axios.get('/auth/me')
  .then(res => { 
    console.log('resssssss', res)
    if (res.data) {
      dispatch(setUser(res.data.user))
      history.push(`/${res.data.userType}/${res.data.user.id}`)
    }
  })
  .catch(err => console.error(err))
}

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
      console.log('hitting line 41 of thunk registerwithapi')
      const reqBody = { image: imageSrc, gallery_name: userType, subject_id: newUser.data.id };
      dispatch(setUser(newUser.data));
      return axios.post('/api/kairos/enroll', reqBody)
        .then(response => {
          console.log('newUser:', newUser)
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
      let userId = response.data.data.images[0].candidates[0].subject_id
      return { imageURL, userId }
    })
    .then( info => {
      if (userType === 'students') {
        axios.post('/api/azure/recognize', { info })
        .then( response => {
          if (confidence > 0.60) {
            history.push(`/${userType}/${info.userId}`)
            dispatch(retrieveUserThunk(userType, info.userId));
          }
        })
      } else {
        history.push(`/${userType}/${info.userId}`)
        dispatch(retrieveUserThunk(userType, info.userId));
      }
      return info.userId
    })
    .then(userId => {
      // console.log('HIT currentUser at the End')
      axios.post('/auth/loginFace', { userType, userId })
      .catch(err => console.error(err))
    })
    .catch(error => console.error(error));
};

export const loginEmailPassword = (email, password, userType) => dispatch => {
  let loginInfo = { email, password, userType }
  axios.post('/auth/login', loginInfo)
    .then(foundUser => {
      console.log('loginEmailPassword Thunk: foundUser =>', foundUser)
      dispatch(loginUserWithEmailPassword(foundUser.data))
      // history.push(`/${userType}/${foundUser.id}`) 
      history.push(`/${userType}/${foundUser.data.id}`) 
    })
    .catch(err => console.error(err))
}

export const logout = () => dispatch => {
    axios.post('/auth/logout')
      .then(_ => {
        dispatch(removeUser())
        history.push('/')
      })
      .catch(err => console.error(err))
}

export default (state = {}, action) => {
  switch (action.type) {
    case RETRIEVE_USER:
      return action.user;
    case REMOVE_USER:
      return {}
    case LOGIN_USER_WITH_EMAIL_PASSWORD:
      return action.user
    default:
      return state;
  }
};
