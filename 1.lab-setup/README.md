# Lab setup

In this workshop, you'll learn how to create load tests to verify the performance of QuickPizza, a simple demo app, under load.

![QuickPizza screenshot](./images/quickpizza-screenshot.png)

The QuickPizza web app is available in three distinct environments:
- [localhost:3333](http://localhost:3333/): a local test environment that runs on Docker.
- [quickpizza.grafana.com](https://quickpizza.grafana.com/): a test environment for small-load tests.
- [quickpizza.grafana.fun](https://quickpizza.grafana.fun/): a test environment for small-load tests; use it to visualize QuickPizza results in [Grafana Play](https://play.grafana.org/).

## Installation steps

_**Need help?** Raise your hand and a facilitator will come assist you._

Clone the repo and run the QuickPizza app on your local machine:

```bash
git clone git@github.com:grafana/opensouthcode-2026-k6-workshop.git
cd opensouthcode-2026-k6-workshop
docker compose up -d
```

Quickpizza should be running at [localhost:3333](http://localhost:3333/).

Install [k6 OSS](https://grafana.com/docs/k6/latest/set-up/install-k6/) in your local machine.

Next, run a basic k6 test to verify the k6 installation and testing environment.

```bash
k6 run k6-test.js
```

<details>
<summary>Alternative: run the test for a remote testing environment</summary>

```bash
k6 run -e BASE_URL=https://quickpizza.grafana.com k6-test.js
```

</details>


The output should look like:
```bash
...
running (00m00.1s), 0/1 VUs, 1 complete and 0 interrupted iterations
default ✓ [======================================] 1 VUs  00m00.1s/10m0s  1/1 iters, 1 per VU
```

You'll continue developing this k6 script in the next exercises.



## Related Resources

The following diagram shows the Docker Compose setup architecture:

![Docker Compose setup](../compose/diagram-architecture.svg)

- [k6 OSS docs](https://grafana.com/docs/k6/latest/)
- [github.com/grafana/quickpizza](https://github.com/grafana/quickpizza): this repository can be used to learn the Grafana observability stack (OSS and Cloud).

---

[Workshop homepage](https://github.com/grafana/opensouthcode-2026-k6-workshop) · [Next exercise →](../2.basic-load-test/)