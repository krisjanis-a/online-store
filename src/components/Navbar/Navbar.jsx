import React, { Component } from "react";
import { Link } from "react-router-dom";
import CurrencySwitcher from "../CurrencySwitcher/CurrencySwitcher";
import CartOverlay from "../CartOverlay/CartOverlay";
import "./Navbar.css";
import { connect } from "react-redux";
import currencySymbols from "../../utils/currencySymbols";
import parse from "html-react-parser";
import { arrowUp, arrowDown, returnHome, cartIcon } from "../../utils/iconSVGs";

export class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showCurrencySwitcher: false,
      showCartOverlay: false,
    };

    this.toggleCartOverlay = this.toggleCartOverlay.bind(this);
    this.toggleCurrencySwitcher = this.toggleCurrencySwitcher.bind(this);
    this.setNewCategory = this.setNewCategory.bind(this);
  }

  // Set new category

  setNewCategory(newCategory) {
    this.props.setCategory(newCategory);
  }

  // Show / Hide Cart Overlay

  toggleCartOverlay() {
    this.setState({
      showCartOverlay: !this.state.showCartOverlay,
    });
  }

  // Show / Hide Currency Switcher

  toggleCurrencySwitcher() {
    this.setState({
      showCurrencySwitcher: !this.state.showCurrencySwitcher,
    });
  }

  render() {
    return (
      <div
        className="navbar_container"
        style={{ position: "sticky", top: "0", zIndex: "30" }}
      >
        {this.state.showCartOverlay && (
          <div
            className="navbar_overlay_container"
            style={{ position: "relative" }}
          >
            <div className="navbar_overlay"></div>
          </div>
        )}
        <div className="navbar">
          <ul className="navbar_categories_list">
            {this.props.categories.categories.map((category) => (
              <Link to="/" key={category}>
                <li
                  className={category === this.props.category ? "active" : ""}
                  key={category}
                  onClick={() => this.setNewCategory(category)}
                >
                  {category}
                </li>
              </Link>
            ))}
          </ul>
          <Link to="/">{parse(returnHome)}</Link>

          <div className="actions">
            <div className="currency_change">
              <div
                className="currency_button"
                onClick={() => {
                  this.toggleCurrencySwitcher();
                  this.setState({ showCartOverlay: false });
                }}
              >
                {/* SYMBOL */}
                <div className="currency_symbol">
                  {currencySymbols[this.props.currency]}
                </div>

                {this.state.showCurrencySwitcher ? (
                  // ARROW UP
                  <>{parse(arrowUp)}</>
                ) : (
                  // ARROW DOWN
                  <>{parse(arrowDown)}</>
                )}
              </div>

              {this.state.showCurrencySwitcher ? (
                <div className="currency_switcher_wrapper">
                  <CurrencySwitcher
                    toggleCurrencySwitcher={this.toggleCurrencySwitcher}
                  />
                </div>
              ) : null}
            </div>

            <div className="open_cart">
              {this.props.cartItems.length !== 0 ? (
                <div className="item_count">{this.props.cartItems.length}</div>
              ) : null}
              <div
                className="cart_button"
                onClick={() => {
                  this.toggleCartOverlay();
                  this.setState({ showCurrencySwitcher: false });
                }}
              >
                {/* ICON */}
                {parse(cartIcon)}
              </div>
              {this.state.showCartOverlay ? (
                <div className="cart_overlay_wrapper">
                  <CartOverlay toggleCartOverlay={this.toggleCartOverlay} />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cartItems: state.cart,
    currency: state.currency,
    category: state.category,
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
