import React, { Component } from "react";
import "./CartItem.css";

export class CartItem extends Component {
  render() {
    return (
      <div className="cart_item">
        <div className="product_info">
          <h2 className="brand_title">Good</h2>
          <h2 className="product_title">Tshirt</h2>
          <h3 className="price">$50.00</h3>
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
      </div>
    );
  }
}

export default CartItem;
