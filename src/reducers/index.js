import { combineReducers } from 'redux';
import isLoggedInReducer from './isLoggedInReducer';
import errorOrSuccessMessageReducer from './errorOrSuccessMessageReducer';
import singleUpdateReducer from './singleUpdateReducer';
import journalTextReducer from './journalTextReducer';

const allReducers = combineReducers({
  isLoggedIn: isLoggedInReducer,
  errorOrSuccessMessage: errorOrSuccessMessageReducer,
  singleUpdate: singleUpdateReducer,
  journalText: journalTextReducer,
});

export default allReducers;
