// action types

const SHOW_SPINNER = "SHOW_SPINNER";
const REMOVE_SPINNER = "REMOVE_SPINNER";

// actions

export const showSpinner = () => ({ type: SHOW_SPINNER });
export const removeSpinner = () => ({ type: REMOVE_SPINNER });

// initial state

const initialState = false;

export default (state = initialState, action) => {
  switch (action.type) {
    case SHOW_SPINNER: return true;
    case REMOVE_SPINNER: return false;
    default: return state;
  }
}
