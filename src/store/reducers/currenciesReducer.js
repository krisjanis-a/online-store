const currenciesReducer = (
  state = {
    currencies: [],
    // prevCurrencies: []
  },
  action
) => {
  switch (action.type) {
    case "SAVE_CURRENCIES":
      return {
        currencies: action.payload,
        // prevCurrencies:
        //   state.currencies.length !== 0
        //     ? state.prevCurrencies.push(state.currencies)
        //     : [],
      };

    default:
      return state;
  }
};

export default currenciesReducer;
