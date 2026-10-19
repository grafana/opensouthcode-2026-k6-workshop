import { check } from "k6";
import http from "k6/http";

const BASE_URL = __ENV.BASE_URL || "http://localhost:3333";

export const options = {
  scenarios: {
    quickpizza: {
      executor: "constant-arrival-rate",
      duration: "15s",
      rate: 4,
      timeUnit: "1s",
      preAllocatedVUs: 4,
    },
  },
};

export default function () {
  const restrictions = {
    maxCaloriesPerSlice: 500,
    mustBeVegetarian: false,
    excludedIngredients: ["pepperoni"],
    excludedTools: ["knife"],
    maxNumberOfToppings: 6,
    minNumberOfToppings: 2,
  };

  const response = http.post(
    `${BASE_URL}/api/pizza`,
    JSON.stringify(restrictions),
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "token abcdef0123456789",
      },
    },
  );

  check(response, { "status is 200": (res) => res.status === 200 });
}
