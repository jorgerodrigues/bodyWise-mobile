const singleUpdateReducer = (state = null, action) => {
  switch (action.type) {
    case 'UPDATE_IS_SET':
      return action.payload;

    default:
      return state;
  }
};

export default singleUpdateReducer;
