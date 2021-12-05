import { combineReducers } from "redux";

import cartReducer from "./cart/cart.reducer";

import currencyReducer from "./currency/currency.reducer";

import {
  productListReducer,
  productDetailsReducer,
} from "./product/product.reducer";

import { attributesListReducer } from "./attributes/attributes.reducer";

export default combineReducers({
  cart: cartReducer,
  currencies: currencyReducer,
  productList: productListReducer,
  productDetails: productDetailsReducer,
  attributesList: attributesListReducer,
});
