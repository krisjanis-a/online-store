import React, { Component } from "react";
import "./CartOverlay.css";
import CartOverlayItem from "../CartOverlayItem/CartOverlayItem";

export class CartOverlay extends Component {
  render() {
    return (
      <div className="cart_overlay">
        <div className="header">
          <h3>My Bag,</h3>
          <p>2 Items</p>
        </div>
        <CartOverlayItem />
        <CartOverlayItem />
        <div className="footer">
          <h3>Total</h3>
          <h3>$100</h3>
        </div>
        <div className="buttons">
          <button type="button" className="view_bag">
            VIEW BAG
          </button>
          <button type="button" className="checkout">
            CHECKOUT
          </button>
        </div>
      </div>
    );
  }
}

export default CartOverlay;
