interface mealAction {
  type: string;
  payload: payloadMeal;
}

interface payloadMeal {
  mealType: string;
  mealDetails: string;
}
const newMealReducer = (state = [], action: mealAction) => {
  switch (action.type) {
    case 'MEAL_ADDED':
      return state.push(action.payload);
    default:
      return state;
  }
};

export default newMealReducer;
