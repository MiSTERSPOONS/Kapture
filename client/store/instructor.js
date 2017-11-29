import axios from 'axios';

const GET_ALL_STUDENTS = 'GET_ALL_STUDENTS';

const getAllStudents = (students) => ({ type: GET_ALL_STUDENTS, students})

// thunk later
export const retrieveInstructorStudents = (instructorId) => dispatch => {
  axios.get(`/api/students/allStudents/${instructorId}`)
  .then(res => dispatch(getAllStudents(res.data)))
  .catch(err => console.error(err))
}

export default function(state = [], action) {
  switch (action.type) {
    case GET_ALL_STUDENTS:
      return action.students
    default:
      return state
  }
}