import React, { Component } from "react";
import "./CartPage.css";
import CartItem from "../../components/CartItem/CartItem";
import { connect } from "react-redux";

export class CartPage extends Component {
  render() {
    return (
      <div className="cart_page">
        <h1 className="page_title">CART</h1>
        {this.props.cartItems.map((item) => (
          <CartItem key={item.cartItemId} itemId={item.cartItemId} />
        ))}
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

export default connect(mapStateToProps)(CartPage);
