import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./CartOverlay.css";
import CartOverlayItem from "../CartOverlayItem/CartOverlayItem";
import { connect } from "react-redux";
import currencySymbols from "../../utils/currencySymbols";
import calculateTotal from "../../utils/calculateTotal";

export class CartOverlay extends Component {
  constructor(props) {
    super(props);
    this.cartOverlayRef = React.createRef();

    this.clickInsideComponent = this.clickInsideComponent.bind(this);
    this.calculateTotal = calculateTotal.bind(this);
  }

  componentDidMount() {
    window.addEventListener("mousedown", this.clickInsideComponent);
  }

  clickInsideComponent(e) {
    e.stopPropagation();
    const cartButton = document.querySelector(".cart_button");
    if (
      !this.cartOverlayRef.current.contains(e.target) &&
      !cartButton.contains(e.target)
    ) {
      this.props.toggleCartOverlay();
    }
  }

  componentWillUnmount() {
    window.removeEventListener("mousedown", this.clickInsideComponent);
  }

  render() {
    return (
      <div
        className="cart_overlay"
        ref={this.cartOverlayRef}
        style={{ maxHeight: "min(80vh, 800px)" }}
      >
        <div className="header">
          <h3>My Bag,</h3>
          <p>{this.props.cartItems.length} Items</p>
        </div>
        <div className="cart_items">
          {this.props.cartItems.map((item) => (
            <CartOverlayItem key={item.cartItemId} itemId={item.cartItemId} />
          ))}
        </div>
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

          <Link to="/cart">
            <button
              type="button"
              className="checkout"
              onClick={() => this.props.toggleCartOverlay()}
              disabled={this.props.cartItems.length === 0}
            >
              CHECKOUT
            </button>
          </Link>
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
