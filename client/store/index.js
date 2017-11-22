import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import signup from './signup';
import snapshotType from './snapshotType';
import currentStudent from './currentStudent';
import userType from './userType';

const reducer = combineReducers({
  signup,
  snapshotType,
  currentStudent,
  userType
});

const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))
const store = createStore(reducer, middleware);

export default store;
export * from './signup';
export * from './snapshotType';
export * from './currentStudent';
export * from './userType';
