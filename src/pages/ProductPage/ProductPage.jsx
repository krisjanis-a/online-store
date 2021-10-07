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
      attributes: [],
      images: [],
      mainImage: null,
      cartItem: {
        cartItemId: null, //brand+name+(attribute_displayValue)*nAttributes so it is possible to quickly find item and change quantity in cart
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
    // console.log("Product page did mount");
    this.fetchProductById();
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log("Product page did update");

    // If no selected product present in props (redux store) on component mounting - case where product is accessed from URL
    if (Object.keys(this.state.product).length === 0) {
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

    // Check if product already exists in redux store
    if (
      this.props.products.length !== 0 &&
      this.props.products.filter(
        (item) => item.id === this.props.selectedProduct
      ).length !== 0
    ) {
      let productInfo = this.props.products.filter(
        (item) => item.id === this.props.selectedProduct
      )[0];

      this.setState({ product: productInfo });
      this.setState({ prices: productInfo.prices });
      this.setState({ attributes: productInfo.attributes });
      this.setState({ images: productInfo.gallery });
      this.setState({ mainImage: productInfo.gallery[0] });
    }

    // If does not exist make a query and save product to store
    else {
      makeQuery(productIdQuery).then((results) => {
        if (results.product !== null) {
          let productInfo = results.product;
          this.setState({ product: productInfo });
          this.setState({ prices: productInfo.prices });
          this.setState({ attributes: productInfo.attributes });
          this.setState({ images: productInfo.gallery });
          this.setState({ mainImage: productInfo.gallery[0] });

          this.props.saveProduct(productInfo);
        }
      });
    }
  }

  addDefaultValuesToCartItem() {
    // console.log("adding default values");

    // Create attribute section for cartItemId
    let attributesString = this.state.product.attributes.map((attributeSet) => {
      return `${attributeSet.id}-${attributeSet.items[0].displayValue}`;
    });

    // Create selected attributes array
    let attributes = this.state.product.attributes.map((attributeSet) => {
      let attributeSetId = attributeSet.id;
      let attributeDisplayValue = attributeSet.items[0].displayValue;
      let attributeType = attributeSet.type;
      let attributeValue = attributeSet.items[0].value;
      return {
        name: attributeSetId,
        displayValue: attributeDisplayValue,
        type: attributeType,
        value: attributeValue,
      };
    });

    // Create default cart item
    let defaultCartItem = {
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

  updateAttributes(
    attributeId,
    attributeDisplayValue,
    attributeType,
    attributeValue
  ) {
    // Add new attribute to existing ones
    let newAttributes = this.state.cartItem.selectedAttributes.map(
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
    let newCartItemIdAttributes = newAttributes.map((attribute) => {
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
          // &&
          // this.state.cartItem.selectedAttributes.length !== 0
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
              <img src={this.state.mainImage} alt="" />
            </div>
            <div className="product_info">
              <h2 className="brand_title">{this.state.product.brand}</h2>
              <h2 className="product_title">{this.state.product.name}</h2>

              {/* ATTRIBUTE SETUP */}
              {this.state.attributes.map((attributeSet) => {
                // console.log(attributeSet);
                let attributeName = attributeSet.name;
                let attributeType = attributeSet.type;
                let attributes = attributeSet.items;

                return (
                  <div
                    className="attribute_field"
                    key={attributeName + attributes[0].value}
                  >
                    <h3 className="attribute_name">{attributeName}:</h3>
                    <div className="attribute_choices">
                      {attributeType === "text" && (
                        <>
                          {attributes.map((attribute) => {
                            // Setup for attribute comparison
                            let selectedAttribute;
                            let selectedAttributeName;
                            let selectedAttributeValue;

                            if (
                              this.state.cartItem.selectedAttributes.length !==
                              0
                            ) {
                              selectedAttribute =
                                this.state.cartItem.selectedAttributes.filter(
                                  (attribute) =>
                                    attribute.name === attributeName
                                )[0];

                              selectedAttributeName = selectedAttribute.name;
                              selectedAttributeValue = selectedAttribute.value;
                            }

                            return (
                              // Add selected / unavailable to className to add styling
                              <button
                                className={`attribute_option 
                              
                              ${
                                selectedAttributeName === attributeName &&
                                selectedAttributeValue === attribute.value
                                  ? "selected"
                                  : ""
                              }
                              
                              `}
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
                                {attribute.value}
                              </button>
                            );
                          })}
                        </>
                      )}
                      {attributeType === "swatch" && (
                        <>
                          {attributes.map((attribute) => {
                            // Setup for attribute comparison
                            let selectedAttribute;
                            let selectedAttributeName;
                            let selectedAttributeValue;
                            if (
                              this.state.cartItem.selectedAttributes.length !==
                              0
                            ) {
                              selectedAttribute =
                                this.state.cartItem.selectedAttributes.filter(
                                  (attribute) =>
                                    attribute.name === attributeName
                                )[0];

                              selectedAttributeName = selectedAttribute.name;
                              selectedAttributeValue = selectedAttribute.value;
                            }

                            return (
                              <button
                                className={`attribute_option ${attributeType} ${
                                  selectedAttributeName === attributeName &&
                                  selectedAttributeValue === attribute.value
                                    ? "selected"
                                    : ""
                                }`}
                                style={{
                                  backgroundColor: `${attribute.value}`,
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
                              ></button>
                            );
                          })}
                        </>
                      )}
                    </div>
                  </div>
                );
              })}

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
                // onClick={() => this.handleAddToCart()}
                onClick={() => this.props.addToCart(this.state.cartItem)}
              >
                ADD TO CART
              </button>
              <div className="description_field">
                {parse(this.state.product.description)}
              </div>
            </div>
          </div>
        ) : (
          <h3>Product cannot be displayed</h3>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedProduct: state.selectedProduct,
    products: state.products,
    cartItems: state.cart,
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
