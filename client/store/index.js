import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import snapshotType from './snapshotType';
import currentUser from './currentUser';
import userType from './userType';
import instructor from './instructor';

const reducer = combineReducers({
  snapshotType,
  currentUser,
  userType,
  instructor
});

const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))
const store = createStore(reducer, middleware);

export default store;
export * from './snapshotType';
export * from './currentUser';
export * from './userType';
export * from './instructor';
