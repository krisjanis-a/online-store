import { combineReducers } from "redux";
import cartReducer from "./reducers/cartReducer";
import currencyReducer from "./reducers/currencyReducer";
import categoryReducer from "./reducers/categoryReducer";
import currenciesReducer from "./reducers/currenciesReducer";
import categoriesReducer from "./reducers/categoriesReducer";
import selectProductReducer from "./reducers/selectProductReducer";

const rootReducer = combineReducers({
  selectedProduct: selectProductReducer,
  cart: cartReducer,
  currency: currencyReducer,
  category: categoryReducer,
  currencies: currenciesReducer,
  categories: categoriesReducer,
});

export default rootReducer;
