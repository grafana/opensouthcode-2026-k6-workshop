# Load testing workshop with k6 OSS - Cloud Native Days Norway 2026

[Workshop slide deck](https://speakerdeck.com/immavalls/shift-left-with-reliability-testing-a-hands-on-introduction-to-k6)

## Hands-on lab flow

- Introduction: introduction to reliability testing and k6
- [Lab 1 - Setup](./1.lab-setup/): set up your environment for the labs
- [Lab 2 - Basic load test](./2.basic-load-test/): run a simple k6 test
- [Lab 3 - Workload in rps](./3.workload-in-rps/): choosing the right model for your test
- [Lab 4 - Assertions and CI/CD](./4.assertions/): set pass/fail criteria for your tests
- [Lab 5 - Infrastructure load test](./5.infrastructure-testing/): load test a DB and correlate your infrastructure tests
- [Lab 6 - Scale with the k6 Operator](./6.operator/): move to a distributed test on Kubernetes
- k6 AI and wrap-up: demo, take-home exercises and Q&A

## Additional exercises (take-away)

- [Test recorders with k6 Studio](./additional/test-recorders/): a home exercise to try after the workshop

## Facilitators and in-room support staff
- [Imma Valls](https://www.linkedin.com/in/imma-valls/)
- [Tom Donahue](https://www.linkedin.com/in/tomint/)

_**Need help?** Raise your hand and we'll come help._

## What you will learn

By the end of this workshop, you will learn the fundamentals of load testing and have built:
- API performance tests with meaningful thresholds and assertions
- Grafana dashboards to visualize test results and understand how the system behaves under a heavy load.
- Load tests for SQL databases
- Distributed load tests running on Kubernetes with the k6 Operator

## Pre-requisites

In order to participate in the lab, you must have a laptop with Wi-Fi/Internet connectivity, running Linux/MacOS/Windows. 

The following also needs to be installed:
- An IDE installed to write k6 scripts
- Git and [Docker Desktop](https://docs.docker.com/get-started/get-docker/) to run the demo app
- [k6 OSS](https://grafana.com/docs/k6/latest/set-up/install-k6/) binary installed
- [kind](https://kind.sigs.k8s.io/) and [kubectl](https://kubernetes.io/docs/tasks/tools/) for the k6 Operator lab
