APP_NAME = sortviz
CMD_DIR = cmd/server
BUILD_DIR = bin
TEST_DIR = ./internal/...

all: clean build test run

build:
	@echo "Building the application..."
	go build -o $(BUILD_DIR)/$(APP_NAME) $(CMD_DIR)/main.go

test:
	@echo "Running tests..."
	go test -v $(TEST_DIR)

run: build
	@echo "Running the application..."
	$(BUILD_DIR)/$(APP_NAME)

clean:
	@echo "Cleaning up..."
	rm -rf $(BUILD_DIR)

.PHONY: all build test run clean
