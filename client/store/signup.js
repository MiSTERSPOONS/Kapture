import axios from 'axios';
import history from '../history';

// Action Type

const STUDENT_SIGNUP = 'STUDENT_SIGNUP';
const INSTRUCTOR_SIGNUP = 'INSTRUCTOR_SIGNUP';
const ENROLL_NEW_CAPTURE = 'ENROLL_NEW_CAPTURE';

// Action Creators

const studentSignup = studentInfo => ({type: STUDENT_SIGNUP, studentInfo });
const instructorSignup = instructorInfo => ({ type: INSTRUCTOR_SIGNUP, instructorInfo });
const enrollNewCapture = data => ({ type: ENROLL_NEW_CAPTURE, data });


// THUNK

export const submitPersonSignup = (personInfo, who) => (dispatch) => {
  axios.post(`/api/${who}`, personInfo)
    .then((postedPerson) => {
      postedPerson.data.userType = who;
      if (who === 'students') {
        dispatch(studentSignup(postedPerson.data));
      } else if (who === 'instructors') {
        dispatch(instructorSignup(postedPerson.data));
      }
      return postedPerson
    })
    .then((postedPerson) => {
      if (who === 'students') {
        history.push('/snapshot') 
      } else if (who === 'instructors') {
        history.push(`/${who}/${postedPerson.data.id}`)        
      }
    })
    .catch(err => console.error(err));
};

export const enrollKairosCapture = (imageSrc, who, id) => (dispatch) => {
  const reqBody = { image: imageSrc, gallery_name: who, subject_id: id };
  axios.post('/api/kairos/enroll', reqBody)
    .then((response) => {
      history.push(`/${who}/${reqBody.subject_id}`)
      console.log(response);
 })
    .catch(error => console.error(error));
};

export default (state = {}, action) => {
  switch (action.type) {
    case STUDENT_SIGNUP:
      return action.studentInfo;
    case INSTRUCTOR_SIGNUP:
      return action.instructorInfo;
    default:
      return state;
  }
};
