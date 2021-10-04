import React, { Component } from "react";
import { connect } from "react-redux";
import "./CategoryPage.css";
import Item from "../../components/CategoryPageItem/CategoryPageItem";
import makeQuery from "../../apolloClient";

export class CategoryPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      productsId: [],
    };
  }

  componentDidMount() {
    // console.log("Category Page component did mount");
    this.fetchProductsById();
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log("Category Page component did update");

    if (this.state.productsId.length === 0) {
      this.fetchProductsById();
    }
    if (this.props.category !== prevProps.category) {
      this.fetchProductsById();
    }
  }

  // Fetch products from category
  fetchProductsById() {
    const productsIdQuery = `query {
      category(input:{title:"${this.props.category}"}){
        name 
         products {
          id 
        }
      }
    }`;
    makeQuery(productsIdQuery).then((results) => {
      if (results.category !== null) {
        let categoryProducts = results.category.products.map(
          (product) => product.id
        );
        // console.log(categoryProducts);
        this.setState({ productsId: categoryProducts });
      }
    });
  }

  render() {
    return (
      <div className="category_page">
        <h1 className="category_title">{this.props.category}</h1>
        <div className="items">
          {this.state.productsId.length !== 0 ? (
            this.state.productsId.map((productId) => {
              return (
                <>
                  <Item key={productId} productId={productId} />
                </>
              );
            })
          ) : (
            <h1>No products to display</h1>
          )}
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
    setCategory: (category) => {
      dispatch({
        type: "SET_CATEGORY",
        payload: category,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPage);
