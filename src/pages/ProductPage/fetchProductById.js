import makeQuery from "../../apolloClient";

export default function fetchProductById() {
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
    this.props.products.filter((item) => item.id === this.props.selectedProduct)
      .length !== 0
  ) {
    const productInfo = this.props.products.filter(
      (item) => item.id === this.props.selectedProduct
    )[0];

    this.setState({
      product: productInfo,
      prices: productInfo.prices,
      attributes: productInfo.attributes,
      images: productInfo.gallery,
      mainImage: productInfo.gallery[0],
    });
  }

  // If does not exist make a query and save product to store
  else {
    makeQuery(productIdQuery).then((results) => {
      if (results.product !== null) {
        const productInfo = results.product;
        this.setState({
          product: productInfo,
          prices: productInfo.prices,
          attributes: productInfo.attributes,
          images: productInfo.gallery,
          mainImage: productInfo.gallery[0],
        });

        this.props.saveProduct(productInfo);
      }
    });
  }
}
