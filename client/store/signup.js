import axios from 'axios';
import history from '../history';

// Action Type

const STUDENT_SIGNUP = 'STUDENT_SIGNUP';
const INSTRUCTOR_SIGNUP = 'INSTRUCTOR_SIGNUP'
const ENROLL_NEW_CAPTURE = 'ENROLL_NEW_CAPTURE';

// Action Creators

const studentSignup = studentInfo => ({
  type: STUDENT_SIGNUP, studentInfo });
const instructorSignup = instructorInfo => ({ type: INSTRUCTOR_SIGNUP, instructorInfo });
const enrollNewCapture = data => ({ type: ENROLL_NEW_CAPTURE, data });


// THUNK

export const submitPersonSignup = (personInfo, who) => (dispatch) => {
  axios.post(`/api/${who}`, personInfo)
    .then(postedPerson => {
      postedPerson.data.userType = who;
      if (who === 'students') {
        dispatch(studentSignup(postedPerson.data))
      } else if (who === 'instructors') {
        dispatch(instructorSignup(postedPerson.data))
      }
    })
    .then(() => history.push('/snapshot'))
    .catch(err => console.error(err));
};

export const enrollKairosCapture = (imageSrc, who) => dispatch => {
  axios.post(`/api/${who}`)
  const kairos = new Kairos(api["api_id"], api["api_key"]);
  kairos.enroll(imageSrc, "test", id, (response) => {
    console.log(JSON.parse(response.responseText));
  });
}

export default (state = {}, action) => {
  switch (action.type) {
    case STUDENT_SIGNUP:
      return action.studentInfo;
    case INSTRUCTOR_SIGNUP:
      return action.instructorInfo
    default:
      return state;
  }
};
