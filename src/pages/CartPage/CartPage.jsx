import React, { Component } from "react";
import "./CartPage.css";
import CartItem from "../../components/CartItem/CartItem";
import { connect } from "react-redux";
import currencySymbols from "../../utils/currencySymbols";
import calculateTotal from "../../utils/calculateTotal";

export class CartPage extends Component {
  constructor(props) {
    super(props);
    this.calculateTotal = calculateTotal.bind(this);
  }

  render() {
    return (
      <div className="cart_page">
        <h1 className="page_title">CART</h1>
        {this.props.cartItems.map((item) => (
          <CartItem key={item.cartItemId} itemId={item.cartItemId} />
        ))}

        {this.props.cartItems.length === 0 && <h2>No items in cart</h2>}
        <div className="footer">
          <div className="total_price">
            <h3>Total:</h3>
            <h3>
              {this.props.cartItems.length
                ? currencySymbols[this.props.currency] + this.calculateTotal()
                : currencySymbols[this.props.currency] + "0"}
            </h3>
          </div>

          <button
            type="button"
            className="checkout"
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

export default connect(mapStateToProps)(CartPage);
