import axios from 'axios';
import history from '../history';

// Action Type

const STUDENT_LOGIN = 'STUDENT_LOGIN';


// Action Creators

const studentLogin = studentInfo => ({type: STUDENT_LOGIN, studentInfo });



// THUNK

export const loginKairosCapture = (imageSrc, who) => (dispatch) => {
  const reqBody = { image: imageSrc, gallery_name: who};
  axios.post('/api/kairos/recognize', reqBody)
    .then((response) => {
      console.log('response*****', response);
 })
    .catch(error => console.error(error));
};

export default (state = {}, action) => {
  switch (action.type) {
    case STUDENT_LOGIN:
      return action.studentInfo;
    case INSTRUCTOR_LOGIN:
      return action.instructorInfo;
    default:
      return state;
  }
};
