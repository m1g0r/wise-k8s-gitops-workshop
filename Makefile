.DEFAULT_GOAL := help

BUILD=$$(git rev-parse --short HEAD)

help: # automatically documents the makefile, by outputing everything behind a ##
	@grep -E '^[0-9a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

lint: ## install and run linter 
	pip3 install black
	black ./app

build:
	@echo "Start build ${BUILD}"
	docker build --progress plain \
	--target app . --build-arg APP_BUILD_INFO=${BUILD} \
	--tag m1g0r/demo-app:${BUILD}

push:
	@echo "Push it"
	docker push m1g0r/demo-app:${BUILD}
