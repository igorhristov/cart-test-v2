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
          selected: attribute.items[0].id
        };
      }),
    },
  ];
};
