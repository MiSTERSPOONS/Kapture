import axios from 'axios';
import history from '../history';

// Action Type

const STUDENT_SIGNUP = 'STUDENT_SIGNUP';

// Action Creators

const studentSignup = studentInfo => ({ type: STUDENT_SIGNUP, studentInfo });

// THUNK

export const submitStudentSignup = studentInfo => (dispatch) => {
  axios.post('/api/students', studentInfo)
<<<<<<< HEAD
    .then(postedStudent => dispatch(studentSignup(postedStudent.data)))
    .then(() => history.push('/snapshot'))
    .catch(err => console.error(err));
=======
  .then( postedStudent => dispatch(studentSignup(postedStudent.data)))
  .catch(err => console.error(err))
>>>>>>> master
};

export default (state = {}, action) => {
  switch (action.type) {
    case STUDENT_SIGNUP:
      return action.studentInfo;
    default:
      return state;
  }
};
