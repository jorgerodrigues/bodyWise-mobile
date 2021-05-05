const isLoggedInReducer = (state = { user: null, isLogged: false }, action) => {
  switch (action.type) {
    case 'USER_LOGGED_IN':
      return { ...action.payload, isLogged: true };
    case 'USER_SIGNED_OUT':
      return { user: null, isLogged: false };
    default:
      return state;
  }
};

export default isLoggedInReducer;
