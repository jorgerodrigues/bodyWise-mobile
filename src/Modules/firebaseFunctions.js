import * as firebase from 'firebase';
import { auth, db } from '../firebase/Firebase';
import { store } from '../../App';

export const loggingOut = async () => {
  try {
    await firebase.auth().signOut();
  } catch (err) {
    return console.log('Logout has failed. ', err.message);
  }
};

export const createUserAccount = async (email, password, displayName) => {
  console.log('UserName: ', displayName);
  try {
    await auth.createUserWithEmailAndPassword(email, password);
    await updateUserName(displayName);
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
  } catch (err) {
    console.log(err);
    // TODO update state with error message
  }
};

export const saveDataToCollection = async (collection, data) => {
  try {
    const result = await db.collection(collection).add({ ...data });
    return result;
  } catch (e) {
    console.log(e);
    // TODO update state with error message
  }
};

export const updateUserName = async (name) => {
  console.log('Username being set ', name);
  const user = auth.currentUser;
  try {
    await user.updateProfile({
      displayName: name,
    });
    console.log('Final user: ', auth.currentUser);
  } catch (e) {
    console.log(e);
  }
};
