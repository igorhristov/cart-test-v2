export const initAttributes = (attributesState, newProductAttributes) => {
  const existingProduct = attributesState.find(
    (product) => product.id === newProductAttributes.id
  );

  if (existingProduct) {
    return attributesState;
  }

  return [
    ...attributesState,
    {
      id: newProductAttributes.id,
      attributes: newProductAttributes.attributes.map((attribute) => {
        return {
          id: attribute.id,
          selected: attribute.items[0].id,
        };
      }),
    },
  ];
};

export const changeAttributeItem = (attributesList, itemToChange) => {
  return attributesList.map((product) => {
      if(product.id === itemToChange.productId) {
        return {
          id: product.id,
          attributes: product.attributes.map(attribute=>{
            if(attribute.id === itemToChange.attributeId) {
              return {
                id: attribute.id,
                selected: itemToChange.itemId
              }
            }
            return attribute
          })
        }
      }



    return product
  });
};
