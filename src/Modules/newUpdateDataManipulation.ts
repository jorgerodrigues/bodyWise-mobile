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
      if (todaysDate == fullData.createdAt.toDate()) {
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
  const queryResults = await updatesCollection
    .where('user', '==', uid)
    .orderBy('createdAt', 'desc')
    .get();
  queryResults.forEach((doc) => {
    if (doc.exists) {
      const newData: updateType = doc.data();
      allUpdatesData.push(newData);
    }
  });

  const fullData = allUpdatesData.map((update) => {
    return { ...update, createdAt: update.createdAt.toDate() };
  });

  return fullData;
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
      .doc(`${dayjs(date).format('DD-MMM-YYYY')}${userID}`)
      .set({ ...newContent });
    store.dispatch({
      type: 'UPDATE_EXISTS',
      payload: newContent,
    });
    const allUpdates = await getAllUsersUpdates(newContent.user);
    store.dispatch({
      type: 'UPDATES_ARE_FETCHED',
      payload: allUpdates,
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
