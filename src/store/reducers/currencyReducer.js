const currencyReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_CURRENCY":
      return action.payload || null;

    default:
      return state;
  }
};

export default currencyReducer;
