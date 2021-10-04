export const saveCurrencies = (currencies) => {
  return {
    type: "SAVE_CURRENCIES",
    payload: currencies,
  };
};
