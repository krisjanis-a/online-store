const categoriesReducer = (
  state = { categories: [], prevCategories: [] },
  action
) => {
  switch (action.type) {
    case "SAVE_CATEGORIES":
      return {
        categories: action.payload,
        prevCategories:
          state.categories.length !== 0
            ? state.prevCategories.push(state.categories)
            : [],
      };

    default:
      return state;
  }
};

export default categoriesReducer;
