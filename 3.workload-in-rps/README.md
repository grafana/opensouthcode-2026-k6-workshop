# Define workload in requests per second

_**Need help?** Raise your hand and we'll come help._

Requests per second (RPS), also known as request rate, is the standard metric used to measure traffic for APIs and services.

We've observed that our QuickPizza service handles around **30 requests per second** during normal operation.

Instead of modeling the workload in terms of users, let's use the observed traffic value to generate a workload of **30 requests per second**.

For simplicity, we'll:
- Set a shorter test duration of `10s`.
- Use the [`constant-arrival-rate` executor](https://grafana.com/docs/k6/latest/using-k6/scenarios/executors/constant-arrival-rate/) to generate a constant (no ramping) iteration rate.

```js
export const options = {
  scenarios: {
    default: {
      executor: 'constant-arrival-rate',

      // string: How long the test lasts
      duration: ,

      // integer: Iteration rate, the number of iterations to start during each `timeUnit` period
      rate: ,

      //string: Default "1s". Period of time to apply the `rate` value.
      timeUnit: ,

      //integer: Number of VUs to pre-allocate before test start to preserve runtime resources.
      preAllocatedVUs: 50,
    },
  },
};
```

When your `k6-test.js` is ready, run it with the `--out` option.

```bash
k6 run --out web-dashboard k6-test.js
```

You can verify the generated workload in the terminal output:

```bash
running (10.2s), 000/50 VUs, 300 complete and 0 interrupted iterations
default ✓ [======================================] 000/50 VUs  10s  30.00 iters/s

...

# number of HTTP requests and HTTP request per second
http_reqs......................: 301    29.389678/s

# number of script iterations and iterations per second
iterations.....................: 301    29.389678/s
```

On the **default ✓** row, `30.00 iters/s` indicates the iteration rate configured with the `constant-arrival-rate` executor.

⚠️ Do `http_reqs` and `iterations` report significantly lower rates than the configured `30 iters/s`?

🔍 If so, review the test scenario and find what could cause requests to execute at a slower pace.

After fixing it, run the test again.

## Related Resources

- [k6 Documentation: Executors](https://grafana.com/docs/k6/latest/using-k6/scenarios/executors/)
- [k6 Documentation: Constant arrival rate executor](https://grafana.com/docs/k6/latest/using-k6/scenarios/executors/constant-arrival-rate/)
- [k6 Documentation: Load test types](https://grafana.com/docs/k6/latest/testing-guides/test-types/)

---

[← Previous exercise](../2.basic-load-test/) · [Workshop homepage](https://github.com/grafana/opensouthcode-2026-k6-workshop) · [Next exercise →](../4.assertions/)