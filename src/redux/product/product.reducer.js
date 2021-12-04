import ProductActionTypes from "./product.types";

const INITIAL_STATE = {
  products: [],
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ProductActionTypes.ALL_PRODUCTS_LIST:
      return {
        ...state,
        products: action.payload,
      };

 
    default:
      return state;
  }
};

export default cartReducer;
