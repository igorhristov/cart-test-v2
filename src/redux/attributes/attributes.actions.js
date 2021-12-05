import AttributesActionTypes from "./attributes.types";

export const listSelectedAttributes = (item) => ({
    type: AttributesActionTypes.LIST_SELECTED_ATTRIBUTES,
    payload: item,
  });