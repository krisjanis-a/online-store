import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import CurrencySwitcher from "../CurrencySwitcher/CurrencySwitcher";
import CartOverlay from "../CartOverlay/CartOverlay";
import "./Navbar.css";
import { connect } from "react-redux";
import currencySymbols from "../../utils/currencySymbols";
import parse from "html-react-parser";
import { arrowUp, arrowDown, returnHome, cartIcon } from "../../utils/iconSVGs";

import { setCategory } from "../../store/actions/categoryActions";

export class Navbar extends PureComponent {
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
        {this.renderOverlay()}

        <div className="navbar">
          {this.renderCategories()}
          {this.renderHomeButton()}

          <div className="actions">
            {this.renderCurrencyField()}
            {this.renderCartField()}
          </div>
        </div>
      </div>
    );
  }

  renderOverlay() {
    return (
      this.state.showCartOverlay && (
        <div
          className="navbar_overlay_container"
          style={{ position: "relative" }}
        >
          <div className="navbar_overlay"></div>
        </div>
      )
    );
  }

  renderCategories() {
    return (
      <ul className="navbar_categories_list">
        {this.props.categories.categories.map((category) =>
          this.renderCategory(category)
        )}
      </ul>
    );
  }

  renderCategory(category) {
    return (
      <Link to="/" key={category}>
        <li
          className={category === this.props.category ? "active" : ""}
          key={category}
          onClick={() => this.setNewCategory(category)}
        >
          {category}
        </li>
      </Link>
    );
  }

  renderHomeButton() {
    return <Link to="/">{parse(returnHome)}</Link>;
  }

  renderCurrencyField() {
    return (
      <div className="currency_change">
        {this.renderCurrencyButton()}
        {this.state.showCurrencySwitcher ? (
          <div className="currency_switcher_wrapper">
            <CurrencySwitcher
              toggleCurrencySwitcher={this.toggleCurrencySwitcher}
            />
          </div>
        ) : null}
      </div>
    );
  }

  renderCurrencyButton() {
    return (
      <div
        className="currency_button"
        onClick={() => {
          this.toggleCurrencySwitcher();
          this.setState({ showCartOverlay: false });
        }}
      >
        <div className="currency_symbol">
          {currencySymbols[this.props.currency]}
        </div>

        {this.state.showCurrencySwitcher ? (
          <>{parse(arrowUp)}</>
        ) : (
          <>{parse(arrowDown)}</>
        )}
      </div>
    );
  }

  renderCartField() {
    return (
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
          {parse(cartIcon)}
        </div>
        {this.state.showCartOverlay ? (
          <div className="cart_overlay_wrapper">
            <CartOverlay toggleCartOverlay={this.toggleCartOverlay} />
          </div>
        ) : null}
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
      dispatch(setCategory(category));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
