import axios from 'axios';
import history from '../history';

// Action Type

const STUDENT_LOGIN = 'STUDENT_LOGIN';


// Action Creators

const studentLogin = studentInfo => ({ type: STUDENT_LOGIN, studentInfo });



// THUNK

export const loginKairosCapture = (imageSrc, who) => (dispatch) => {
  const reqBody = { image: imageSrc, gallery_name: who };
  axios.post('/api/kairos/recognize', reqBody)
    .then((response) => {
      const confidence = response.data.data.images[0].candidates[0].confidence
      const imageURL = response.data.data.uploaded_image_url
      console.log('response*****', response);
      console.log('imageURL*****', imageURL);
      if (confidence > 0.60) {
        history.push('/SuccessPlaceholder')
        return imageURL
      }
    })
    .then(imageURL => {
      console.log('2nd .then imageURL=>', imageURL)
      axios.post('/api/azure/recognize', { imageURL })
      .then(response => {
        console.log('THE RESPONSE', response)
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
