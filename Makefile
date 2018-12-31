all: build

build: clean
	@npm rum build
	@go build -o bin/server ./src/**/*.go

clean:
	@mkdir -p bin
	@rm -r ./bin/ > /dev/null 2>&1

test-js:
	@npm test

test-go:
	go test -v src/go/*.go

test: test-js test-go

docker-build:
	@rm ./bin/linserver > /dev/null 2>&1
	@GOOS=linux go build -o bin/linserver ./src/**/*.go
	@docker build -t jessewiles/cdots:0.1 .
