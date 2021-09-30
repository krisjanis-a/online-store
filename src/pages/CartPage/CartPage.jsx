import React, { Component } from "react";
import "./CartPage.css";
import CartItem from "../../components/CartItem/CartItem";

export class CartPage extends Component {
  render() {
    return (
      <div className="cart_page">
        <h1 className="page_title">CART</h1>
        <CartItem />
        <CartItem />
        <CartItem />
      </div>
    );
  }
}

export default CartPage;
