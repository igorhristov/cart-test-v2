import AttributesActionTypes from "./attributes.types";

import { initAttributes, changeAttributeItem } from "./attributes.utils";

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

    case AttributesActionTypes.CHANGE_ATTRIBUTE_ITEM:
      return {
        ...state,
        attributesList: changeAttributeItem(
          state.attributesList,
          action.payload
        ),
      };

    default:
      return state;
  }
};
