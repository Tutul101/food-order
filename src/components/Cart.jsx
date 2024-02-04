import React, { useContext } from "react";
import Modal from "./UI/Modal";
import { CartContext } from "../store/cartContext";
import { UserProgressContext } from "../store/UserProgressContext";

import { currencyFormatter } from "../utils/formating";
import Button from "./UI/Button";

const Cart = () => {
  const { cartItems } = useContext(CartContext);
  const { progress, hideCart } = useContext(UserProgressContext);
  const cartTotal = cartItems.reduce((total, item) => {
    return total + item.quantity * item.price;
  }, 0);

  const handleCloseCart = () => {
    hideCart();
  };
  return (
    <Modal className="cart" open={progress === "cart"}>
      <h2>Your Cart</h2>
      <ul>
        {cartItems.map((item) => {
          return (
            <li key={item.id}>
              {item.name} - {item.quantity}
            </li>
          );
        })}
      </ul>
      <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={handleCloseCart}>
          Close
        </Button>
        <Button>Go to Checkout</Button>
      </p>
    </Modal>
  );
};

export default Cart;
