import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({
  cartItems: [],
  addItem: (item) => null,
  removeItem: (item) => null,
});

const addCartItem = (cartItems, itemToAdd) => {
  const existingCartItemIndex = cartItems.findIndex(
    (item) => item.id === itemToAdd.id
  );
  const updatedItems = [...cartItems];
  if (existingCartItemIndex > -1) {
    const existingItem = cartItems[existingCartItemIndex];
    const updatedItem = {
      ...existingItem,
      quantity: existingItem.quantity + 1,
    };
    updatedItems[existingCartItemIndex] = updatedItem;
  } else {
    updatedItems.push({ ...itemToAdd, quantity: 1 });
  }
  return updatedItems;
};

const removeCartItem = (cartItems, itemToRemove) => {
  const existingCartItemIndex = cartItems.findIndex(
    (item) => item.id === itemToRemove.id
  );
  const existingItem = cartItems[existingCartItemIndex];
  let updatedItems = [...cartItems];
  if (existingItem.quantity === 1) {
    updatedItems = updatedItems.filter((item) => item.id !== itemToRemove.id);
  } else {
    const updatedItem = {
      ...existingItem,
      quantity: existingItem.quantity - 1,
    };
    updatedItem[existingCartItemIndex] = updatedItem;
  }

  return updatedItems;
};
export const CartContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    console.log("cartItmes");
    console.log(cartItems);
  }, [cartItems]);
  const addItem = (itemToAdd) => {
    setCartItems(addCartItem(cartItems, itemToAdd));
  };

  const removeItem = (itemToRemove) => {
    setCartItems(removeCartItem(cartItems, itemToRemove));
  };

  const value = {
    cartItems,
    addItem,
    removeItem,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
