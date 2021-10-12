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
    return (
      <>
        {Object.keys(this.props.product).length !== 0 ? (
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
        {this.props.images.map((imgURL) => (
          <div className="image_option" key={imgURL}>
            <img
              src={imgURL}
              alt=""
              onClick={() => this.props.setMainImage(imgURL)}
            />
          </div>
        ))}
      </div>
    );
  }

  renderMainImage() {
    return (
      <div className="main_image">
        <img src={this.props.mainImage} alt="" />
      </div>
    );
  }

  renderText() {
    return (
      <div className="text">
        <h2 className="brand_title">{this.props.product.brand}</h2>
        <h2 className="product_title">{this.props.product.name}</h2>
      </div>
    );
  }

  renderAttributesField() {
    return this.props.attributes.map((attributeSet) => {
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

          if (this.props.cartItem.selectedAttributes.length !== 0) {
            selectedAttribute = this.props.cartItem.selectedAttributes.filter(
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
                this.props.updateAttributes(
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
            this.getPriceByCurrency(this.props.prices)}
        </h3>
      </div>
    );
  }

  renderButton() {
    return (
      <button
        className="add_to_cart"
        disabled={!this.props.product.inStock}
        onClick={() => this.props.addToCart(this.props.cartItem)}
      >
        ADD TO CART
      </button>
    );
  }

  renderDescription() {
    return (
      <div className="description_field">
        {parse(this.props.product.description)}
      </div>
    );
  }
}

export default ProductPage;
