# SortViz
📶 Visualize sorting algorithms using Go + htmx

### Project structure

```
SortViz/
│
├── cmd/
│   └── server/
│       └── main.go               # Main entry point of the application
│
├── internal/
│   ├── sorter/
│   │   ├── sorter.go             # Sorting logic (different algorithms can be added here)
│   │   └── sorter_test.go        # Unit tests for sorting algorithms
│   └── handler/
│       └── handler.go            # HTTP handlers for sorting and rendering
│
├── web/
│   ├── static/
│   │   └── css/
│   │       └── styles.css        # CSS styles
│   └── templates/
│       └── index.html            # Main HTML template with HTMX integration
│
├── go.mod                        # Go module file
├── go.sum                        # Go dependencies file
└── README.md                     # Project documentation
```

- **cmd/server/main.go**: The entry point for your Go application. This will set up the HTTP server and route handling.

- **internal/sorter/**: 
  - `sorter.go`: Contains the sorting algorithms and logic for collecting steps. This can be extended with different algorithms like quicksort, mergesort, etc.
  - `sorter_test.go`: Contains tests for your sorting functions to ensure correctness.

- **internal/handler/**:
  - `handler.go`: Manages HTTP requests and responses, including rendering the main HTML page and handling sorting requests.

- **web/static/css/styles.css**: (Optional) Contains custom CSS styles to enhance the UI/UX of your sorting visualizer.

- **web/templates/index.html**: The main HTML file using HTMX for dynamic content updating.

- **go.mod** and **go.sum**: Go module files to manage dependencies.

- **README.md**: Documentation for your project, including setup instructions, features, and usage.

This structure separates concerns clearly and makes it easy to extend the project, test individual components, and maintain the codebase.

---

# ![Icon](./web/static/favicon.ico) SortViz

SortViz is a simple web application that visualizes sorting algorithms. It's built using Go for the backend and HTMX for dynamic frontend interactions.

### Features
- Visualizes each step of the sorting process.
- Built with Go and HTMX.
- Extendable with multiple sorting algorithms.

### Prerequisites
- Go 1.20 or later
- Make (optional, for using the Makefile)

### Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/parthsolanke/SortViz.git
    ```
2. Navigate to the project directory:
    ```bash
    cd SortViz
    ```
3. Run the server:
    ```bash
    go run cmd/server/main.go
    ```
4. Open your browser and navigate to `http://localhost:8080`.

### Using the Makefile

#### Building the Project
To compile the Go application and create an executable binary:
```bash
make build
```

#### Running the Project
To build and run the application:
```bash
make run
```

After running, open your browser and navigate to `http://localhost:8080`.

#### Cleaning Up
To remove the generated binary and clean up the build directory:
```bash
make clean
```
## License
This project is licensed under the [MIT License](./LICENSE).
