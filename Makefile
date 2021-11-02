.PHONY: clean

clean:
	rm -rf ./dist

docker.run: docker.network docker.app-komentory

docker.network:
	docker network inspect dev-network >/dev/null 2>&1 || \
	docker network create -d bridge dev-network

docker.app-komentory.build:
	docker build -t app-komentory .

docker.app-komentory: docker.app-komentory.build
	docker run --rm -d \
		--name dev-app-komentory \
		--network dev-network \
		-p 80:80 \
		app-komentory

docker.stop: docker.stop.app-komentory

docker.stop.app-komentory:
	docker stop dev-app-komentory