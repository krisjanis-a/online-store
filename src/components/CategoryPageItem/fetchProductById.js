import makeQuery from "../../apolloClient";

export default function fetchProductById() {
  const productIdQuery = `query {
      product(id: "${this.props.productId}") {
        id
        name
        inStock
        gallery
        prices {
          currency
          amount
        }
        brand
      }
    }`;
  makeQuery(productIdQuery).then((results) => {
    if (results.product !== null) {
      const productInfo = results.product;
      this.setState({ product: productInfo, prices: productInfo.prices });
    }
  });
}
