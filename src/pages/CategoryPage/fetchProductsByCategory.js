import makeQuery from "../../utils/apolloClient";

export default function fetchProductsByCategory() {
  const productsIdQuery = `query {
      category(input:{title:"${this.props.category}"}){
        name 
         products {
          id 
        }
      }
    }`;
  makeQuery(productsIdQuery).then((results) => {
    if (results.category !== null) {
      const categoryProducts = results.category.products.map(
        (product) => product.id
      );

      this.setState({ productsId: categoryProducts });
    }
  });
}
