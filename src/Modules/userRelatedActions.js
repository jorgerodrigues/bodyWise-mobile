import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import {
  userLoggedIn,
  userSignedOut,
  successMessageCreated,
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
