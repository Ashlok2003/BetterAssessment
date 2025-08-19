DOCKER_IMAGE ?= better-assessment
DOCKER_TAG ?= latest
DOCKER_CONTAINER ?= $(DOCKER_IMAGE)-container

dev:
	npx nodemon --watch src --ext ts,json --exec ts-node src/index.ts

build:
	npx tsc

start:
	node dist/index.js

lint:
	npx eslint "src/**/*.{ts,js}" --max-warnings=0

lint-fix:
	npx eslint "src/**/*.{ts,js}" --fix

test:
	npx jest

test-coverage:
	npx jest --coverage

format:
	npx prettier --write "src/**/*.{ts,js,json,md}"

format-check:
	npx prettier --check "src/**/*.{ts,js,json,md}"

docker-build:
	docker build -t $(DOCKER_IMAGE):$(DOCKER_TAG) .

docker-run:
	docker run --rm -d -p 3000:3000 --name $(DOCKER_CONTAINER) $(DOCKER_IMAGE):$(DOCKER_TAG)

docker-shell:
	docker exec -it $(DOCKER_CONTAINER) sh

docker-stop:
	docker stop $(DOCKER_CONTAINER) || true

.PHONY: dev build start lint lint-fix test test-coverage format format-check docker-build docker-run docker-shell docker-stop
