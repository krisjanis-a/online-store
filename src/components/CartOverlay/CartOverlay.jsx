import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./CartOverlay.css";
import CartOverlayItem from "../CartOverlayItem/CartOverlayItem";
import { connect } from "react-redux";

export class CartOverlay extends Component {
  calculateTotal() {
    let total = this.props.cartItems.map(
      (item) =>
        item.cartItem.prices.filter(
          (price) => price.currency === this.props.currency
        )[0].amount * item.quantity
    );
    return Number.parseFloat(total.reduce((a, b) => a + b)).toFixed(2);
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
      <div className="cart_overlay">
        <div className="header">
          <h3>My Bag,</h3>
          <p>{this.props.cartItems.length} Items</p>
        </div>
        {this.props.cartItems.map((item) => (
          <CartOverlayItem key={item.cartItemId} itemId={item.cartItemId} />
        ))}
        <div className="footer">
          <h3>Total</h3>
          <h3>
            {this.props.cartItems.length
              ? currencySymbols[this.props.currency] + this.calculateTotal()
              : currencySymbols[this.props.currency] + "0"}
          </h3>
        </div>
        <div className="buttons">
          <Link to="/cart">
            <button
              type="button"
              className="view_bag"
              onClick={() => this.props.toggleCartOverlay()}
            >
              VIEW BAG
            </button>
          </Link>
          <button
            type="button"
            className="checkout"
            onClick={() => this.props.toggleCartOverlay()}
            disabled={this.props.cartItems.length === 0}
          >
            CHECKOUT
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cartItems: state.cart,
    currency: state.currency,
  };
};

export default connect(mapStateToProps)(CartOverlay);
