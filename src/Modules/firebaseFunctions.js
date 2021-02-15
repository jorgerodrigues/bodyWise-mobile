import * as firebase from 'firebase';
import auth from '../firebase/Firebase';
import firestore from '../firebase/Firebase';

export const signIn = async (email, password) => {
  try {
    const response = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    console.log(response);
  } catch (err) {
    Alert.alert('Login has failed', err.message);
  }
};

export const loggingOut = async () => {
  try {
    await firebase.auth().signOut();
  } catch (err) {
    Alert.alert('Logout has failed', err.message);
  }
};

export const createUserAccount = async (email, password) => {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    const currentUser = auth.currentUser;
    console.log(currentUser);
    // firestore.collection('users').doc(currentUser.uid).set({
    //   email: currentUser.email,
    //   firstName: firstName,
    // });
  } catch (err) {
    console.log(err);
  }
};

export const changeUserPassword = () => {};

export const sendEmailConfirmation = () => {};
