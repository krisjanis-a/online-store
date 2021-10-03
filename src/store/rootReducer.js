import cartReducer from "./reducers/cartReducer";
import currencyReducer from "./reducers/currencyReducer";
import categoryReducer from "./reducers/categoryReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  cart: cartReducer,
  currency: currencyReducer,
  category: categoryReducer,
});

export default rootReducer;
