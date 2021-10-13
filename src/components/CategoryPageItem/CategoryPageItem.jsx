import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./CategoryPageItem.css";
import noImage from "../../assets/no_image_placeholder.jpg";
import currencySymbols from "../../utils/currencySymbols";
import parse from "html-react-parser";
import fetchProductById from "./fetchProductById";
import { cartIconGreen } from "../../utils/iconSVGs";
import getPriceByCurrency from "../../utils/getPriceByCurrency";

import { selectProduct } from "../../store/actions/selectProductActions";

export class CategoryPageItem extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      product: {},
      prices: [],
    };

    this.getPriceByCurrency = getPriceByCurrency.bind(this);
    this.fetchProductById = fetchProductById.bind(this);
  }

  componentDidMount() {
    this.fetchProductById();
  }

  componentDidUpdate() {
    this.fetchProductById();
  }

  render() {
    const { product } = this.state;
    const { selectProduct } = this.props;

    return (
      <>
        {Object.keys(product).length !== 0 ? (
          <Link
            to={`/product:${product.id}`}
            onClick={() => {
              selectProduct(product.id);
            }}

            /* 
              ? If needed to disallow access to product page of out-of-stock product => should change cursor in scss file too then
              to={
                product.inStock
                  ? `/product:${product.id}`
                  : "/"
              }
              onClick={() => {
                product.inStock &&
                  selectProduct(product.id);
              }} 
            */
          >
            <div
              className={`category_page_item ${
                !product.inStock ? "out-of-stock" : ""
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
    const { gallery } = this.state.product;

    return (
      <div className="image_field">
        <span>OUT OF STOCK</span>
        <img
          className="item_image"
          src={gallery ? gallery[0] : { noImage }}
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
    const {
      prices,
      product: { brand, name },
    } = this.state;
    const { currency } = this.props;

    return (
      <div className="text">
        <p className="item_name">{brand + " " + name}</p>
        <p className="item_price">
          {currencySymbols[currency] + " " + this.getPriceByCurrency(prices)}
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
