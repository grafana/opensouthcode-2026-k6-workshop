# Lab setup

In this workshop, you'll learn how to create load tests to verify the performance of QuickPizza, a simple demo application, under load.

![QuickPizza screenshot](./images/quickpizza-screenshot.png)

QuickPizza is available in three environments:
- [localhost:3333](http://localhost:3333/): a local environment that runs with Docker.
- [quickpizza.grafana.com](https://quickpizza.grafana.com/): a shared test environment for small-scale load tests.
- [quickpizza.grafana.fun](https://quickpizza.grafana.fun/): a shared test environment for small-scale load tests that also lets you visualize results in [Grafana Play](https://play.grafana.org/).

## Installation steps

_**Need help?** Raise your hand and we'll come help._

Clone the repo and start QuickPizza on your local machine:

```bash
git clone git@github.com:grafana/opensouthcode-2026-k6-workshop.git
cd opensouthcode-2026-k6-workshop
docker compose up -d
```

Quickpizza should now be running at [localhost:3333](http://localhost:3333/).

Install [k6 OSS](https://grafana.com/docs/k6/latest/set-up/install-k6/) on your machine.

Next, run a basic k6 test to verify your installation and test environment:

```bash
k6 run k6-test.js
```

<details>
<summary>Alternative: run the test against a remote testing environment</summary>

```bash
k6 run -e BASE_URL=https://quickpizza.grafana.com k6-test.js
```

</details>

The output should look similar to:

```bash
...
running (00m00.1s), 0/1 VUs, 1 complete and 0 interrupted iterations
default ✓ [======================================] 1 VUs  00m00.1s/10m0s  1/1 iters, 1 per VU
```

You'll continue building on this k6 script in the next exercises.

## Related Resources

The following diagram shows the Docker Compose architecture used in this workshop:

![Docker Compose setup](../compose/diagram-architecture.svg)

- [k6 OSS documentation](https://grafana.com/docs/k6/latest/)
- [github.com/grafana/quickpizza](https://github.com/grafana/quickpizza): This repository can be used to learn and explore the Grafana observability stack.

---

[Workshop homepage](https://github.com/grafana/opensouthcode-2026-k6-workshop) · [Next exercise →](../2.basic-load-test/)