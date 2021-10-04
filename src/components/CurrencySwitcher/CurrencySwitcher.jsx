import React, { Component } from "react";
import { connect } from "react-redux";
import "./CurrencySwitcher.css";

export class CurrencySwitcher extends Component {
  setNewCurrency(newCurrency) {
    this.props.setCurrency(newCurrency);
  }

  componentDidUpdate() {
    console.log(this.props.currency);
  }

  render() {
    const currencySymbols = {
      USD: "$",
      GBP: "­£",
      AUD: "$",
      JPY: "¥",
      RUB: "₽",
    };

    return (
      <div className="currency_switcher">
        <ul className="currency_list">
          {this.props.currencies.currencies.map((currency) => (
            <li
              className="currency_item"
              key={currency}
              onClick={() => {
                this.setNewCurrency(currency);
                this.props.toggleCurrencySwitcher();
              }}
            >
              {/* {currencySymbols[currency] + " " + currency} */}
              {`${currencySymbols[currency]} ${currency}`}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cartItems: state.cart,
    currency: state.currency,
    category: state.category,
    currencies: state.currencies,
    categories: state.categories,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrency: (currency) => {
      dispatch({
        type: "SET_CURRENCY",
        payload: currency,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrencySwitcher);
