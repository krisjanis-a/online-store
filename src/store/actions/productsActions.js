export const saveProduct = (productId) => {
  return {
    type: "SAVE_PRODUCT",
    payload: productId,
  };
};
