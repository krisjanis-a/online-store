import React, { Component } from "react";
import { connect } from "react-redux";
import makeQuery from "../../apolloClient";
import "./ProductPage.css";
import parse from "html-react-parser";

export class ProductPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      product: {},
      prices: [],
      attributes: {},
      images: [],
      mainImage: null,
    };
  }

  componentDidMount() {
    console.log("Product page did mount");
    if (Object.keys(this.state.product).length === 0) {
      this.fetchProductById();
    }
    // console.log(this.props);
    // console.log(this.state.product);
  }

  componentDidUpdate() {
    console.log("Product page did update");
    if (Object.keys(this.state.product).length === 0) {
      this.fetchProductById();
    }
    // console.log(this.props);
    console.log(this.state.product);
    this.getSelectedProductFromURL();
  }

  componentWillUnmount() {
    // console.log("Product page will unmount");
    this.props.selectProduct(null);
  }
  fetchProductById() {
    const productIdQuery = `query {
      product(id: "${this.props.selectedProduct}") {
        id
        name
        inStock
        gallery
        description
        category
        attributes {
          id
          name
          type
          items {
            displayValue
            value
            id
          }
        }
        prices {
          currency
          amount
        }
        brand
      }
    }`;
    makeQuery(productIdQuery).then((results) => {
      if (results.product !== null) {
        let productInfo = results.product;
        this.setState({ product: productInfo });
        this.setState({ prices: productInfo.prices });
        this.setState({ attributes: productInfo.attributes });
        this.setState({ images: productInfo.gallery });
        this.setState({ mainImage: productInfo.gallery[0] });
      }
    });
  }

  //? This is for development, but maybe can leave for "production" if user wants to navigate to specific product through URL => outside of intended app flow
  getSelectedProductFromURL() {
    if (this.props.selectedProduct === null) {
      let currentURL = window.location.href;
      let phrase = /\/product:(.+)/;
      let match = phrase.exec(currentURL)[1];
      this.props.selectProduct(match);
      // console.log("Selected product from URL");
    }
  }

  getPriceByCurrency() {
    let priceObj = this.state.prices.filter(
      (price) => price.currency === this.props.currency
    );
    if (priceObj[0]) {
      let amount = priceObj[0].amount;
      return amount;
    }
  }

  setMainImage(newImageURL) {
    this.setState({
      mainImage: newImageURL,
    });
  }

  render() {
    const currencySymbols = {
      USD: "$",
      GBP: "­£",
      AUD: "$",
      JPY: "¥",
      RUB: "₽",
    };

    return (
      <>
        {Object.keys(this.state.product).length !== 0 ? (
          <div className="product_page">
            <div className="image_choices">
              {this.state.images.map((imgURL) => (
                <div className="image_option" key={imgURL}>
                  <img
                    src={imgURL}
                    alt=""
                    onClick={() => this.setMainImage(imgURL)}
                  />
                </div>
              ))}
            </div>

            <div className="main_image">
              <img
                src={this.state.mainImage}
                alt=""
                // alt={`${this.state.product.name} ${this.state.gallery.indexOf(
                //   this.state.mainImage
                // )}`}
              />
            </div>
            <div className="product_info">
              <h2 className="brand_title">{this.state.product.brand}</h2>
              <h2 className="product_title">{this.state.product.name}</h2>
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
                <h3 className="price">
                  {currencySymbols[this.props.currency] +
                    " " +
                    this.getPriceByCurrency()}
                </h3>
              </div>
              <button
                className="add_to_cart"
                disabled={!this.state.product.inStock}
              >
                ADD TO CART
              </button>
              <div className="description_field">
                {parse(this.state.product.description)}
              </div>
            </div>
          </div>
        ) : (
          <h3>Product loading...</h3>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedProduct: state.selectedProduct,
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
