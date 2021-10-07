const saveProductReducer = (state = [], action) => {
  switch (action.type) {
    case "SAVE_PRODUCT": {
      let newState = [...state];
      newState.push(action.payload);
      return newState;
    }

    default:
      return state;
  }
};

export default saveProductReducer;
