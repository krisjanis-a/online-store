import React, { PureComponent } from "react";
import "./CartItem.css";
import "./CartOverlayItem.css";
import { connect } from "react-redux";
import currencySymbols from "../../utils/currencySymbols";
import changeImage from "../../utils/changeImage";
import getPriceByCurrency from "../../utils/getPriceByCurrency";

import {
  addExistingProduct,
  removeProduct,
} from "../../store/actions/cartActions";

export class CartItem extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      item: null,
      imageIndex: 0,
    };

    this.changeImage = changeImage.bind(this);
    this.getPriceByCurrency = getPriceByCurrency.bind(this);
  }

  componentDidMount() {
    const { cartItems, itemId } = this.props;

    this.setState({
      item: cartItems.filter((item) => item.cartItemId === itemId)[0],
    });
  }

  render() {
    const { item } = this.state;
    const { cartItemType } = this.props;

    return (
      <div className={cartItemType}>
        {item !== null ? (
          <>
            <div className="product_info">
              {cartItemType === "cart_item" && this.renderInfoText()}
              {cartItemType === "cart_overlay_item" &&
                this.renderOverlayInfoText()}

              {this.renderAttributes()}
            </div>
            <div className="quantity-image_wrapper">
              {this.renderQuantity()}
              {this.renderImage()}
            </div>
          </>
        ) : (
          <>{this.renderCannotDisplay()}</>
        )}
      </div>
    );
  }

  renderInfoText() {
    const { brand, name, prices } = this.state.item.cartItem;
    const { currency } = this.props;

    return (
      <div className="text">
        <h2 className="brand_title">{brand}</h2>
        <h2 className="product_title">{name}</h2>
        <h3 className="price">
          {currencySymbols[currency] + " " + this.getPriceByCurrency(prices)}
        </h3>
      </div>
    );
  }

  renderOverlayInfoText() {
    const { brand, name, prices } = this.state.item.cartItem;
    const { currency } = this.props;

    return (
      <div className="text">
        <div className="brand_and_name">
          <h3 className="item_brand">{brand}</h3>
          <p className="item_name">{name}</p>
        </div>
        <p className="item_price">
          {currencySymbols[currency] + " " + this.getPriceByCurrency(prices)}
        </p>
      </div>
    );
  }

  renderAttributes() {
    const { selectedAttributes } = this.state.item.cartItem;

    return (
      <div className="attribute_choices">
        {selectedAttributes.map((attribute) => {
          return (
            <div key={attribute.name}>
              {attribute.type === "text" && (
                <div
                  title={attribute.name}
                  className={`attribute_choice ${attribute.type}`}
                  key={attribute.name}
                >
                  {attribute.value}
                </div>
              )}
              {attribute.type === "swatch" && (
                <div
                  title={attribute.displayValue}
                  className={`attribute_choice ${attribute.type}`}
                  key={attribute.name}
                  style={{
                    backgroundColor: `${attribute.value}`,
                  }}
                ></div>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  renderQuantity() {
    const { cartItemId } = this.state.item;
    const { addExistingItem, removeExistingItem, cartItems } = this.props;

    return (
      <div className="quantity_field">
        <button
          className="add_item"
          onClick={() => {
            addExistingItem(cartItemId);
          }}
        >
          +
        </button>
        <p className="quantity">
          {
            cartItems.filter((item) => item.cartItemId === cartItemId)[0]
              .quantity
          }
        </p>
        <button
          className="remove_item"
          onClick={() => {
            removeExistingItem(cartItemId);
          }}
        >
          -
        </button>
      </div>
    );
  }

  renderImage() {
    const {
      imageIndex,
      item: {
        cartItem: { gallery },
      },
    } = this.state;

    return (
      <div className="image_container">
        {gallery.length > 1 && (
          <>
            <button
              className="prev_image"
              onClick={() => this.changeImage("prev")}
            >
              &lt;
            </button>
            <button
              className="next_image"
              onClick={() => this.changeImage("next")}
            >
              &gt;
            </button>
          </>
        )}
        <img className="item_image" src={gallery[imageIndex]} alt="" />
      </div>
    );
  }

  renderCannotDisplay() {
    const { cartItemType } = this.props;

    return (
      <>
        {cartItemType === "cart_item" && (
          <h3 style={{ margin: "1rem" }}>Item cannot be displayed</h3>
        )}
        {cartItemType === "cart_overlay_item" && (
          <h4 style={{ margin: "1.5rem" }}>Item cannot be displayed</h4>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cartItems: state.cart,
    currency: state.currency,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addExistingItem: (cartItemId) => {
      dispatch(addExistingProduct(cartItemId));
    },
    removeExistingItem: (cartItemId) => {
      dispatch(removeProduct(cartItemId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
