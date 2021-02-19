import * as firebase from 'firebase';
import { auth } from '../firebase/Firebase';

export const firebaseSignIn = async (email, password) => {
  try {
    const response = await auth.signInWithEmailAndPassword(email, password);
    return response;
  } catch (err) {
    console.log('Login has failed', err.message);
  }
};

export const loggingOut = async () => {
  try {
    await firebase.auth().signOut();
  } catch (err) {
    return console.log('Logout has failed. ', err.message);
  }
};

export const createUserAccount = async (email, password) => {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    const currentUser = firebase.auth().currentUser;
    console.log(currentUser);
  } catch (err) {
    console.log(err);
  }
};

export const changeUserPassword = () => {};

export const sendEmailConfirmation = () => {};
