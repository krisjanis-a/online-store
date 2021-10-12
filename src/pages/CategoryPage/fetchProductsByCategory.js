import makeQuery from "../../utils/apolloClient";

export default function fetchProductsByCategory() {
  const {
    categories: { categories },
    category,
  } = this.props;

  const productsIdQuery = (categoryName) => `query {
    category(input:{title:"${categoryName}"}){
      name
      products {
        id
      }
    }
  }`;

  category === "all" && this.setState({ productsId: [] });

  categories.forEach((categoryOption) => {
    if (category === "all") {
      makeQuery(productsIdQuery(categoryOption)).then((results) => {
        if (results.category !== null) {
          const categoryProducts = results.category.products.map(
            (product) => product.id
          );
          const currentProducts = [...this.state.productsId];
          this.setState({
            productsId: [...currentProducts, ...categoryProducts],
          });
        }
      });
    } else {
      if (categoryOption === category) {
        makeQuery(productsIdQuery(categoryOption)).then((results) => {
          if (results.category !== null) {
            const categoryProducts = results.category.products.map(
              (product) => product.id
            );
            this.setState({ productsId: categoryProducts });
          }
        });
      } else {
        return;
      }
    }
  });
}
