import http from "k6/http";

const BASE_URL = __ENV.BASE_URL || "http://localhost:3333";

export const options = {
  scenarios: {
    default: {
      executor: "constant-arrival-rate",

      // string: How long the test lasts
      duration: "10s",

      // integer: Iteration rate, the number of iterations to start during each `timeUnit` period
      rate: 30,

      //string: Default "1s". Period of time to apply the `rate` value.
      timeUnit: "1s",

      //integer: Number of VUs to pre-allocate before test start to preserve runtime resources.
      preAllocatedVUs: 50,
    },
  },
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
}