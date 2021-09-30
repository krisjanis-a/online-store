import React, { Component } from "react";
import "./ProductPage.css";

export class ProductPage extends Component {
  render() {
    return (
      <div className="product_page">
        <div className="image_choices">
          <div className="image_option">
            <img
              src="https://images.unsplash.com/photo-1618354691373-d851c5c3a990?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=715&q=80"
              alt=""
            />
          </div>
          <div className="image_option">
            <img
              src="https://images.unsplash.com/photo-1618354691373-d851c5c3a990?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=715&q=80"
              alt=""
            />
          </div>
          <div className="image_option">
            <img
              src="https://images.unsplash.com/photo-1618354691373-d851c5c3a990?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=715&q=80"
              alt=""
            />
          </div>
        </div>
        <div className="main_image">
          <img
            src="https://images.unsplash.com/photo-1618354691373-d851c5c3a990?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=715&q=80"
            alt=""
          />
        </div>
        <div className="product_info">
          <h2 className="brand_title">Good</h2>
          <h2 className="product_title">Tshirt</h2>
          <div className="attribute_field">
            <h3 className="attribute_name">SIZE:</h3>
            <div className="attribute_choices">
              <button className="attribute_option unavailable">XS</button>
              <button className="attribute_option selected">S</button>
              <button className="attribute_option">M</button>
              <button className="attribute_option">L</button>
            </div>
          </div>
          <div className="price_field">
            <h3 className="title">PRICE:</h3>
            <h3 className="price">$50.00</h3>
          </div>
          <button className="add_to_cart">ADD TO CART</button>
          <div className="description_field">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Et,
              nihil, repudiandae quod veritatis beatae in expedita atque aut
              porro odio repellat soluta consequuntur inventore, eum libero
              explicabo quo minus ab aliquam corporis.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductPage;
