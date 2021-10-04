const initialState = [];

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_PRODUCT":
      return (state = state.push(action.payload));
    case "REMOVE_PRODUCT":
      return state;

    default:
      return state;
  }
};

export default cartReducer;
