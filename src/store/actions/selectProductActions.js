export const selectProduct = (productId) => {
  return {
    type: "SELECT_PRODUCT",
    payload: productId,
  };
};
