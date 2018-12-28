all: build

build: clean
	go build -o bin/server ./src/**/*.go

clean:
	@rm -r ./bin/ > /dev/null 2>&1

docker-build:
	@rm ./bin/linserver > /dev/null 2>&1
	@GOOS=linux go build -o bin/linserver ./src/**/*.go
	@docker build -t jessewiles/cdots:0.1 .
