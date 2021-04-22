interface mealAction {
  type: string;
  payload: payloadItemsEaten;
}

interface payloadItemsEaten {
  food: string;
  id: number;
}
const foodsEatenReducer = (state = [], action: mealAction) => {
  switch (action.type) {
    case 'FOOD_ADDED':
      console.log('Adding food...');
      state.push(action.payload);
      return state;
    case 'FOOD_REMOVED':
      const newState = [];
      state.map((item) => {
        if (item.food !== action.payload.food) {
          newState.push(item);
        }
      });
      state = newState;
      return state;
    default:
      return state;
  }
};

export default foodsEatenReducer;
