install:
	npm ci

test:
	cd dist && npm  test

build:
	docker build -t todo-app:latest ./

docker-login:
	echo "${DOCKER_PASSWORD}" | docker login -u "${DOCKER_USERNAME}" --password-stdin "${DOCKER_REGISTRY}"

docker-push:
	docker push "${secrets.DOCKER_REGISTRY}/todo-app"

deploy:
	docker-compose -f docker-compose.yml up --build	