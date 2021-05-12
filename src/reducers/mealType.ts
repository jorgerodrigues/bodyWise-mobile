interface mealAction {
  type: string;
  payload: string;
}

const mealType = (state = '', action: mealAction) => {
  switch (action.type) {
    case 'MEAL_TYPE_SET':
      return action.payload;
    case 'FOOD_CLEANED':
      return (state = '');
    default:
      return state;
  }
};

export default mealType;
