export const userLoggedIn = (data) => ({
  type: 'USER_LOGGED_IN',
  payload: data,
});

export const userSignedOut = () => ({
  type: 'USER_SIGNED_OUT',
});

export const errorMessageCreated = (data) => ({
  type: 'ERROR_MESSAGE_THROWN',
  payload: data,
});

export const successMessageCreated = (data) => ({
  type: 'SUCCESS_MESSAGE_CREATED',
  payload: data,
});

export const singleUpdateIsSet = (data) => ({
  type: 'UPDATE_IS_SET',
  payload: data,
});

export const journalIsUpdated = (data) => ({
  type: 'JOURNAL_IS_UPDATED',
  payload: data,
});

export const updatesAreFetched = (data) => ({
  type: 'UPDATES_ARE_FETCHED',
  payload: data,
});

export const todaysUpdatesAlreadyExists = (data) => ({
  type: 'UPDATE_EXISTS',
  payload: data,
});

export const shouldStartLoading = () => ({
  type: 'START_LOADING',
});

export const shouldStopLoading = () => ({
  type: 'STOP_LOADING',
});

export const todaysDateIsSet = (data) => ({
  type: 'TODAYS_DATE',
  payload: data,
});

export const themeIsLoaded = (data) => ({
  type: 'THEME_IS_LOADED',
  payload: data,
});

export const newMealAdded = (data) => ({
  type: 'MEAL_ADDED',
  payload: data,
});

export const newFoodEaten = (data) => ({
  type: 'FOOD_ADDED',
  payload: data,
});

export const foodEatenRemoved = (data) => ({
  type: 'FOOD_REMOVED',
  payload: data,
});

export const foodEatenCleaned = () => ({
  type: 'FOOD_CLEANED',
});

export const mealTypeSet = (data) => ({
  type: 'MEAL_TYPE_SET',
  payload: data,
});

export const todaysMealsSet = (data) => ({
  type: 'ALL_TODAYS_MEALS_FETCHED',
  payload: data,
});
