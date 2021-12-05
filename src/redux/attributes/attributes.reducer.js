import AttributesActionTypes from "./attributes.types";

import { initAttributes } from "./attributes.utils";

export const attributesListReducer = (
  state = { attributesList: [] },
  action
) => {
  switch (action.type) {
    case AttributesActionTypes.LIST_SELECTED_ATTRIBUTES:
      return {
        ...state,
        attributesList: initAttributes(state.attributesList, action.payload),
      };

    default:
      return state;
  }
};
