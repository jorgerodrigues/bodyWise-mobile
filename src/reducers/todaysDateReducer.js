const todaysDateReducer = (state = null, action) => {
  switch (action.type) {
    case 'TODAYS_DATE':
      return action.payload;

    default:
      return state;
  }
};

export default todaysDateReducer;
