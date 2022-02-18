.DEFAULT_GOAL := help

BUILD=$$(git rev-parse --short HEAD)

help: # Automatically documents the makefile, by outputing everything behind a ##
	@grep -E '^[0-9a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

linux-init: ## install Kind and kubectl for Linux
	curl -Lo ./kind https://kind.sigs.k8s.io/dl/v0.11.1/kind-linux-amd64
	chmod +x ./kind
	mv ./kind ~/.local/bin/kind
	curl -LO https://dl.k8s.io/release/v1.21.0/bin/linux/amd64/kubectl
	chmod +x ./kubectl
	mv ./kubectl ~/.local/bin/kubectl
	alias k=~/.local/bin/kubectl

mac-init: ## install Kind and kubectl for Mac
	curl -Lo ./kind https://kind.sigs.k8s.io/dl/v0.11.1/kind-darwin-amd64
	chmod +x ./kind
	mv ./kind ~/.local/bin/kind
	curl -LO "https://dl.k8s.io/release/v1.21.0/bin/darwin/amd64/kubectl"
	chmod +x ./kubectl
	mv ./kubectl ~/.local/bin/kubectl
	alias k=~/.local/bin/kubectl

lint: ## Install and run linter 
	pip3 install black
	black ./app

build: ## Build docker image for demo app
	@echo "Start build ${BUILD}"
	docker build -t m1g0r/demo-app:${BUILD} ./app/ --progress plain

push: ## Push docker image to dockerhub
	@echo "Push it"
	docker push m1g0r/demo-app:${BUILD}

cluster: ## Create local Kubernetes cluster with Kind
	~/.local/bin/kind create cluster --config kind-cluster/cluster.yaml

clean: ## Delete local cluster
	~/.local/bin/kind delete cluster --name wise-k8s
