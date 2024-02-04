import React, { useContext } from "react";
import { CartContext } from "../store/cartContext";
import logo from "../assets/logo.jpg";
import Button from "./UI/Button";

const Header = () => {
  const { cartItems } = useContext(CartContext);
  const totalCartItems =
    cartItems &&
    cartItems.reduce((totalNumberOfItems, item) => {
      return totalNumberOfItems + item.quantity;
    }, 0);

  return (
    <header id="main-header">
      <div id="title">
        <img src={logo} alt="A Restraunt" />
        <h1>React Food</h1>
      </div>
      <nav>
        <Button textOnly>Cart ({totalCartItems})</Button>
      </nav>
    </header>
  );
};

export default Header;
