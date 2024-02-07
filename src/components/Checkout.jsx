import React, { useContext } from "react";

import { CartContext } from "../store/cartContext";
import { UserProgressContext } from "../store/UserProgressContext";

import { currencyFormatter } from "../utils/formating";

import Modal from "./UI/Modal";
import Input from "./UI/Input";
import Button from "./UI/Button";
import useHttp from "../custom-hooks/useHttp";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};
const Checkout = () => {
  const { cartItems } = useContext(CartContext);
  const { hideCheckout, progress } = useContext(UserProgressContext);

  const { data, isLoading, error, sendRequest } = useHttp(
    "http://localhost:3000/orders",
    requestConfig
  );
  const cartTotal = cartItems.reduce((total, item) => {
    return total + item.quantity - item.price;
  }, 0);

  const handleSubmit = (event) => {
    event.preventDefault();
    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());
    sendRequest(
      JSON.stringify({
        order: {
          items: cartItems,
          customer: customerData,
        },
      })
    );
    // fetch("http://localhost:3000/orders", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     order: {
    //       items: cartItems,
    //       customer: customerData,
    //     },
    //   }),
    // });
  };

  return (
    <Modal open={progress === "checkout"} onClose={() => hideCheckout()}>
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
        <Input label="Full Name" id="name" type="text" />
        <Input label="Email" id="email" type="email" />
        <Input label="Street" id="street" type="text" />
        <div className="control-row">
          <Input label="Postal Code" id="postal-code" type="text" />
          <Input label="City" id="city" type="text" />
        </div>
        <p className="modal-actions">
          <Button type="button" textOnly onClick={hideCheckout}>
            Close
          </Button>
          <Button>Submit Order</Button>
        </p>
      </form>
    </Modal>
  );
};

export default Checkout;
