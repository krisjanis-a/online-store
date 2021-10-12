import "./App.css";
import { PureComponent } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProductPage from "../pages/ProductPage/ProductPageContainer";
import CategoryPage from "../pages/CategoryPage/CategoryPage";
import CartPage from "../pages/CartPage/CartPage";
import Navbar from "../components/Navbar/Navbar";
import { connect } from "react-redux";
import ScrollToTop from "./ScrollToTop";
import { getCategories, getCurrencies } from "./initializationQueries";

import { setCategory } from "../store/actions/categoryActions";
import { setCurrency } from "../store/actions/currencyActions";
import { saveCategories } from "../store/actions/categoriesActions";
import { saveCurrencies } from "../store/actions/currenciesActions";

class App extends PureComponent {
  componentDidMount() {
    this.getCategories = getCategories.bind(this);
    this.getCategories();
    this.getCurrencies = getCurrencies.bind(this);
    this.getCurrencies();
  }

  componentDidUpdate(prevProps) {
    this.initializeProps(prevProps);
  }

  initializeProps(prevProps) {
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

  render() {
    return (
      <div className="App">
        <Router>
          <ScrollToTop />
          <Navbar />
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
    products: state.products,
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
      dispatch(setCategory(category));
    },
    setCurrency: (currency) => {
      dispatch(setCurrency(currency));
    },
    saveCurrencies: (currencies) => {
      dispatch(saveCurrencies(currencies));
    },
    saveCategories: (categories) => {
      dispatch(saveCategories(categories));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
