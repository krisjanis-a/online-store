import React, { PureComponent } from "react";
import { connect } from "react-redux";
import "./CategoryPage.css";
import Item from "../../components/CategoryPageItem/CategoryPageItem";
import fetchProductsByCategory from "./fetchProductsByCategory";

export class CategoryPage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      productsId: [],
    };
  }

  componentDidMount() {
    this.fetchProductsByCategory = fetchProductsByCategory.bind(this);
    this.fetchProductsByCategory();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.category !== prevProps.category) {
      this.fetchProductsByCategory = fetchProductsByCategory.bind(this);
      this.fetchProductsByCategory();
    }
  }

  render() {
    return (
      <div className="category_page">
        <h1 className="category_title">{this.props.category}</h1>
        {this.renderProductCards()}
      </div>
    );
  }

  renderProductCards() {
    return (
      <div className="items">
        {this.state.productsId.length !== 0 ? (
          this.state.productsId.map((productId) =>
            this.renderProductCard(productId)
          )
        ) : (
          <h1>No products to display</h1>
        )}
      </div>
    );
  }

  renderProductCard(productId) {
    return <Item key={productId} productId={productId} />;
  }
}

const mapStateToProps = (state) => {
  return {
    category: state.category,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCategory: (category) => {
      dispatch({
        type: "SET_CATEGORY",
        payload: category,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPage);
