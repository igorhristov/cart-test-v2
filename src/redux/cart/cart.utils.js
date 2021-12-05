export const addItemToCart = (cartItems, cartItemToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToAdd.id
  );

  if (existingCartItem) {
    return cartItems;
  }

  return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove);
};

export const addQuantityToCartItem = (cartItems, cartItemQuantityToAdd) => {
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemQuantityToAdd.id
      ? { ...cartItem, quantity: cartItem.quantity + 1 }
      : cartItem
  );
};

export const removeQuantityFromCartItem = (
  cartItems,
  cartItemQuantityToRemove
) => {
  return cartItems.map((cartItem) => {
    if (cartItem.id === cartItemQuantityToRemove.id && cartItem.quantity > 1) {
      return { ...cartItem, quantity: cartItem.quantity - 1 };
    }
    return cartItem;
  });
};
