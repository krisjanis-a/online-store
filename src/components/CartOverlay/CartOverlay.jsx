import React, { Component } from "react";
import { Link } from "react-router-dom";
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
          >
            CHECKOUT
          </button>
        </div>
      </div>
    );
  }
}

export default CartOverlay;
