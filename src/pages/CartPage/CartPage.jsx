import React, { PureComponent } from "react";
import "./CartPage.css";
import CartItem from "../../components/CartItem/CartItem";
import { connect } from "react-redux";
import currencySymbols from "../../utils/currencySymbols";
import calculateTotal from "../../utils/calculateTotal";

export class CartPage extends PureComponent {
  constructor(props) {
    super(props);
    this.calculateTotal = calculateTotal.bind(this);
  }

  render() {
    const { cartItems } = this.props;

    return (
      <div className="cart_page">
        <h1 className="page_title">CART</h1>
        {this.renderCartItems()}
        {cartItems.length === 0 && <h2>No items in cart</h2>}
        {this.renderFooter()}
      </div>
    );
  }

  renderCartItems() {
    const { cartItems } = this.props;

    return cartItems.map((item) => (
      <CartItem key={item.cartItemId} itemId={item.cartItemId} />
    ));
  }

  renderFooter() {
    const { cartItems, currency } = this.props;

    return (
      <div className="footer">
        <div className="total_price">
          <h3>Total:</h3>
          <h3>
            {cartItems.length
              ? currencySymbols[currency] + this.calculateTotal()
              : currencySymbols[currency] + "0"}
          </h3>
        </div>

        <button
          type="button"
          className="checkout"
          disabled={cartItems.length === 0}
        >
          CHECKOUT
        </button>
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
