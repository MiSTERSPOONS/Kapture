import axios from 'axios';
import history from '../history';

// Action Type

const STUDENT_SIGNUP = 'STUDENT_SIGNUP';
const INSTRUCTOR_SIGNUP = 'INSTRUCTOR_SIGNUP'

// Action Creators

const studentSignup = studentInfo => ({ type: STUDENT_SIGNUP, studentInfo });
const instructorSignup = instructorInfo => ({ type: INSTRUCTOR_SIGNUP, instructorInfo });

// THUNK

<<<<<<< HEAD
export const submitStudentSignup = studentInfo => (dispatch) => {
  axios.post('/api/students', studentInfo)
    .then(postedStudent => dispatch(studentSignup(postedStudent.data)))
=======
export const submitPersonSignup = (personInfo, who) => (dispatch) => {
  axios.post(`/api/${who}`, personInfo)
    .then(postedPerson => {
      if (who === 'students') {
        dispatch(studentSignup(postedPerson.data))
      } else if (who === 'instructors') {
        dispatch(instructorSignup(postedPerson.data))
      }
    })
>>>>>>> master
    .then(() => history.push('/snapshot'))
    .catch(err => console.error(err));
};

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
