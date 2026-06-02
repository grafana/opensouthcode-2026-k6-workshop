# Run a basic load test

In this exercise, you'll run your first load test. 

During hours of normal activity, the average traffic for our service is 50 concurrent users.

Let's replicate similar traffic in our first load test. 

For how long? A normal load tests is recommended to run for at least 5 minutes to assess SUT's performance for a sustained time.

For quick demo purpose, we'll set the test duration to 1m.

```js
export const options = {
  vus: 50,
  duration: '1m',
};
```

However, this load will generate a flat traffic pattern that starts and ends with 50 virtual users. 

Alternatively, you could ramp the load to define more realistic traffic behaviour.

![QuickPizza screenshot](./images/ramping-load-test.png)

A common recommendtion is to spend between between 1% to 10% of the total duration to ramp up and ramp down the load.

Now in the previous test, 


1. Use the [`stages` k6 option](/docs/k6/latest/using-k6/k6-options/reference/#stages) to set the load using ramping.

2. In the test scenario, pause for 1 second after requesting a Pizza using[`sleep(1)`](https://grafana.com/docs/k6/latest/javascript-api/k6/sleep/). 

When your `k6-test.js` is ready, run it using the `--out` option.

```bash
k6 run --out web-dashboard k6-test.js
```

Setting `--out web-dashboard` visualizes the metrics in a simple web dashboard so you can watch the test live. Visit [http://127.0.0.1:5665/ui/](http://127.0.0.1:5665/ui/)

![k6 web dashboard](./images/k6-web-dashboard.png)


Finally, find and explore the common performance metrics:

- Virtual users (Traffic)
- Request duration (Latency)
- Request failed (Errors)

## Related Resources

- [k6 Documentation: Get started](https://grafana.com/docs/k6/latest/testing-guides/)
- [k6 Documentation: Testing guides](https://grafana.com/docs/k6/latest/testing-guides/)
- [k6 Documentation: Web dashboard](https://grafana.com/docs/k6/latest/results-output/web-dashboard/)

---

[← Previous exercise](../1.lab-setup/) · [Workshop homepage](https://github.com/grafana/opensouthcode-2026-k6-workshop) · [Next exercise →](../3.arrival-rate-model/)