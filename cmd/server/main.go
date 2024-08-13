package main

import (
	"log"
	"net/http"

	"github.com/parthsolanke/SortViz/internal/handler"
)

func main() {
	// serve static files from the "web/static" directory
	fs := http.FileServer(http.Dir("web/static"))
	http.Handle("/static/", http.StripPrefix("/static/", fs))

	http.HandleFunc("/", handler.IndexHandler)
	http.HandleFunc("/sort", handler.SortHandler)

	log.Println("Server started at :8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
