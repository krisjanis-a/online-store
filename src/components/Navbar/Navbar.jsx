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
  }

  // Show / Hide Cart Overlay

  toggleCartOverlay() {
    const { showCartOverlay } = this.state;

    this.setState({
      showCartOverlay: !showCartOverlay,
    });
  }

  // Show / Hide Currency Switcher

  toggleCurrencySwitcher() {
    const { showCurrencySwitcher } = this.state;

    this.setState({
      showCurrencySwitcher: !showCurrencySwitcher,
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
    const { showCartOverlay } = this.state;

    return (
      showCartOverlay && (
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
    const { categories } = this.props.categories;

    return (
      <ul className="navbar_categories_list">
        {categories.map((category) => this.renderCategory(category))}
      </ul>
    );
  }

  renderCategory(categoryName) {
    const { category, setCategory } = this.props;

    return (
      <Link to="/" key={categoryName}>
        <li
          className={categoryName === category ? "active" : ""}
          key={categoryName}
          onClick={() => setCategory(categoryName)}
        >
          {categoryName}
        </li>
      </Link>
    );
  }

  renderHomeButton() {
    return <Link to="/">{parse(returnHome)}</Link>;
  }

  renderCurrencyField() {
    const { showCurrencySwitcher } = this.state;

    return (
      <div className="currency_change">
        {this.renderCurrencyButton()}
        {showCurrencySwitcher ? (
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
    const { currency } = this.props;
    const { showCurrencySwitcher } = this.state;

    return (
      <div
        className="currency_button"
        onClick={() => {
          this.toggleCurrencySwitcher();
          this.setState({ showCartOverlay: false });
        }}
      >
        <div className="currency_symbol">{currencySymbols[currency]}</div>

        {showCurrencySwitcher ? <>{parse(arrowUp)}</> : <>{parse(arrowDown)}</>}
      </div>
    );
  }

  renderCartField() {
    const { cartItems } = this.props;
    const { showCartOverlay } = this.state;

    return (
      <div className="open_cart">
        {cartItems.length !== 0 ? (
          <div className="item_count">{cartItems.length}</div>
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
        {showCartOverlay ? (
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
