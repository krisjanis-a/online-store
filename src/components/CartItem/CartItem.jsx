import React, { PureComponent } from "react";
import "./CartItem.css";
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
    this.setState({
      item: this.props.cartItems.filter(
        (item) => item.cartItemId === this.props.itemId
      )[0],
    });
  }

  render() {
    return (
      <div className="cart_item">
        {this.state.item !== null ? (
          <>
            <div className="product_info">
              {this.renderInfoText()}
              {this.renderAttributes()}
            </div>
            <div className="quantity-image_wrapper">
              {this.renderQuantity()}
              {this.renderImage()}
            </div>
          </>
        ) : (
          <h3 style={{ margin: "1rem" }}>Item cannot be displayed</h3>
        )}
      </div>
    );
  }

  renderInfoText() {
    return (
      <div className="text">
        <h2 className="brand_title">{this.state.item.cartItem.brand}</h2>
        <h2 className="product_title">{this.state.item.cartItem.name}</h2>
        <h3 className="price">
          {currencySymbols[this.props.currency] +
            " " +
            this.getPriceByCurrency(this.state.item.cartItem.prices)}
        </h3>
      </div>
    );
  }

  renderAttributes() {
    return (
      <div className="attribute_choices">
        {this.state.item.cartItem.selectedAttributes.map((attribute) => {
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
    return (
      <div className="quantity_field">
        <button
          className="add_item"
          onClick={() => {
            this.props.addExistingItem(this.state.item.cartItemId);
          }}
        >
          +
        </button>
        <p className="quantity">
          {
            this.props.cartItems.filter(
              (item) => item.cartItemId === this.state.item.cartItemId
            )[0].quantity
          }
        </p>
        <button
          className="remove_item"
          onClick={() => {
            this.props.removeExistingItem(this.state.item.cartItemId);
          }}
        >
          -
        </button>
      </div>
    );
  }

  renderImage() {
    return (
      <div className="image_container">
        {this.state.item.cartItem.gallery.length > 1 && (
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
        <img
          className="item_image"
          src={this.state.item.cartItem.gallery[this.state.imageIndex]}
          alt=""
        />
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
