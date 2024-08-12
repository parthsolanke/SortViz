# Variables
APP_NAME = sorting-visualizer
CMD_DIR = cmd/server
BUILD_DIR = bin

# Default target to build and run the application
all: build

# Build the Go application
build:
	go build -o $(BUILD_DIR)/$(APP_NAME) $(CMD_DIR)/main.go

# Run the application
run: build
	$(BUILD_DIR)/$(APP_NAME)

# Clean up the build artifacts
clean:
	rm -rf $(BUILD_DIR)

.PHONY: all build run clean
