interface mealAction {
  type: string;
  payload: number;
}

const updatePreciseValue = (state = null, action: mealAction) => {
  switch (action.type) {
    case 'UPDATE_VALUE_SET':
      return action.payload;
    default:
      return state;
  }
};

export default updatePreciseValue;
