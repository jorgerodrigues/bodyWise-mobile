import axios from 'axios';
import { connect } from 'react-redux';
import * as SecureStore from 'expo-secure-store';
import {
  userLoggedIn,
  userSignedOut,
  successMessageCreated,
  errorMessageCreated,
} from '../actions/index';

export const signOut = async () => {
  try {
    const response = await axios.post(
      `${URL}/users/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${props.isUserLoggedIn.token}`,
        },
      }
    );
    console.log(response.message);
  } catch (e) {
    console.log(e.message);
  }
  props.userSignedOut();
  await SecureStore.deleteItemAsync('token');
};

const userLogin = async (user, password) => {
  const URL = 'http://127.0.0.1:3000';
  try {
    const response = await axios.post(`${URL}/users/login`, {
      email: user,
      password: password,
    });
    props.userLoggedIn(response.data);
    await SecureStore.setItemAsync('token', response.data.token);
    props.errorMessageCreated(null);
  } catch (e) {
    props.errorMessageCreated('Login failed');
  }
};

export const userAccountCreation = async (user, password, name) => {
  const URL = 'http://127.0.0.1:3000';

  if (password !== usersPasswordConfirm) {
    return props.errorMessageCreated('The passwords do not match');
  }

  try {
    const response = await axios.post(`${URL}/users/signup`, {
      name: name,
      email: user,
      password: password,
    });
    props.userLoggedIn(response.data);
    await SecureStore.setItemAsync('token', response.data.token);
    props.errorMessageCreated(null);
  } catch (e) {
    console.log(e.message);
    props.errorMessageCreated('The signup has failed');
  }
};
