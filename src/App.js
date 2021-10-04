import "./App.css";
import { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProductPage from "./pages/ProductPage/ProductPage";
import CategoryPage from "./pages/CategoryPage/CategoryPage";
import CartPage from "./pages/CartPage/CartPage";
import Navbar from "./components/Navbar/Navbar";
import { connect } from "react-redux";
import makeQuery from "./apolloClient";
class App extends Component {
  componentDidMount() {
    // console.log("App component did mount");

    //! This throws an error if executing both functions after mounting component on whichever function is 2nd => TypeError: state.prevCategories.push is not a function at categoriesReducer => Haven't understood why yet...
    this.getCurrencies();
    // this.getCategories();
  }

  componentDidUpdate(prevProps) {
    // console.log("App component did update");

    // Fetch & save categories
    if (prevProps.categories.categories.length === 0) {
      this.getCategories();
    }

    // Fetch & save currencies
    if (prevProps.currencies.currencies.length === 0) {
      this.getCurrencies();
    }

    // Initial category set after mounting component
    if (prevProps.category === null) {
      if (this.props.categories.categories[0]) {
        this.props.setCategory(this.props.categories.categories[0]);
      }
    }

    // Initial currency set after mounting component
    if (prevProps.currency === null) {
      if (this.props.currencies.currencies[0]) {
        this.props.setCurrency(this.props.currencies.currencies[0]);
      }
    }
  }

  // Fetch categories
  getCategories() {
    const categoryQuery = "query { categories { name }}";
    if (this.props.categories.categories.length === 0) {
      makeQuery(categoryQuery).then((results) => {
        let newCategories = results.categories.map((category) => category.name);
        this.props.saveCategories(newCategories);
      });
    }
  }

  // Fetch currencies
  getCurrencies() {
    const currencyQuery = "query { currencies }";
    if (this.props.currencies.currencies.length === 0) {
      makeQuery(currencyQuery).then((results) => {
        let newCurrencies = results.currencies.map((currency) => currency);
        this.props.saveCurrencies(newCurrencies);
      });
    }
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Navbar />;
          <Switch>
            <Route exact path="/">
              <CategoryPage />
            </Route>
            <Route path="/cart">
              <CartPage />
            </Route>
            <Route path={`/product:${this.props.selectedProduct}`}>
              <ProductPage />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedProduct: state.selectedProduct,
    cartItems: state.cart,
    currency: state.currency,
    category: state.category,
    currencies: state.currencies,
    categories: state.categories,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCategory: (category) => {
      dispatch({
        type: "SET_CATEGORY",
        payload: category,
      });
    },
    setCurrency: (currency) => {
      dispatch({
        type: "SET_CURRENCY",
        payload: currency,
      });
    },
    saveCurrencies: (currencies) => {
      dispatch({
        type: "SAVE_CURRENCIES",
        payload: currencies,
      });
    },
    saveCategories: (categories) => {
      dispatch({
        type: "SAVE_CATEGORIES",
        payload: categories,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
