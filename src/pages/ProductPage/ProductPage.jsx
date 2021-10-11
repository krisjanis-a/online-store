import React, { PureComponent } from "react";
import { connect } from "react-redux";
import "./ProductPage.css";
import parse from "html-react-parser";
import currencySymbols from "../../utils/currencySymbols";
import fetchProductById from "./fetchProductById";

export class ProductPage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      product: {},
      prices: [],
      attributes: [],
      images: [],
      mainImage: null,
      cartItem: {
        cartItemId: null, //brand+name+(attribute_displayValue) * nAttributes so it is possible to quickly find item and change quantity in cart
        productId: null, //for quick navigation (from cart or cart overlay) later if needed
        brand: null,
        name: null,
        selectedAttributes: [],
        gallery: [],
        prices: [],
      },
    };
  }

  componentDidMount() {
    this.fetchProductById = fetchProductById.bind(this);
    this.fetchProductById();
  }

  componentDidUpdate(prevProps, prevState) {
    // If no selected product present in props (redux store) on component mounting - case where product is accessed from URL
    if (Object.keys(this.state.product).length === 0) {
      this.fetchProductById = fetchProductById.bind(this);
      this.fetchProductById();
    }

    if (
      Object.keys(this.state.product).length !== 0 &&
      prevState.cartItem.productId === null
    ) {
      // Add default values of selected product to cartItem when product page loaded
      this.addDefaultValuesToCartItem();
    }

    this.getSelectedProductFromURL();
  }

  componentWillUnmount() {
    this.props.selectProduct(null);
  }

  addDefaultValuesToCartItem() {
    // Create attribute section string for cartItemId
    const attributesString = this.state.product.attributes.map(
      (attributeSet) => {
        return `${attributeSet.id}-${attributeSet.items[0].displayValue}`;
      }
    );

    // Create selected attributes array
    const attributes = this.state.product.attributes.map((attributeSet) => {
      const attributeSetId = attributeSet.id;
      const attributeDisplayValue = attributeSet.items[0].displayValue;
      const attributeType = attributeSet.type;
      const attributeValue = attributeSet.items[0].value;
      return {
        name: attributeSetId,
        displayValue: attributeDisplayValue,
        type: attributeType,
        value: attributeValue,
      };
    });

    // Create default cart item
    const defaultCartItem = {
      cartItemId: `${this.state.product.brand} ${this.state.product.name} ${attributesString}`,
      productId: this.state.product.id,
      brand: this.state.product.brand,
      name: this.state.product.name,
      selectedAttributes: attributes,
      gallery: this.state.product.gallery,
      prices: this.state.product.prices,
    };

    this.setState({
      cartItem: defaultCartItem,
    });
  }

  //? This is for development, but maybe can leave for "production" if user wants to navigate to specific product through URL (though it's outside of intended app flow)
  getSelectedProductFromURL() {
    if (this.props.selectedProduct === null) {
      const currentURL = window.location.href;
      const phrase = /\/product:(.+)/;
      const match = phrase.exec(currentURL)[1];
      this.props.selectProduct(match);
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

  setMainImage(newImageURL) {
    this.setState({
      mainImage: newImageURL,
    });
  }

  updateAttributes(
    attributeId,
    attributeDisplayValue,
    attributeType,
    attributeValue
  ) {
    // Add new attribute to existing ones
    const newAttributes = this.state.cartItem.selectedAttributes.map(
      (attribute) => {
        if (attribute.name === attributeId) {
          return {
            name: attributeId,
            displayValue: attributeDisplayValue,
            type: attributeType,
            value: attributeValue,
          };
        } else {
          return attribute;
        }
      }
    );

    // Create new attribute string section for cartItemId
    const newCartItemIdAttributes = newAttributes.map((attribute) => {
      return `${attribute.name}-${attribute.displayValue}`;
    });

    this.setState((prevState) => ({
      cartItem: {
        ...prevState.cartItem,
        cartItemId: `${this.state.cartItem.brand} ${this.state.cartItem.name} ${newCartItemIdAttributes}`,
        selectedAttributes: newAttributes,
      },
    }));
  }

  render() {
    return (
      <>
        {Object.keys(this.state.product).length !== 0 ? (
          <div className="product_page">
            {this.renderImageOptions()}
            {this.renderMainImage()}

            <div className="product_info">
              {this.renderText()}
              {this.renderAttributesField()}
              {this.renderPriceField()}
              {this.renderButton()}
              {this.renderDescription()}
            </div>
          </div>
        ) : (
          <h3 style={{ margin: "2rem" }}>Product cannot be displayed</h3>
        )}
      </>
    );
  }

  renderImageOptions() {
    return (
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
    );
  }

  renderMainImage() {
    return (
      <div className="main_image">
        <img src={this.state.mainImage} alt="" />
      </div>
    );
  }

  renderText() {
    return (
      <div className="text">
        <h2 className="brand_title">{this.state.product.brand}</h2>
        <h2 className="product_title">{this.state.product.name}</h2>
      </div>
    );
  }

  renderAttributesField() {
    return this.state.attributes.map((attributeSet) => {
      const attributeName = attributeSet.name;
      const attributeType = attributeSet.type;
      const attributes = attributeSet.items;

      return (
        <div
          className="attribute_field"
          key={attributeName + attributes[0].value}
        >
          <h3 className="attribute_name">{attributeName}:</h3>
          {this.renderAttributes(attributeName, attributeType, attributes)}
        </div>
      );
    });
  }

  renderAttributes(attributeName, attributeType, attributes) {
    return (
      <div className="attribute_choices">
        {attributes.map((attribute) => {
          // Setup for attribute comparison
          let selectedAttribute;
          let selectedAttributeName;
          let selectedAttributeValue;

          if (this.state.cartItem.selectedAttributes.length !== 0) {
            selectedAttribute = this.state.cartItem.selectedAttributes.filter(
              (attribute) => attribute.name === attributeName
            )[0];

            selectedAttributeName = selectedAttribute.name;
            selectedAttributeValue = selectedAttribute.value;
          }

          return (
            // Add selected / unavailable to className to add styling
            <button
              className={`attribute_option 
                    ${attributeType === "swatch" ? "swatch" : ""}
                    ${
                      selectedAttributeName === attributeName &&
                      selectedAttributeValue === attribute.value
                        ? "selected"
                        : ""
                    }
                  `}
              style={{
                backgroundColor: `${
                  attributeType === "swatch" && attribute.value
                }`,
              }}
              title={attribute.displayValue}
              key={attribute.id}
              onClick={() =>
                this.updateAttributes(
                  attributeName,
                  attribute.displayValue,
                  attributeType,
                  attribute.value
                )
              }
            >
              {attributeType === "text" && attribute.value}
            </button>
          );
        })}
      </div>
    );
  }

  renderPriceField() {
    return (
      <div className="price_field">
        <h3 className="title">PRICE:</h3>
        <h3 className="price">
          {currencySymbols[this.props.currency] +
            " " +
            this.getPriceByCurrency()}
        </h3>
      </div>
    );
  }

  renderButton() {
    return (
      <button
        className="add_to_cart"
        disabled={!this.state.product.inStock}
        onClick={() => this.props.addToCart(this.state.cartItem)}
      >
        ADD TO CART
      </button>
    );
  }

  renderDescription() {
    return (
      <div className="description_field">
        {parse(this.state.product.description)}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedProduct: state.selectedProduct,
    products: state.products,
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
    saveProduct: (product) => {
      dispatch({
        type: "SAVE_PRODUCT",
        payload: product,
      });
    },
    addToCart: (cartItem) => {
      dispatch({
        type: "ADD_PRODUCT",
        payload: cartItem,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
