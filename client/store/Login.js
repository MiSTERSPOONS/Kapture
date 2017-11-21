import axios from 'axios';
import history from '../history';

// Action Type

const STUDENT_LOGIN = 'STUDENT_LOGIN';


// Action Creators

const studentLogin = studentInfo => ({ type: STUDENT_LOGIN, studentInfo });

// THUNK

export const loginKairosCapture = (imageSrc, who) => (dispatch) => {
  const reqBody = { image: imageSrc, gallery_name: who };
  let confidence;
  let imageURL;
  let studentId
  axios.post('/api/kairos/recognize', reqBody)
    .then((response) => {
      console.log('responseeeeeeeee:', response)
      confidence = response.data.data.images[0].candidates[0].confidence
      imageURL = response.data.data.uploaded_image_url
      studentId = response.data.data.images[0].candidates[0].subject_id
      return { imageURL, studentId }
    })
    .then(info => {
      console.log('getting here?????????????')
      axios.post('/api/azure/recognize', { info })
      .then(response => {
        if (confidence > 0.60) {
          history.push(`/students/${studentId}`)
        }
      })
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
