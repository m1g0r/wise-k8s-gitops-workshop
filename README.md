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
## Install Nginx Ingress Controller
```
kubectl apply -f nginx-ingress-controller/install.yaml
```
## install ArgoCD Controller and Ingress
```
kubectl apply -f argocd/install.yaml -n argocd
kubectl apply -f argocd/ingress.yaml
```
## Delete local cluster
```
make clean
```
## Documentation and examples
https://github.com/codefresh-contrib/gitops-certification-examples
