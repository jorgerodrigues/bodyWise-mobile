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

export const singleUpdateIsSet = (data) => ({
  type: 'UPDATE_IS_SET',
  payload: data,
});

export const journalIsUpdated = (data) => ({
  type: 'JOURNAL_IS_UPDATED',
  payload: data,
});
