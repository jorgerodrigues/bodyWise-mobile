interface mealAction {
  type: string;
  payload: string;
}

const todaysMeals = (state = [], action: mealAction) => {
  switch (action.type) {
    case 'ALL_TODAYS_MEALS_FETCHED':
      return action.payload;
    default:
      return state;
  }
};

export default todaysMeals;
