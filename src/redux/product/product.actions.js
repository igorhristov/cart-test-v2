import ProductActionTypes from "./product.types";

import getAllProducts from "../../queries/get-all-products";

export const listAllProducts = () => async (dispatch) => {
  const result = await JSON.parse(
    JSON.stringify(await getAllProducts())
  );

  const allProductsResult = Array.from(
    new Set(result.category.products.map(JSON.stringify))
  ).map(JSON.parse);

  dispatch({
    type: ProductActionTypes.ALL_PRODUCTS_LIST,
    payload: allProductsResult,
  });
};
