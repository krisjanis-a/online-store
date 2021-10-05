import React, { Component } from "react";
import "./CartOverlayItem.css";
import { connect } from "react-redux";

export class CartOverlayItem extends Component {
  render() {
    return (
      <div className="cart_overlay_item">
        <div className="info">
          <div className="brand_and_name">
            <h3 className="item_brand">Good</h3>
            <p className="item_name">Tshirt</p>
          </div>
          <p className="item_price">$50.00</p>
          <div className="type_buttons">
            <button>S</button>
            <button className="unavailable">M</button>
          </div>
        </div>
        <div className="quantity-image_wrapper">
          <div className="quantity_field">
            <button className="add_item">+</button>
            <p className="quantity">1</p>
            <button className="remove_item">-</button>
          </div>
          <img
            className="item_image"
            src="https://images.unsplash.com/photo-1618354691373-d851c5c3a990?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=715&q=80"
            alt=""
          />
        </div>
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
    selectProduct: (productId) => {
      dispatch({
        type: "SELECT_PRODUCT",
        payload: productId,
      });
    },
    addToCart: (cartItem) => {
      dispatch({
        type: "ADD_PRODUCT",
        payload: cartItem,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartOverlayItem);
