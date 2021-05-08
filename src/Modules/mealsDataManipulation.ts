import { auth, db } from '../firebase/Firebase';
import { store } from '../../App';

export const saveMealToCollection = async (collection: string, data: any): Promise<void> => {
  store.dispatch({ type: 'START_LOADING' });
  try {
    const result = await db.collection(collection).add({ ...data });
    store.dispatch({
      type: 'UPDATE_EXISTS',
      payload: data,
    });
    store.dispatch({
      type: 'SUCCESS_MESSAGE_CREATED',
      payload: 'Your status was saved',
    });
    store.dispatch({ type: 'STOP_LOADING' });
  } catch (e) {
    console.log(e);
    // TODO update state with error message
  }
};
