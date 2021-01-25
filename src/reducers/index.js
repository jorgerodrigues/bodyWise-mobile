import { combineReducers } from 'redux';
import isLoggedInReducer from './isLoggedInReducer';

const allReducers = combineReducers({
  isLoggedIn: isLoggedInReducer,
});

export default allReducers;
