package main

import (
	"SortViz/internal/handler"
	"log"
	"net/http"
)

func main() {
	http.HandleFunc("/", handler.IndexHandler)
	http.HandleFunc("/sort", handler.SortHandler)

	log.Println("Server started at :8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
