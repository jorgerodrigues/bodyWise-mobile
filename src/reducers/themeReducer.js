const themeReducer = (state = null, action) => {
  switch (action.type) {
    case 'THEME_IS_LOADED':
      return action.payload;

    default:
      return state;
  }
};

export default themeReducer;
