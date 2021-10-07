const currenciesReducer = (
  state = {
    currencies: [],
  },
  action
) => {
  switch (action.type) {
    case "SAVE_CURRENCIES":
      return {
        currencies: action.payload,
      };

    default:
      return state;
  }
};

export default currenciesReducer;
