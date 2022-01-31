.DEFAULT_GOAL := help

BUILD=$$(git rev-parse --short HEAD)

help: # Automatically documents the makefile, by outputing everything behind a ##
	@grep -E '^[0-9a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

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
	kind create cluster --config kind-cluster/cluster.yaml
