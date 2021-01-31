const singleUpdateReducer = (state = '', action) => {
  switch (action.type) {
    case 'JOURNAL_IS_UPDATED':
      return action.payload;

    default:
      return state;
  }
};

export default singleUpdateReducer;
