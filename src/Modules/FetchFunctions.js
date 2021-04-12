// TODO REMOVE THE CODE BELOW BEFORE COMMIT
import { store } from '../../App';

export const newGetPastUpdates = async () => {
  try {
    const response = await fetch(`${URL}/updates/me`, {
      method: 'get',
      headers: new Headers({
        Authorization: `Bearer ${props.isUserLoggedIn.token}`,
      }),
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error.message);
  }
};

export const testingReduxActions = () => {
  console.log('Started dispatching');
  store.dispatch({
    type: 'ERROR_MESSAGE_THROWN',
    payload: 'Manually triggering the action',
  });
};
