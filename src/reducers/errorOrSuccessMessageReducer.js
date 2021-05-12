const errorOrSuccessMessageReducer = (state = '', action) => {
  switch (action.type) {
    case 'ERROR_MESSAGE_THROWN':
      return { message: action.payload, type: 'ErrorMessage' };

    case 'SUCCESS_MESSAGE_CREATED':
      return { message: action.payload, type: 'SuccessMessage' };
    case 'FOOD_CLEANED':
      return (state = '');
    default:
      return state;
  }
};

export default errorOrSuccessMessageReducer;
