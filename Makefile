all: build

build: clean
	@npm rum build
	@go build -o bin/server ./src/**/*.go

clean:
	@mkdir -p bin
	@rm -r ./bin/ > /dev/null 2>&1

eslint:
	@node_modules/eslint/bin/eslint.js src/js

test-js:
	@npm test

test-go:
	go test -v src/go/*.go

test: eslint test-js test-go

docker-build:
	@rm ./bin/linserver > /dev/null 2>&1
	@GOOS=linux go build -o bin/linserver ./src/**/*.go
	@docker build -t jessewiles/cdots:0.1 .
