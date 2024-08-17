APP_NAME = sortviz
CMD_DIR = cmd/server
BUILD_DIR = bin

all: build run

build:
	go build -o $(BUILD_DIR)/$(APP_NAME) $(CMD_DIR)/main.go

run: build
	$(BUILD_DIR)/$(APP_NAME)

clean:
	rm -rf $(BUILD_DIR)
