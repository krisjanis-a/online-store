export const addProduct = (productIdAttribute) => {
  return {
    type: "ADD_PRODUCT",
    payload: productIdAttribute,
  };
};

export const removeProduct = (productIdAttribute) => {
  return {
    type: "REMOVE_PRODUCT",
    payload: productIdAttribute,
  };
};
