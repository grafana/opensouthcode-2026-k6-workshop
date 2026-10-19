# Distributed load testing with the k6 Operator

_**Need help?** Raise your hand and we'll come help._

In this exercise, you'll learn how to:

- Run a k6 test as a Kubernetes custom resource
- See how the k6 Operator turns one `TestRun` into multiple Kubernetes Jobs
- Inspect the output from distributed k6 runner processes

The system under test does not technically need to run in Kubernetes. But in this lab, we'll get you to deploy QuickPizza into your own cluster, so your test results are yours and yours alone. 

Run all commands from the repository root.

If the workshop Docker Compose stack is still running and your laptop has limited memory, stop it before starting kind:

```bash
docker compose down
```

## Create the cluster

Create a one-node kind cluster and confirm that `kubectl` is using it:

```bash
kind create cluster --name k6-workshop
kubectl config current-context
```

The context should be `kind-k6-workshop`.

Install the pinned k6 Operator v1.7.0 bundle, and wait for its controller to become available:

```bash
kubectl apply --server-side -f https://raw.githubusercontent.com/grafana/k6-operator/v1.7.0/bundle.yaml
kubectl wait --for=condition=available deployment/k6-operator-controller-manager \
  --namespace k6-operator-system --timeout=120s
```

The bundle installs the k6 Custom Resource Definitions, the operator controller, and the permissions it needs to create Jobs and Pods.

## Deploy QuickPizza

Deploy QuickPizza and wait for its readiness probe to pass:

```bash
kubectl apply -f 6.operator/quickpizza.yaml
kubectl rollout status deployment/quickpizza --timeout=120s
kubectl get deployment,service quickpizza
```

The `quickpizza` ClusterIP Service exposes port 3333. Workloads in the same namespace can reach it at `http://quickpizza:3333`.

## Create and run the distributed test

A ConfigMap makes the local test script available inside the runner Pods. Create it from the supplied script:

```bash
kubectl create configmap quickpizza-test \
  --from-file=k6-test.js=6.operator/k6-test.js
```

Review [`testrun.yaml`](./testrun.yaml). Its main fields are:

- `script.configMap`: mounts the `k6-test.js` ConfigMap entry as the test script.
- `parallelism: 2`: splits one logical k6 test run into two equal runners.
- `separate: false`: allows both runner Pods to run on the same node.
- `runner.env`: gives the runners QuickPizza's in-cluster URL.

Apply the `TestRun`:

```bash
kubectl apply -f 6.operator/testrun.yaml
```

In a second terminal, watch the resources created by the operator:

```bash
kubectl get testruns,jobs,pods
```

You should see four Jobs over the lifetime of the test: one initializer, two k6 runners, and one starter:

- The initializer validates and prepares the script. 
- Each runner owns one execution segment.
- The starter coordinates their common start.

Since you're running on _kind_, your cluster will have only one node. The two runner Pods that we've scheduled here show how k6 test execution can be split and orchestrated by the operator.

Wait for the TestRun to finish, then see what happened:

```bash
kubectl wait --for=jsonpath='{.status.stage}'=finished \
  testrun/quickpizza-test --timeout=180s
kubectl get testrun quickpizza-test
kubectl get jobs
```

## Compare the runner output

Read the summary from each runner:

```bash
kubectl logs job/quickpizza-test-1
kubectl logs job/quickpizza-test-2
```

In the sumamries:

- Both runners should show successful iterations and a 100% `status is 200` check.
- The script configures a total arrival rate of 4 iterations per second for 15 seconds. 
- The operator has divided that rate across the two execution runners; it does not run 4 iterations per second on each runner. 

If you add the `iterations` values from both summaries, you should get approximately 60, albeit with some possible variation.

## Optional: compare one runner

Delete the completed `TestRun` before reusing its name. Otherwise its completed Jobs can collide with the next run:

```bash
kubectl delete -f 6.operator/testrun.yaml --ignore-not-found
```

Change `parallelism` in [`testrun.yaml`](./testrun.yaml) from `2` to `1`, apply it again, and watch the resources:

```bash
kubectl apply -f 6.operator/testrun.yaml
kubectl get testruns,jobs,pods --watch
```

This run creates one runner Job, while the test still targets approximately 4 iterations per second and 60 total iterations. Delete the `TestRun` when you finish. Restore `parallelism: 2` if you want to keep the supplied file unchanged.

## Troubleshooting

**If you re-apply the TestRun onto the cluster, it does not not start a new test**

A completed `TestRun` is not restarted by `kubectl apply`. Delete the TestRun before applying it again:

```bash
kubectl delete testrun quickpizza-test --ignore-not-found
kubectl apply -f 6.operator/testrun.yaml
```

## Clean up

Remove only the lab workloads and operator, while keeping the kind cluster:

```bash
kubectl delete testrun quickpizza-test --ignore-not-found 2>/dev/null || true
kubectl delete configmap quickpizza-test --ignore-not-found
kubectl delete -f 6.operator/quickpizza.yaml --ignore-not-found
kubectl delete -f https://raw.githubusercontent.com/grafana/k6-operator/v1.7.0/bundle.yaml \
  --ignore-not-found
```

Or remove the entire cluster, including all lab resources:

```bash
kind delete cluster --name k6-workshop
```

## Related Resources

- [k6 Operator documentation](https://grafana.com/docs/k6/latest/set-up/set-up-distributed-k6/)
- [Run k6 scripts with the TestRun CRD](https://grafana.com/docs/k6/latest/set-up/set-up-distributed-k6/usage/executing-k6-scripts-with-testrun-crd/)
- [Configure the TestRun CRD](https://grafana.com/docs/k6/latest/set-up/set-up-distributed-k6/usage/configure-testrun-crd/)
- [kind documentation](https://kind.sigs.k8s.io/)

---

[← Previous exercise](../5.infrastructure-testing/) · [Workshop homepage](https://github.com/immavalls/cnd-norway-2026-k6-workshop)
