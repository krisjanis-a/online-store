import React, { Component } from "react";
import "./CartOverlayItem.css";
import { connect } from "react-redux";
import currencySymbols from "../../currencySymbols";

export class CartOverlayItem extends Component {
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
      <div className="cart_overlay_item">
        {this.state.item !== null ? (
          <>
            <div className="info">
              <div className="brand_and_name">
                <h3 className="item_brand">{this.state.item.cartItem.brand}</h3>
                <p className="item_name">{this.state.item.cartItem.name}</p>
              </div>
              <p className="item_price">
                {" "}
                {currencySymbols[this.props.currency] +
                  " " +
                  this.getPriceByCurrency()}
              </p>

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
          <h4 style={{ margin: "1.5rem" }}>Item cannot be displayed</h4>
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

export default connect(mapStateToProps, mapDispatchToProps)(CartOverlayItem);
