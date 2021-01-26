import { combineReducers } from 'redux';
import isLoggedInReducer from './isLoggedInReducer';
import errorOrSuccessMessageReducer from './errorOrSuccessMessageReducer';

const allReducers = combineReducers({
  isLoggedIn: isLoggedInReducer,
  errorOrSuccessMessage: errorOrSuccessMessageReducer,
});

export default allReducers;
