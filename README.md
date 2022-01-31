# wise-k8s-gitops-workshop

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

## Documentation and examples
https://github.com/codefresh-contrib/gitops-certification-examples
