const cartReducer = (state = [], action) => {
  let newState;

  switch (action.type) {
    case "ADD_PRODUCT": {
      const newCartItem = action.payload;
      const newCartItemId = newCartItem.cartItemId;
      let cartItemExists = false;

      newState = state.map((item) => {
        if (item.cartItemId === newCartItemId) {
          cartItemExists = true;
          const currentQuantity = item.quantity;
          const updatedItem = { ...item, quantity: currentQuantity + 1 };
          return updatedItem;
        } else {
          return item;
        }
      });

      if (!cartItemExists) {
        newState.push({
          cartItemId: newCartItemId,
          cartItem: newCartItem,
          quantity: 1,
        });
      }

      return newState;
    }

    case "ADD_EXISTING_PRODUCT": {
      const existingCartItemId = action.payload;

      newState = state.map((item) => {
        if (item.cartItemId === existingCartItemId) {
          const currentQuantity = item.quantity;
          const updatedItem = { ...item, quantity: currentQuantity + 1 };
          return updatedItem;
        } else {
          return item;
        }
      });

      return newState;
    }

    case "REMOVE_PRODUCT": {
      const existingCartItemId = action.payload;
      newState = state
        .map((item) => {
          if (item.cartItemId === existingCartItemId) {
            const currentQuantity = item.quantity;
            if (currentQuantity > 1) {
              const updatedItem = { ...item, quantity: currentQuantity - 1 };
              return updatedItem;
            } else {
              return null;
            }
          } else {
            return item;
          }
        })
        .filter((item) => item !== null);

      return newState;
    }

    default:
      return state;
  }
};

export default cartReducer;
