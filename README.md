# wise-k8s-gitops-workshop
## Requirements
* [Docker](https://www.docker.com/)
* [Kind](https://kind.sigs.k8s.io/)
* [Python](https://www.python.org/)

# How to start:
## Check all available options:
```
make help
```
## Install kind and kubeclt CLI tools
### For MAC user:
```
make mac-init
```
### For Linux/WinWSL user:
```
make linux-init
```
## Create local Kubernetes cluster
```
make cluster
```
### Check if kubernetes node is ready
```
kubectl get node --watch
```
## Install Nginx Ingress Controller
```
kubectl apply -f nginx-ingress-controller/install.yaml
```
A few pods should start in the ingress-nginx namespace:
```
kubectl get pods --namespace=ingress-nginx --watch

NAME                                       READY   STATUS      RESTARTS   AGE
ingress-nginx-admission-create-7ngh2       0/1     Completed   0          2m
ingress-nginx-admission-patch-v992j        0/1     Completed   0          2m
ingress-nginx-controller-b7b74c7b7-5f498   1/1     Running     0          2m
```
## install ArgoCD Controller and Ingress
```
kubectl apply -f argocd/install.yaml -n argocd
kubectl get pods --namespace=argocd --watch
kubectl apply -f argocd/ingress.yaml
```
## Delete local cluster
```
make clean
```
## Documentation and examples
https://github.com/codefresh-contrib/gitops-certification-examples
