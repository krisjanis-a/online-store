const categoryReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_CATEGORY":
      return action.payload || null;

    default:
      return state;
  }
};

export default categoryReducer;
