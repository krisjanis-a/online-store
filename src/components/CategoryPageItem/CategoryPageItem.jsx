import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./CategoryPageItem.css";
import makeQuery from "../../apolloClient";
import noImage from "../../assets/no_image_placeholder.jpg";
import currencySymbols from "../../currencySymbols";
import parse from "html-react-parser";
import { cartIconGreen } from "../../iconSVGs";

export class CategoryPageItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      product: {},
      prices: [],
    };

    this.getPriceByCurrency = this.getPriceByCurrency.bind(this);
  }

  componentDidMount() {
    if (Object.keys(this.state.product).length === 0) {
      this.fetchProductById();
    }
  }

  componentDidUpdate() {
    if (Object.keys(this.state.product).length === 0) {
      this.fetchProductById();
    }
  }

  fetchProductById() {
    const productIdQuery = `query {
      product(id: "${this.props.productId}") {
        id
        name
        inStock
        gallery
        prices {
          currency
          amount
        }
        brand
      }
    }`;
    makeQuery(productIdQuery).then((results) => {
      if (results.product !== null) {
        const productInfo = results.product;
        this.setState({ product: productInfo });
        this.setState({ prices: productInfo.prices });
      }
    });
  }

  getPriceByCurrency() {
    const priceObj = this.state.prices.filter(
      (price) => price.currency === this.props.currency
    );
    if (priceObj[0]) {
      const amount = priceObj[0].amount;
      return amount;
    }
  }

  render() {
    return (
      <>
        {Object.keys(this.state.product).length !== 0 ? (
          <Link
            to={`/product:${this.state.product.id}`}
            onClick={() => {
              this.props.selectProduct(this.state.product.id);
            }}

            //? If needed to disallow access to product page of out-of-stock product => should change cursor in scss file too then
            // to={
            //   this.state.product.inStock
            //     ? `/product:${this.state.product.id}`
            //     : "/"
            // }
            // onClick={() => {
            //   this.state.product.inStock &&
            //     this.props.selectProduct(this.state.product.id);
            // }}
          >
            <div
              // add out-of-stock to category_page_item className to enable styling for out of stock products
              className={`category_page_item ${
                !this.state.product.inStock ? "out-of-stock" : ""
              }`}
            >
              <div className="image_field">
                <span>OUT OF STOCK</span>
                <img
                  className="item_image"
                  src={
                    this.state.product.gallery
                      ? this.state.product.gallery[0]
                      : { noImage }
                  }
                  alt=""
                />
              </div>
              <div className="add-to-cart_button_container">
                <div className="button">
                  {/* SHOPPING CART ICON */}
                  {parse(cartIconGreen)}
                </div>
              </div>
              <p className="item_name">
                {this.state.product.brand + " " + this.state.product.name}
              </p>
              <p className="item_price">
                {currencySymbols[this.props.currency] +
                  " " +
                  this.getPriceByCurrency()}
              </p>
            </div>
          </Link>
        ) : (
          <h3 style={{ margin: "2rem" }}>Product loading...</h3>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currency: state.currency,
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

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPageItem);
