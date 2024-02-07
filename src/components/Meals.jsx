import React, { useState, useEffect } from "react";
import MealItem from "./MealItem";
import useHttp from "../custom-hooks/useHttp";
import Error from "./UI/Error";
const requestConfig = {
  method: "GET",
};
const Meals = () => {
  // const [loadedMeals, setLoadedMeals] = useState([]);
  // useEffect(() => {
  //   const fetchMeals = async () => {
  //     const response = await fetch("http://localhost:3000/meals");
  //     if (!response.ok) {
  //       //
  //     }
  //     const meals = await response.json();
  //     setLoadedMeals(meals);
  //   };
  //   fetchMeals();
  // }, []);

  const {
    data: loadedMeals,
    isLoading,
    error,
  } = useHttp("http://localhost:3000/meals", requestConfig, []);

  if (isLoading) {
    return <p className="center">Fetching Meals</p>;
  }

  if (error) {
    console.log("error", error);
    return <Error title="Failed to fetch meals" message={error} />;
  }
  return (
    <ul id="meals">
      {loadedMeals.map((meal) => {
        return <MealItem key={meal.id} meal={meal} />;
      })}
    </ul>
  );
};

export default Meals;
