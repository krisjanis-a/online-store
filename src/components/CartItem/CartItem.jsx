import React, { Component } from "react";
import "./CartItem.css";
import { connect } from "react-redux";

export class CartItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      item: null,
      prices: [],
      attributes: [],
    };
  }

  componentDidMount() {
    this.setState({
      item: this.props.cartItems.filter(
        (item) => item.cartItemId === this.props.itemId
      )[0],
    });
  }

  componentDidUpdate() {}

  getPriceByCurrency() {
    let priceObj = this.state.item.cartItem.prices.filter(
      (price) => price.currency === this.props.currency
    );
    if (priceObj[0]) {
      let amount = priceObj[0].amount;

      return amount;
    }
  }

  render() {
    const currencySymbols = {
      USD: "$",
      GBP: "­£",
      AUD: "$",
      JPY: "¥",
      RUB: "₽",
    };

    console.log(this.state.prices);
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
                <button className="attribute_option unavailable">XS</button>
                <button className="attribute_option selected">S</button>
                <button className="attribute_option">M</button>
                <button className="attribute_option">L</button>
              </div>
            </div>
            <div className="quantity-image_wrapper">
              <div className="quantity_field">
                <button className="add_item">+</button>
                <p className="quantity">1</p>
                <button className="remove_item">-</button>
              </div>
              <div className="image_container">
                <button className="prev_image">&lt;</button>
                <button className="next_image">&gt;</button>
                <img
                  className="item_image"
                  src="https://images.unsplash.com/photo-1618354691373-d851c5c3a990?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=715&q=80"
                  alt=""
                />
              </div>
            </div>
          </>
        ) : (
          <h3>Item cannot be displayed</h3>
        )}
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
