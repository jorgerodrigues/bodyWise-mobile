import { combineReducers } from 'redux';
import isLoggedInReducer from './isLoggedInReducer';
import errorOrSuccessMessageReducer from './errorOrSuccessMessageReducer';
import singleUpdateReducer from './singleUpdateReducer';
import journalTextReducer from './journalTextReducer';
import updatesAreFetched from './updatesAreFetchedReducer';
import updateAlreadyExistsReducer from './updateAlreadyExistsReducer';

const allReducers = combineReducers({
  isLoggedIn: isLoggedInReducer,
  errorOrSuccessMessage: errorOrSuccessMessageReducer,
  singleUpdate: singleUpdateReducer,
  journalText: journalTextReducer,
  updatesFetched: updatesAreFetched,
  updateAlreadyExists: updateAlreadyExistsReducer,
});

export default allReducers;
