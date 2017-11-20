import axios from 'axios';

// Action Type

const RETRIEVE_STUDENT = 'RETRIEVE_STUDENT';

// Action Creators

const retrieveStudent = student => ({type: RETRIEVE_STUDENT, student });


// THUNK

export const retrieveStudentThunk = studentId => (dispatch) => {
  axios.get(`/api/students/${studentId}`)
    .then((foundStudent) => {
      dispatch(retrieveStudent(foundStudent.data));
    })
    .catch(err => console.error(err));
};

export default (state = {}, action) => {
  switch (action.type) {
    case RETRIEVE_STUDENT:
      return action.student;
    default:
      return state;
  }
};
