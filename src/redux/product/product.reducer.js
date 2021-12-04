import ProductActionTypes from "./product.types";


export const productListReducer = (state = { products: [] }, action) => {
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

export const productDetailsReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case ProductActionTypes.PRODUCT_DETAILS:
      return {
        ...state,
        product: action.payload,
      };

    default:
      return state;
  }
};
