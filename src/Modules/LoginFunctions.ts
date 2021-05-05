import * as firebase from 'firebase';
import { auth, db } from '../firebase/Firebase';
import { store } from '../../App';

export const firebaseSignIn = async (
  email: string,
  password: string
): Promise<firebase.auth.UserCredential> => {
  store.dispatch({
    type: 'START_LOADING',
  });

  try {
    const response = await auth.signInWithEmailAndPassword(email, password);
    store.dispatch({
      type: 'USER_LOGGED_IN',
      payload: {
        user: {
          UserID: response.user.uid,
          email: response.user.email,
          name: response.user.displayName || 'You',
        },
        isLogged: true,
      },
    });

    store.dispatch({
      type: 'STOP_LOADING',
    });

    return response;
  } catch (err) {
    console.log('Login has failed', err.message);
  }
};

export const loggingOut = async (): Promise<void> => {
  try {
    await firebase.auth().signOut();
    store.dispatch({
      type: 'USER_SIGNED_OUT',
    });
  } catch (err) {
    return console.log('Logout has failed. ', err.message);
  }
};

export const isUserLoggedIn = async (): Promise<void> => {
  auth.onAuthStateChanged(function (user: firebase.User) {
    if (user) {
      store.dispatch({
        type: 'USER_LOGGED_IN',
        payload: {
          user: {
            UserID: auth.currentUser.uid,
            email: auth.currentUser.email,
            name: auth.currentUser.displayName || 'You',
          },
          isLogged: true,
        },
      });
      return true;
    } else {
      console.log('No user');
      return false;
    }
  });
};

export const changeUserPassword = () => {};

export const sendEmailConfirmation = () => {};
