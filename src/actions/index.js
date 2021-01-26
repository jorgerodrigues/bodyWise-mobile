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
