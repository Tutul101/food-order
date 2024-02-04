import React, { useContext } from "react";
import { currencyFormatter } from "../utils/formating";
import { CartContext } from "../store/cartContext";

import Button from "./UI/Button";

const MealItem = ({ meal }) => {
  const { addItem } = useContext(CartContext);
  const handleAddItemToCart = () => {
    addItem(meal);
  };
  return (
    <li className="meal-item">
      <article>
        <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
        <div>
          <h3>{meal.name}</h3>
          <p className="meal-item-price">
            {currencyFormatter.format(meal.price)}
          </p>
          <p className="meal-item-description">{meal.description}</p>
        </div>
        <p className="meal-item-actions">
          <Button onClick={handleAddItemToCart}>Add to cart</Button>
        </p>
      </article>
    </li>
  );
};

export default MealItem;
