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
    if (Object.keys(this.state.product).length === 0) {
      this.fetchProductById();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log("Product page did update");

    // If no selected product present in props on component mounting
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

  addDefaultValuesToCartItem() {
    // console.log("adding default values");

    // Create attribute section for cartItemId
    let attributesString = this.state.product.attributes.map((attributeSet) => {
      return `${attributeSet.id}-${attributeSet.items[0].displayValue}`;
    });

    // Create selected attributes array
    let attributes = this.state.product.attributes.map((attributeSet) => {
      let attributeSetId = attributeSet.id;
      let attributeValue = attributeSet.items[0].displayValue;
      let attributeType = attributeSet.type;
      return { [attributeSetId]: attributeValue, type: attributeType };
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

  updateAttributes(attributeId, attributeValue, attributeType) {
    // console.log(`Attribute Id: ${attributeId} and value ${attributeValue}`);

    // Add new attribute to existing ones
    let newAttributes = this.state.cartItem.selectedAttributes.map(
      (attribute) => {
        if (attribute.hasOwnProperty(attributeId)) {
          return { [attributeId]: attributeValue, type: attributeType };
        } else {
          return attribute;
        }
      }
    );

    // Create new attribute string section for cartItemId
    let newCartItemIdAttributes = newAttributes.map((attribute) => {
      return `${Object.entries(attribute)[0][0]}-${
        Object.entries(attribute)[0][1]
      }`;
    });

    // console.log(this.state.cartItem.cartItemId);
    // console.log(
    //   `${this.state.cartItem.brand} ${this.state.cartItem.name} ${newCartItemIdAttributes}`
    // );

    this.setState((prevState) => ({
      cartItem: {
        ...prevState.cartItem,
        cartItemId: `${this.state.cartItem.brand} ${this.state.cartItem.name} ${newCartItemIdAttributes}`,
        selectedAttributes: newAttributes,
      },
    }));
  }

  // handleAddToCart(e) {
  //   console.log("Adding to cart");
  // }

  render() {
    const currencySymbols = {
      USD: "$",
      GBP: "­£",
      AUD: "$",
      JPY: "¥",
      RUB: "₽",
    };

    // console.log(this.state.attributes);

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

              {/* ATTRIBUTE SETUP */}
              {this.state.attributes.map((attributeSet) => {
                // console.log(attributeSet);
                let attributeName = attributeSet.name;
                let attributeType = attributeSet.type;
                let attributes = attributeSet.items;

                return (
                  <div className="attribute_field" key={attributeName}>
                    <h3 className="attribute_name">{attributeName}:</h3>
                    <div className="attribute_choices">
                      {attributeType === "text" && (
                        <>
                          {attributes.map((attribute) => {
                            // Setup for attribute comparison

                            let selectedAttribute =
                              this.state.cartItem.selectedAttributes.filter(
                                (attribute) =>
                                  attribute.hasOwnProperty(attributeName)
                              )[0];

                            let selectedAttributeName =
                              Object.entries(selectedAttribute)[0][0];
                            let selectedAttributeValue =
                              Object.entries(selectedAttribute)[0][1];

                            return (
                              // Add selected / unavailable to className to add styling
                              <button
                                className={`attribute_option 
                              
                              ${
                                selectedAttributeName === attributeName &&
                                selectedAttributeValue ===
                                  attribute.displayValue
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
                                    attributeType
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

                            let selectedAttribute =
                              this.state.cartItem.selectedAttributes.filter(
                                (attribute) =>
                                  attribute.hasOwnProperty(attributeName)
                              )[0];

                            let selectedAttributeName =
                              Object.entries(selectedAttribute)[0][0];
                            let selectedAttributeValue =
                              Object.entries(selectedAttribute)[0][1];

                            // Could create in scss & add selected / unavailable to className to add styling if necessary
                            return (
                              <button
                                className={`attribute_option ${attributeType} ${
                                  selectedAttributeName === attributeName &&
                                  selectedAttributeValue ===
                                    attribute.displayValue
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
                                    attributeType
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
    addToCart: (cartItem) => {
      dispatch({
        type: "ADD_PRODUCT",
        payload: cartItem,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
