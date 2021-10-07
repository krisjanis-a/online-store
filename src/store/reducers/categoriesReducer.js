const categoriesReducer = (
  state = {
    categories: [],
  },
  action
) => {
  switch (action.type) {
    case "SAVE_CATEGORIES":
      return {
        categories: action.payload,
      };

    default:
      return state;
  }
};

export default categoriesReducer;
