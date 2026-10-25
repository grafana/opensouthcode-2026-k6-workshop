# Load testing workshop with k6 OSS - Cloud Native Days Norway 2026

[Workshop slide deck](https://speakerdeck.com/immavalls/shift-left-with-reliability-testing-a-hands-on-introduction-to-k6)

## Hands-on lab flow

1. Introduction
2. [Lab setup](./1.lab-setup/)
3. [First load test](./2.basic-load-test/)
4. [Workload in request rate](./3.workload-in-rps/)
5. [Assertions](./4.assertions/)
6. [Infrastructure testing](./5.infrastructure-testing/)
7. [Distributed load testing with the k6 Operator](./6.operator/)
8. k6 Ecosystem Overview
9. Lab wrap-up / Closing

## Additional exercises (take-away)

- [Test recorders with k6 Studio](./additional/test-recorders/): a home exercise to try after the workshop

## Facilitators and in-room support staff
- [Imma Valls](https://www.linkedin.com/in/imma-valls/)
- [Tom Donohue](https://www.linkedin.com/in/tomint/)

_**Need help?** Raise your hand and we'll come help._

## What you will learn

By the end of this workshop, you will learn the fundamentals of load testing and have built:
- API performance tests with meaningful thresholds and assertions
- Grafana dashboards to visualize test results and understand how the system behaves under a heavy load.
- Load tests for SQL databases
- Distributed load tests running on Kubernetes with the k6 Operator

## Pre-requisites

In order to participate in the lab, you must have a laptop with Wi-Fi/Internet connectivity, running Linux/MacOS/Windows.

We recommend running `docker compose pull` before the workshop: the images are large and conference Wi-Fi is slow.

The following also needs to be installed:
- An IDE installed to write k6 scripts
- Git and [Docker Desktop](https://docs.docker.com/get-started/get-docker/) to run the demo app
- k6 OSS: either the [k6 binary](https://grafana.com/docs/k6/latest/set-up/install-k6/) installed, or nothing extra if you run k6 with Docker (the lab setup provides a `k6` container)
- [kind](https://kind.sigs.k8s.io/) and [kubectl](https://kubernetes.io/docs/tasks/tools/) for the k6 Operator lab
