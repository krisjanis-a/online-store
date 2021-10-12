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

    this.fetchProductsByCategory = fetchProductsByCategory.bind(this);
  }

  componentDidMount() {
    this.fetchProductsByCategory();
  }

  componentDidUpdate(prevProps) {
    const { category } = this.props;

    if (category !== prevProps.category) {
      this.fetchProductsByCategory();
    }
  }

  render() {
    const { category } = this.props;

    return (
      <div className="category_page">
        <h1 className="category_title">{category}</h1>
        {this.renderProductCards()}
      </div>
    );
  }

  renderProductCards() {
    const { productsId } = this.state;

    return (
      <div className="items">
        {productsId.length !== 0 ? (
          productsId.map((productId) => this.renderProductCard(productId))
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
    categories: state.categories,
  };
};

export default connect(mapStateToProps)(CategoryPage);
