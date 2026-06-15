# Set assertions and Pass/Fail criteria

_**Need help?** Raise your hand and we'll come help._

In this exercise, you'll simulate performance degradation in QuickPizza and then verify behavior using k6 checks and thresholds.

Reaching the saturation point of a system can be difficult because every local machine has different hardware and performance characteristics.

One approach is to gradually increase load until the system starts failing. For this workshop, we'll use a simpler technique: **failure injection**.

Uncomment the following lines in [compose.yaml](../compose.yaml):

```yml
      # QUICKPIZZA_DELAY_RECOMMENDATIONS: 1000
      # QUICKPIZZA_FAIL_RATE_RECOMMENDATIONS_API_PIZZA_POST: 5
```

Then restart your local QuickPizza environment:

```bash
docker compose down -v && docker compose up -d
```

QuickPizza now returns occasional errors and slower responses.

To make the code fault-tolerant, wrap up the `console.log` statement as follows:

```js
if (res === 200) {
    console.log(
      `${res.json().pizza.name} (${res.json().pizza.ingredients.length} ingredients)`,
    );
}
```

[k6 checks](https://grafana.com/docs/k6/latest/using-k6/checks/) validate conditions during test execution and report failures without stopping the test.

Implement a k6 check that reports successful responses (`status === 200`) with a custom message.

Run the test when ready.

```bash
k6 run --out web-dashboard k6-test.js
```

Verify the output in the terminal:

- The check should report roughly 95% successful responses and appear with a ❌ status.
- The test should complete successfully and k6 returns a zero exit code.

```bash
    ✗ status is 200
      ↳  95% — ✓ 288 / ✗ 13

...

default ✓ [======================================] 00/50 VUs  10s  30.00 iters/s
```

Now, add a [k6 threshold](https://grafana.com/docs/k6/latest/using-k6/thresholds/) to verify that at least 99% of responses complete in under 1 second. 

The [`http_req_duration`](https://grafana.com/docs/k6/latest/using-k6/metrics/reference/#http) reports the total server request duration, so the threshold should be like:

```js
http_req_duration: ['p(99)<1000'], 
```

Configure the threshold and run the test again. 

After the test finishes, check the `http_req_duration` results. The test should fail:

```bash
...
http_req_duration..............: avg=1.13s min=1s med=1.1s max=1.65s p(90)=1.26s p(95)=1.34s
...
ERRO[0011] thresholds on metrics 'http_req_duration' have been crossed 
```

📌 Unlike checks, thresholds affect the test result. When a threshold is crossed, k6 returns a non-zero exit code, allowing you to verify performance criteria with load tests in your CI/CD pipelines.


If you have extra time, update the latency threshold until the test passes.



## Related Resources

- [k6 Documentation: Checks](https://grafana.com/docs/k6/latest/using-k6/checks/)
- [k6 Documentation: Thresholds](https://grafana.com/docs/k6/latest/using-k6/thresholds/)
- [k6 Documentation: Assertions (Public Preview)](https://grafana.com/docs/k6/latest/using-k6/assertions/)

---

[← Previous exercise](../2.basic-load-test/) · [Workshop homepage](https://github.com/grafana/opensouthcode-2026-k6-workshop) · [Next exercise →](../5.use-recorders/)