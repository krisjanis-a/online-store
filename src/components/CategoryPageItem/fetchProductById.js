import makeQuery from "../../utils/apolloClient";

export default function fetchProductById() {
  const { productId } = this.props;

  const productIdQuery = `query {
      product(id: "${productId}") {
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
