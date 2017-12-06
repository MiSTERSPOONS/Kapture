import axios from 'axios';
import history from '../history';

// Action Types
const ADD_COURSE = 'ADD_COURSE';

// Action Creators
const addCourse = course => ({ type: ADD_COURSE, course })

// Thunk
export const postCourse = (course) => dispatch => {
  console.log('POSTCOURSE STORE')
  axios.post('/api/courses/', course)
    .then(newCourse => dispatch(addCourse(newCourse.data)))
    .catch(error => console.error(error))
}

// Reducer
export default (state = {}, action) => {
  switch (action.type) {
    case ADD_COURSE:
      return action.course;
    default:
      return state;
  }
}