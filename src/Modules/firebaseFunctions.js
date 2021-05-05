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

export const createUserAccount = async (email, password) => {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
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

export const getAllUserUpdates = async (uid) => {
  let data = [];
  const updatesCollection = db.collection('StatusUpdates');
  const queryResults = await updatesCollection.where('user', '==', uid).get();
  queryResults.forEach((doc) => {
    data.push(doc.data());
  });
  return data;
};
