const errorOrSuccessMessageReducer = (state = '', action) => {
  switch (action.type) {
    case 'ERROR_MESSAGE_THROWN':
      return { message: action.payload, type: 'ErrorMessage' };

    default:
      return state;
  }
};

export default errorOrSuccessMessageReducer;
