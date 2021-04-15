import { combineReducers } from 'redux';
import isLoggedInReducer from './isLoggedInReducer';
import errorOrSuccessMessageReducer from './errorOrSuccessMessageReducer';
import singleUpdateReducer from './singleUpdateReducer';
import journalTextReducer from './journalTextReducer';
import updatesAreFetched from './updatesAreFetchedReducer';
import updateAlreadyExistsReducer from './updateAlreadyExistsReducer';
import isLoadingReducer from './isLoadingReducer';
import todaysDateReducer from './todaysDateReducer';
import themeReducer from './themeReducer';
import newMealReducer from './newMealReducer';

const allReducers = combineReducers({
  isLoggedIn: isLoggedInReducer,
  errorOrSuccessMessage: errorOrSuccessMessageReducer,
  singleUpdate: singleUpdateReducer,
  journalText: journalTextReducer,
  updatesFetched: updatesAreFetched,
  updateAlreadyExists: updateAlreadyExistsReducer,
  isLoading: isLoadingReducer,
  todaysDate: todaysDateReducer,
  theme: themeReducer,
  newMeal: newMealReducer,
});

export default allReducers;
