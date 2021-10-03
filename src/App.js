import "./App.css";
import { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProductPage from "./pages/ProductPage/ProductPage";
import CategoryPage from "./pages/CategoryPage/CategoryPage";
import CartPage from "./pages/CartPage/CartPage";
import Navbar from "./components/Navbar/Navbar";
import { connect } from "react-redux";
class App extends Component {
  componentDidMount() {}

  render() {
    return (
      <div className="App">
        <Navbar />;
        <Router>
          <Switch>
            <Route exact path="/">
              <CategoryPage />
            </Route>
            <Route path="/cart">
              <CartPage />
            </Route>
            <Route path="/product">
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
    cartItems: state.cart,
    currency: state.currency,
    category: state.category,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addProduct: (product) => {
      dispatch({
        type: "ADD_PRODUCT",
        payload: product,
      });
    },
    removeProduct: (product) => {
      dispatch({
        type: "REMOVE_PRODUCT",
        payload: product,
      });
    },
    // setCurrency: (currency) => {
    //   dispatch({
    //     type: "SET_CURRENCY",
    //     payload: currency,
    //   });
    // },
    setCategory: (category) => {
      dispatch({
        type: "SET_CATEGORY",
        payload: category,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
