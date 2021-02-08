const updatesAreFetched = (state = ['no update'], action) => {
  switch (action.type) {
    case 'UPDATES_ARE_FETCHED':
      return [...action.payload];
    default:
      return state;
  }
};

export default updatesAreFetched;
