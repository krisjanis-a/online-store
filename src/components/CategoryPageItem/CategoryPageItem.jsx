import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./CategoryPageItem.css";
import noImage from "../../assets/no_image_placeholder.jpg";
import currencySymbols from "../../utils/currencySymbols";
import parse from "html-react-parser";
import { cartIconGreen } from "../../utils/iconSVGs";
import fetchProductById from "./fetchProductById";

import { selectProduct } from "../../store/actions/selectProductActions";

export class CategoryPageItem extends PureComponent {
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
      this.fetchProductById = fetchProductById.bind(this);
      this.fetchProductById();
    }
  }

  componentDidUpdate() {
    if (Object.keys(this.state.product).length === 0) {
      this.fetchProductById = fetchProductById.bind(this);
      this.fetchProductById();
    }
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

            /* 
              ? If needed to disallow access to product page of out-of-stock product => should change cursor in scss file too then
              to={
                this.state.product.inStock
                  ? `/product:${this.state.product.id}`
                  : "/"
              }
              onClick={() => {
                this.state.product.inStock &&
                  this.props.selectProduct(this.state.product.id);
              }} 
            */
          >
            <div
              className={`category_page_item ${
                !this.state.product.inStock ? "out-of-stock" : ""
              }`}
            >
              {this.renderImage()}
              {this.renderIcon()}
              {this.renderText()}
            </div>
          </Link>
        ) : (
          <h3 style={{ margin: "2rem" }}>Product loading...</h3>
        )}
      </>
    );
  }

  renderImage() {
    return (
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
    );
  }

  renderIcon() {
    return (
      <div className="cart_icon_container">
        <div className="icon">{parse(cartIconGreen)}</div>
      </div>
    );
  }

  renderText() {
    return (
      <div className="text">
        <p className="item_name">
          {this.state.product.brand + " " + this.state.product.name}
        </p>
        <p className="item_price">
          {currencySymbols[this.props.currency] +
            " " +
            this.getPriceByCurrency()}
        </p>
      </div>
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
      dispatch(selectProduct(productId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPageItem);
