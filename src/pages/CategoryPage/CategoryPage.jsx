import React, { Component } from "react";
import "./CategoryPage.css";
import Item from "../../components/CategoryPageItem/CategoryPageItem";

export class CategoryPage extends Component {
  render() {
    return (
      <div className="category_page">
        <h1 className="category_title">Clothes</h1>
        <div className="items">
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
        </div>
      </div>
    );
  }
}

export default CategoryPage;
