import makeQuery from "../utils/apolloClient";

// Fetch categories
export function getCategories() {
  const {
    saveCategories,
    categories: { categories },
  } = this.props;

  const categoryQuery = "query { categories { name }}";
  if (categories.length === 0) {
    makeQuery(categoryQuery).then((results) => {
      const newCategories = results.categories.map((category) => category.name);
      saveCategories(newCategories);
    });
  }
}

// Fetch currencies
export function getCurrencies() {
  const {
    saveCurrencies,
    currencies: { currencies },
  } = this.props;

  const currencyQuery = "query { currencies }";
  if (currencies.length === 0) {
    makeQuery(currencyQuery).then((results) => {
      const newCurrencies = results.currencies.map((currency) => currency);
      saveCurrencies(newCurrencies);
    });
  }
}
