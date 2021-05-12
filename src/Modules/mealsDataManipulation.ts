import { auth, db } from '../firebase/Firebase';
import { store } from '../../App';
import firebase from 'firebase';

interface Meals {
  createdAt: string;
  food: [Food];
  meal: string;
  user: string;
}
interface Food {
  food: string;
  id: number;
}

export const saveMealToCollection = async (collection: string, data: any): Promise<void> => {
  store.dispatch({ type: 'START_LOADING' });
  try {
    await db.collection(collection).add({ ...data });
    store.dispatch({
      type: 'UPDATE_EXISTS',
      payload: data,
    });
    store.dispatch({
      type: 'SUCCESS_MESSAGE_CREATED',
      payload: 'Your meal was saved',
    });
    store.dispatch({ type: 'STOP_LOADING' });
  } catch (e) {
    console.log(e);
    // TODO update state with error message
  }
};

export const fetchAllMealsOfToday = async (uid: string, date: string): Promise<[Meals]> => {
  const result: [Meals?] = [];
  const mealsCollection = db.collection('Meals');
  const queryResult = await mealsCollection
    .where('createdAt', '==', date)
    .where('user', '==', uid)
    .get();
  // add each result to the state
  queryResult.forEach((meal) => {
    result.push(meal.data());
  });
  return result;
};
