import React, { Component } from "react";
import "./CartItem.css";
import { connect } from "react-redux";
import currencySymbols from "../../utils/currencySymbols";

export class CartItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      item: null,
      imageIndex: 0,
    };
  }

  componentDidMount() {
    this.setState({
      item: this.props.cartItems.filter(
        (item) => item.cartItemId === this.props.itemId
      )[0],
    });
  }

  getPriceByCurrency() {
    const priceObj = this.state.item.cartItem.prices.filter(
      (price) => price.currency === this.props.currency
    );
    if (priceObj[0]) {
      const amount = priceObj[0].amount;

      return amount;
    }
  }

  changeImage(direction) {
    if (direction === "next") {
      if (
        this.state.imageIndex ===
        this.state.item.cartItem.gallery.length - 1
      ) {
        this.setState({
          imageIndex: 0,
        });
      } else {
        this.setState({
          imageIndex: this.state.imageIndex + 1,
        });
      }
    }
    if (direction === "prev") {
      if (this.state.imageIndex === 0) {
        this.setState({
          imageIndex: this.state.item.cartItem.gallery.length - 1,
        });
      } else {
        this.setState({
          imageIndex: this.state.imageIndex - 1,
        });
      }
    }
  }

  render() {
    return (
      <div className="cart_item">
        {this.state.item !== null ? (
          <>
            <div className="product_info">
              <h2 className="brand_title">{this.state.item.cartItem.brand}</h2>
              <h2 className="product_title">{this.state.item.cartItem.name}</h2>
              <h3 className="price">
                {currencySymbols[this.props.currency] +
                  " " +
                  this.getPriceByCurrency()}
              </h3>
              <div className="attribute_choices">
                {this.state.item.cartItem.selectedAttributes.map(
                  (attribute) => {
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
                  }
                )}
              </div>
            </div>
            <div className="quantity-image_wrapper">
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
            </div>
          </>
        ) : (
          <h3 style={{ margin: "1rem" }}>Item cannot be displayed</h3>
        )}
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
      dispatch({
        type: "ADD_EXISTING_PRODUCT",
        payload: cartItemId,
      });
    },
    removeExistingItem: (cartItemId) => {
      dispatch({
        type: "REMOVE_PRODUCT",
        payload: cartItemId,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
