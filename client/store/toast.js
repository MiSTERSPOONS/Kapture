// Action Type

const SET_TOAST = 'SET_TOAST';

// Action Creators

export const setToast = toast => ({
  type: SET_TOAST,
  toast
});

export const setToastThunk = toast => dispatch => {
  dispatch(setToast(toast))
  setTimeout(() => {
    dispatch(setToast({}))
  }, 5000)
}

export default (state = {}, action) => {
  switch (action.type) {
    case SET_TOAST:
      return action.toast;
    default:
      return state;
  }
};
