import { auth, db } from '../firebase/Firebase';
import { store } from '../../App';

export const createUserAccount = async (email, password, displayName) => {
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

export const saveUpdateToCollection = async (collection, data) => {
  store.dispatch({ type: 'START_LOADING' });
  try {
    const result = await db
      .collection(collection)
      .doc(`${data.createdAt}${data.user}`)
      .set({ ...data });
    store.dispatch({
      type: 'UPDATE_EXISTS',
      payload: data,
    });
    store.dispatch({
      type: 'SUCCESS_MESSAGE_CREATED',
      payload: 'Your status was saved',
    });
    store.dispatch({ type: 'STOP_LOADING' });
    return result;
  } catch (e) {
    console.log(e);
    // TODO update state with error message
  }
};

export const updateUserName = async (name) => {
  const user = auth.currentUser;
  try {
    await user.updateProfile({
      displayName: name,
    });
  } catch (e) {
    console.log(e);
  }
};
