import { sleep } from 'k6';
import http from "k6/http";

const BASE_URL = __ENV.BASE_URL || "http://localhost:3333";

export const options = {
  stages: [
    // starts at 0 and ramps up to 50 virtual users over 5 seconds
    { duration: "5s", target: 50 },
    // stays at 50 virtual users for 50 seconds
    { duration: "50s", target: 50 },
    // ramps down to 0 virtual users over 5 seconds
    { duration: "5s", target: 0 },
  ],
};

export default function () {
  let restrictions = {
    maxCaloriesPerSlice: 500,
    mustBeVegetarian: false,
    excludedIngredients: ["pepperoni"],
    excludedTools: ["knife"],
    maxNumberOfToppings: 6,
    minNumberOfToppings: 2,
  };
  let res = http.post(`${BASE_URL}/api/pizza`, JSON.stringify(restrictions), {
    headers: {
      "Content-Type": "application/json",
      Authorization: "token abcdef0123456789",
    },
  });
  console.log(
    `${res.json().pizza.name} (${res.json().pizza.ingredients.length} ingredients)`,
  );
  // pause for 1 second between iterations to simulate a more realistic user behavior
  sleep(1);
}
