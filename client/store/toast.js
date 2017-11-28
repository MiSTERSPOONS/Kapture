// Action Type

const SET_TOAST = 'SET_TOAST';

// Action Creators

export const setToast = toast => ({
  type: SET_TOAST,
  toast
});

export default (state = {}, action) => {
  switch (action.type) {
    case SET_TOAST:
      return action.toast;
    default:
      return state;
  }
};
