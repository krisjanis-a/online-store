import makeQuery from "../../utils/apolloClient";

export default function fetchProductById() {
  const { selectedProduct, products, saveProduct } = this.props;

  const productIdQuery = `query {
      product(id: "${selectedProduct}") {
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
    products.length !== 0 &&
    products.filter((item) => item.id === selectedProduct).length !== 0
  ) {
    const productInfo = products.filter(
      (item) => item.id === selectedProduct
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

        saveProduct(productInfo);
      }
    });
  }
}
