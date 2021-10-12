import React, { PureComponent } from "react";
import parse from "html-react-parser";
import currencySymbols from "../../utils/currencySymbols";
import "./ProductPage.css";
import getPriceByCurrency from "../../utils/getPriceByCurrency";

export class ProductPage extends PureComponent {
  constructor(props) {
    super(props);

    this.getPriceByCurrency = getPriceByCurrency.bind(this);
  }

  render() {
    const { product } = this.props;

    return (
      <>
        {Object.keys(product).length !== 0 ? (
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
    const { images, setMainImage } = this.props;

    return (
      <div className="image_choices">
        {images.map((imgURL) => (
          <div className="image_option" key={imgURL}>
            <img src={imgURL} alt="" onClick={() => setMainImage(imgURL)} />
          </div>
        ))}
      </div>
    );
  }

  renderMainImage() {
    const { mainImage } = this.props;

    return (
      <div className="main_image">
        <img src={mainImage} alt="" />
      </div>
    );
  }

  renderText() {
    const { brand, name } = this.props.product;

    return (
      <div className="text">
        <h2 className="brand_title">{brand}</h2>
        <h2 className="product_title">{name}</h2>
      </div>
    );
  }

  renderAttributesField() {
    const { attributes } = this.props;

    return attributes.map((attributeSet) => {
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
    const {
      cartItem: { selectedAttributes },
      updateAttributes,
    } = this.props;

    return (
      <div className="attribute_choices">
        {attributes.map((attribute) => {
          // Setup for attribute comparison
          let selectedAttribute;
          let selectedAttributeName;
          let selectedAttributeValue;

          if (selectedAttributes.length !== 0) {
            selectedAttribute = selectedAttributes.filter(
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
                updateAttributes(
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
    const { currency, prices } = this.props;

    return (
      <div className="price_field">
        <h3 className="title">PRICE:</h3>
        <h3 className="price">
          {currencySymbols[currency] + " " + this.getPriceByCurrency(prices)}
        </h3>
      </div>
    );
  }

  renderButton() {
    const { addToCart, cartItem, product } = this.props;

    return (
      <button
        className="add_to_cart"
        disabled={!product.inStock}
        onClick={() => addToCart(cartItem)}
      >
        ADD TO CART
      </button>
    );
  }

  renderDescription() {
    const { description } = this.props.product;

    return <div className="description_field">{parse(description)}</div>;
  }
}

export default ProductPage;
