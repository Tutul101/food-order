import React, { useContext } from "react";
import { CartContext } from "../store/cartContext";
import logo from "../assets/logo.jpg";
import Button from "./UI/Button";
import { UserProgressContext } from "../store/UserProgressContext";

const Header = () => {
  const { cartItems } = useContext(CartContext);
  const { showCart } = useContext(UserProgressContext);

  const totalCartItems =
    cartItems &&
    cartItems.reduce((totalNumberOfItems, item) => {
      return totalNumberOfItems + item.quantity;
    }, 0);

  const handleShowCart = () => {
    showCart();
  };

  return (
    <header id="main-header">
      <div id="title">
        <img src={logo} alt="A Restraunt" />
        <h1>React Food</h1>
      </div>
      <nav>
        <Button textOnly onClick={handleShowCart}>
          Cart ({totalCartItems})
        </Button>
      </nav>
    </header>
  );
};

export default Header;
