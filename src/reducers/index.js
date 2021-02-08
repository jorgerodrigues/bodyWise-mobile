import { combineReducers } from 'redux';
import isLoggedInReducer from './isLoggedInReducer';
import errorOrSuccessMessageReducer from './errorOrSuccessMessageReducer';
import singleUpdateReducer from './singleUpdateReducer';
import journalTextReducer from './journalTextReducer';
import updatesAreFetched from './updatesAreFetchedReducer';

const allReducers = combineReducers({
  isLoggedIn: isLoggedInReducer,
  errorOrSuccessMessage: errorOrSuccessMessageReducer,
  singleUpdate: singleUpdateReducer,
  journalText: journalTextReducer,
  updatesFetched: updatesAreFetched,
});

export default allReducers;
