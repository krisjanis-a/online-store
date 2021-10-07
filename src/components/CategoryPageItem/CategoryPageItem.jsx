import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./CategoryPageItem.css";
import makeQuery from "../../apolloClient";
import noImage from "../../assets/no_image_placeholder.jpg";

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
        let productInfo = results.product;
        this.setState({ product: productInfo });
        this.setState({ prices: productInfo.prices });
      }
    });
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
                  <svg
                    width="74"
                    height="74"
                    viewBox="0 0 74 74"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g filter="url(#filter0_d)">
                      <circle cx="37" cy="35" r="26" fill="#5ECE7B" />
                      <path
                        d="M48.4736 26.8484C48.0186 26.2925 47.3109 25.9546 46.5785 25.9546H31.1907L30.711 24.1669C30.4326 23.1277 29.4732 22.4028 28.3608 22.4028H25.7837C25.3544 22.4028 25 22.7407 25 23.1523C25 23.5628 25.3534 23.9017 25.7837 23.9017H28.3608C28.7398 23.9017 29.0685 24.1433 29.1692 24.5058L32.2517 36.2494C32.53 37.2886 33.4894 38.0135 34.6018 38.0135H44.6833C45.7947 38.0135 46.7808 37.2886 47.0335 36.2494L48.9286 28.807C49.1053 28.1293 48.9543 27.4044 48.4736 26.8485L48.4736 26.8484ZM47.3879 28.4671L45.4928 35.9095C45.3921 36.272 45.0634 36.5136 44.6844 36.5136H34.6018C34.2228 36.5136 33.8941 36.272 33.7935 35.9095L31.5953 27.4772H46.5796C46.8323 27.4772 47.085 27.598 47.237 27.7915C47.388 27.984 47.463 28.2257 47.388 28.4673L47.3879 28.4671Z"
                        fill="white"
                      />
                      <path
                        d="M35.1332 38.9778C33.6932 38.9778 32.5059 40.1132 32.5059 41.4902C32.5059 42.8672 33.6933 44.0027 35.1332 44.0027C36.5733 44.0036 37.7606 42.8682 37.7606 41.491C37.7606 40.1137 36.5732 38.9775 35.1332 38.9775V38.9778ZM35.1332 42.4814C34.5519 42.4814 34.0968 42.0463 34.0968 41.4903C34.0968 40.9344 34.5519 40.4993 35.1332 40.4993C35.7146 40.4993 36.1696 40.9344 36.1696 41.4903C36.1687 42.0227 35.689 42.4814 35.1332 42.4814Z"
                        fill="white"
                      />
                      <path
                        d="M43.8251 38.978C42.3851 38.978 41.1978 40.1135 41.1978 41.4905C41.1978 42.8675 42.3852 44.0029 43.8251 44.0029C45.2651 44.0029 46.4525 42.8675 46.4525 41.4905C46.4279 40.1143 45.2651 38.978 43.8251 38.978ZM43.8251 42.4816C43.2438 42.4816 42.7887 42.0465 42.7887 41.4906C42.7887 40.9346 43.2438 40.4995 43.8251 40.4995C44.4065 40.4995 44.8615 40.9346 44.8615 41.4906C44.8615 42.0229 44.3809 42.4816 43.8251 42.4816Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <filter
                        id="filter0_d"
                        x="0"
                        y="0"
                        width="74"
                        height="74"
                        filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB"
                      >
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feColorMatrix
                          in="SourceAlpha"
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                          result="hardAlpha"
                        />
                        <feOffset dy="4" />
                        <feGaussianBlur stdDeviation="5.5" />
                        <feColorMatrix
                          type="matrix"
                          values="0 0 0 0 0.113725 0 0 0 0 0.121569 0 0 0 0 0.133333 0 0 0 0.1 0"
                        />
                        <feBlend
                          mode="normal"
                          in2="BackgroundImageFix"
                          result="effect1_dropShadow"
                        />
                        <feBlend
                          mode="normal"
                          in="SourceGraphic"
                          in2="effect1_dropShadow"
                          result="shape"
                        />
                      </filter>
                    </defs>
                  </svg>
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
