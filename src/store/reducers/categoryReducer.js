const categoryReducer = (state = "", action) => {
  switch (action.type) {
    case "SET_CATEGORY":
      return {
        state: action.payload,
      };

    default:
      return state;
  }
};

export default categoryReducer;
