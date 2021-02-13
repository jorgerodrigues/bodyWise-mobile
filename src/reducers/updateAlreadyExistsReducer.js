const updateAlreadyExistsReducer = (state = null, action) => {
  switch (action.type) {
    case 'UPDATE_EXISTS':
      return action.payload;

    default:
      return state;
  }
};

export default updateAlreadyExistsReducer;
