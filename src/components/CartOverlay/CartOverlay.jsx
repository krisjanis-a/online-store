import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import "./CartOverlay.css";
import CartItem from "../CartItem/CartItem";
import { connect } from "react-redux";
import currencySymbols from "../../utils/currencySymbols";
import calculateTotal from "../../utils/calculateTotal";

export class CartOverlay extends PureComponent {
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
    const { toggleCartOverlay } = this.props;

    e.stopPropagation();
    const cartButton = document.querySelector(".cart_button");
    if (
      !this.cartOverlayRef.current.contains(e.target) &&
      !cartButton.contains(e.target)
    ) {
      toggleCartOverlay();
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
        {this.renderHeader()}
        {this.renderCartItems()}
        {this.renderFooter()}
        {this.renderButtons()}
      </div>
    );
  }

  renderHeader() {
    const { cartItems } = this.props;

    return (
      <div className="header">
        <h3>My Bag,</h3>
        <p>{cartItems.length} Items</p>
      </div>
    );
  }

  renderCartItems() {
    const { cartItems } = this.props;

    return (
      <div className="cart_items">
        {cartItems.map((item) => (
          <CartItem
            key={item.cartItemId}
            itemId={item.cartItemId}
            cartItemType={"cart_overlay_item"}
          />
        ))}
      </div>
    );
  }

  renderFooter() {
    const { cartItems, currency } = this.props;

    return (
      <div className="footer">
        <h3>Total</h3>
        <h3>
          {cartItems.length
            ? currencySymbols[currency] + this.calculateTotal()
            : currencySymbols[currency] + "0"}
        </h3>
      </div>
    );
  }

  renderButtons() {
    const { cartItems, toggleCartOverlay } = this.props;

    return (
      <div className="buttons">
        <Link to="/cart">
          <button
            type="button"
            className="view_bag"
            onClick={() => toggleCartOverlay()}
          >
            VIEW BAG
          </button>
        </Link>

        <Link to="/cart">
          <button
            type="button"
            className="checkout"
            onClick={() => toggleCartOverlay()}
            disabled={cartItems.length === 0}
          >
            CHECKOUT
          </button>
        </Link>
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
