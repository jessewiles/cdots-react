DOCKER_TAG=latest

all: build

build: clean
	@npm run build
	@go build -o bin/server ./src/**/*.go

clean:
	-rm -r ./bin/ > /dev/null 2>&1

eslint:
	@node_modules/eslint/bin/eslint.js src/js

test-js:
	@npm test

test-go:
	go test -v src/go/*.go

test: eslint test-js test-go

docker-build:
	-rm ./bin/linserver > /dev/null 2>&1
	@npm run build
	@GOOS=linux GOARCH=amd64 go build -o bin/linserver ./src/**/*.go
	@docker build -t jessewiles/cdots:latest .

docker-deploy:
	docker tag jessewiles/cdots:latest jessewiles/cdots:$(DOCKER_TAG)
	docker push jessewiles/cdots:$(DOCKER_TAG)
	docker push jessewiles/cdots:latest
