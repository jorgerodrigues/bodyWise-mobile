import { combineReducers } from 'redux';
import isLoggedInReducer from './isLoggedInReducer';
import errorOrSuccessMessageReducer from './errorOrSuccessMessageReducer';
import singleUpdateReducer from './singleUpdateReducer';
import journalTextReducer from './journalTextReducer';
import updatesAreFetched from './updatesAreFetchedReducer';
import updateAlreadyExistsReducer from './updateAlreadyExistsReducer';
import isLoadingReducer from './isLoadingReducer';

const allReducers = combineReducers({
  isLoggedIn: isLoggedInReducer,
  errorOrSuccessMessage: errorOrSuccessMessageReducer,
  singleUpdate: singleUpdateReducer,
  journalText: journalTextReducer,
  updatesFetched: updatesAreFetched,
  updateAlreadyExists: updateAlreadyExistsReducer,
  isLoading: isLoadingReducer,
});

export default allReducers;
