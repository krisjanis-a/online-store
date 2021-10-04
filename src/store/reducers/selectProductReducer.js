const selectProductReducer = (state = null, action) => {
  switch (action.type) {
    case "SELECT_PRODUCT":
      return action.payload || null;

    default:
      return state;
  }
};

export default selectProductReducer;
