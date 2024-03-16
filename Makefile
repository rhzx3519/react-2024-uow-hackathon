SHELL=/bin/bash

.PHONY: build run clean prune

docker=
arch=
build:
	sh build.sh $(docker) $(arch)

push:
	docker push rhzx3519/react-2024-uow-hackathon

run: clean
	docker-compose up -d --force-recreate

clean:
	docker-compose down
	docker-compose rm -f

prune:
	docker system prune --all --force --volumes