const cartReducer = (state = [], action) => {
  let newState;

  switch (action.type) {
    case "ADD_PRODUCT": {
      let newCartItem = action.payload;
      let newCartItemId = newCartItem.cartItemId;
      let cartItemExists = false;

      newState = state.map((item) => {
        if (item.cartItemId === newCartItemId) {
          cartItemExists = true;
          let currentQuantity = item.quantity;
          let updatedItem = { ...item, quantity: currentQuantity + 1 };
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
      let existingCartItemId = action.payload;

      newState = state.map((item) => {
        if (item.cartItemId === existingCartItemId) {
          let currentQuantity = item.quantity;
          let updatedItem = { ...item, quantity: currentQuantity + 1 };
          return updatedItem;
        } else {
          return item;
        }
      });

      return newState;
    }

    case "REMOVE_PRODUCT": {
      let existingCartItemId = action.payload;
      newState = state
        .map((item) => {
          if (item.cartItemId === existingCartItemId) {
            let currentQuantity = item.quantity;
            if (currentQuantity > 1) {
              let updatedItem = { ...item, quantity: currentQuantity - 1 };
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
