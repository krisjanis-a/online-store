export const addProduct = (productObject) => {
  return {
    type: "ADD_PRODUCT",
    payload: productObject,
  };
};

export const addExistingProduct = (cartItemId) => {
  return {
    type: "ADD_EXISTING_PRODUCT",
    payload: cartItemId,
  };
};

export const removeProduct = (cartItemId) => {
  return {
    type: "REMOVE_PRODUCT",
    payload: cartItemId,
  };
};
