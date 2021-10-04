export const saveCategories = (categories) => {
  return {
    type: "SAVE_CATEGORIES",
    payload: categories,
  };
};
