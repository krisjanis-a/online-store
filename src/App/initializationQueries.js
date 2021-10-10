import makeQuery from "../utils/apolloClient";

// Fetch categories
export function getCategories() {
  const categoryQuery = "query { categories { name }}";
  if (this.props.categories.categories.length === 0) {
    makeQuery(categoryQuery).then((results) => {
      const newCategories = results.categories.map((category) => category.name);
      this.props.saveCategories(newCategories);
    });
  }
}

// Fetch currencies
export function getCurrencies() {
  const currencyQuery = "query { currencies }";
  if (this.props.currencies.currencies.length === 0) {
    makeQuery(currencyQuery).then((results) => {
      const newCurrencies = results.currencies.map((currency) => currency);
      this.props.saveCurrencies(newCurrencies);
    });
  }
}
