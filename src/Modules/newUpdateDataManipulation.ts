import { store } from '../../App';
import dayjs from 'dayjs';
import { db } from '../firebase/Firebase';

interface updateType {
  user?: string;
  howDoYouFeelToday?: string;
  comments?: string;
  createdAt?: string;
  updatedAt?: string;
}

export const todaysUpdateExists = async (uid: string): Promise<void> => {
  store.dispatch({
    type: 'UPDATE_EXISTS',
    payload: null,
  });
  store.dispatch({
    type: 'START_LOADING',
  });

  try {
    const todaysDate = dayjs().format('DD-MMM-YYYY');
    const updatesCollection = db.collection('StatusUpdates');
    const queryResults = await updatesCollection
      .where('user', '==', uid)
      .where('createdAt', '==', todaysDate)
      .get();
    queryResults.forEach((doc) => {
      const fullData = doc.data();
      if (todaysDate == fullData.createdAt) {
        store.dispatch({
          type: 'UPDATE_EXISTS',
          payload: fullData,
        });
        store.dispatch({
          type: 'UPDATE_IS_SET',
          payload: fullData.howDoYouFeelToday,
        });
        store.dispatch({ type: 'JOURNAL_IS_UPDATED', payload: fullData.comments });
      }
    });
    store.dispatch({
      type: 'STOP_LOADING',
    });
  } catch (e) {
    console.log(e.message);
    store.dispatch({
      type: 'STOP_LOADING',
    });
  }
};

export const getAllUsersUpdates = async (uid: string): Promise<[updateType]> => {
  store.dispatch({
    type: 'START_LOADING',
  });

  let allUpdatesData: [updateType] = [];
  const updatesCollection = db.collection('StatusUpdates');
  const queryResults = await updatesCollection.where('user', '==', uid).get();
  queryResults.forEach((doc) => {
    if (doc.exists) {
      const newData: updateType = doc.data();
      allUpdatesData.push(newData);
    }
  });
  return allUpdatesData;
};

export const updateCurrentStatusUpdate = async (
  userID: string,
  date: string,
  newContent: any
): Promise<void> => {
  store.dispatch({ type: 'START_LOADING' });
  try {
    await db
      .collection('StatusUpdates')
      .doc(`${date}${userID}`)
      .set({ ...newContent });
    store.dispatch({
      type: 'UPDATE_EXISTS',
      payload: newContent,
    });
    store.dispatch({
      type: 'SUCCESS_MESSAGE_CREATED',
      payload: 'Your status was saved',
    });
    store.dispatch({ type: 'STOP_LOADING' });
  } catch (e) {
    console.log(e.message);
    store.dispatch({ type: 'STOP_LOADING' });
    // TODO update state with error message
  }
};
