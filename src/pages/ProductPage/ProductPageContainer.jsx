import React, { PureComponent } from "react";
import { connect } from "react-redux";
import ProductPage from "./ProductPageComponent";

import fetchProductById from "./fetchProductById";

import { addProduct } from "../../store/actions/cartActions";
import { selectProduct } from "../../store/actions/selectProductActions";
import { saveProduct } from "../../store/actions/productsActions";

export class ProductPageContainer extends PureComponent {
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
        pricesItem: [],
      },
    };
  }

  componentDidMount() {
    this.fetchProductById = fetchProductById.bind(this);
    this.fetchProductById();
  }

  componentDidUpdate(prevProps, prevState) {
    const { product } = this.state;
    const { productId } = prevState.cartItem;

    // If no selected product present in props (redux store) on component mounting - case where product is accessed from URL
    if (Object.keys(product).length === 0) {
      this.fetchProductById = fetchProductById.bind(this);
      this.fetchProductById();
    }

    if (Object.keys(product).length !== 0 && productId === null) {
      // Add default values of selected product to cartItem when product page loaded
      this.addDefaultValuesToCartItem();
    }

    this.getSelectedProductFromURL();
  }

  componentWillUnmount() {
    this.props.selectProduct(null);
  }

  addDefaultValuesToCartItem() {
    const { attributes, name, id, brand, gallery, prices } = this.state.product;

    // Create attribute section string for cartItemId
    const attributesString = attributes.map((attributeSet) => {
      return `${attributeSet.id}-${attributeSet.items[0].displayValue}`;
    });

    // Create selected attributes array
    const newAttributes = attributes.map((attributeSet) => {
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
      cartItemId: `${brand} ${name} ${attributesString}`,
      productId: id,
      brand: brand,
      name: name,
      selectedAttributes: newAttributes,
      gallery: gallery,
      prices: prices,
    };

    this.setState({
      cartItem: defaultCartItem,
    });
  }

  //? This is for development, but maybe can leave for "production" if user wants to navigate to specific product through URL (though it's outside of intended app flow)
  getSelectedProductFromURL() {
    const { selectedProduct, selectProduct } = this.props;

    if (selectedProduct === null) {
      const currentURL = window.location.href;
      const phrase = /\/product:(.+)/;
      const match = phrase.exec(currentURL)[1];
      selectProduct(match);
    }
  }

  _setMainImage(newImageURL) {
    this.setState({
      mainImage: newImageURL,
    });
  }

  _updateAttributes(
    attributeId,
    attributeDisplayValue,
    attributeType,
    attributeValue
  ) {
    const { selectedAttributes, brand, name } = this.state.cartItem;

    // Add new attribute to existing ones
    const newAttributes = selectedAttributes.map((attribute) => {
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
    });

    // Create new attribute string section for cartItemId
    const newCartItemIdAttributes = newAttributes.map((attribute) => {
      return `${attribute.name}-${attribute.displayValue}`;
    });

    this.setState((prevState) => ({
      cartItem: {
        ...prevState.cartItem,
        cartItemId: `${brand} ${name} ${newCartItemIdAttributes}`,
        selectedAttributes: newAttributes,
      },
    }));
  }

  functionsForComponent = {
    setMainImage: this._setMainImage.bind(this),
    updateAttributes: this._updateAttributes.bind(this),
  };

  propsForComponent() {
    const { addToCart, currency } = this.props;

    return { addToCart, currency };
  }

  render() {
    return (
      <>
        <ProductPage
          {...this.state}
          {...this.functionsForComponent}
          {...this.propsForComponent()}
        />
      </>
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
      dispatch(selectProduct(productId));
    },
    saveProduct: (product) => {
      dispatch(saveProduct(product));
    },
    addToCart: (cartItem) => {
      dispatch(addProduct(cartItem));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductPageContainer);
