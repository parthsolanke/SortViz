package handler

import (
	"SortViz/internal/sorter"
	"encoding/json"
	"html/template"
	"net/http"
)

func IndexHandler(w http.ResponseWriter, r *http.Request) {
	tmpl := template.Must(template.ParseFiles("web/templates/index.html"))
	tmpl.Execute(w, nil)
}

func SortHandler(w http.ResponseWriter, r *http.Request) {
	// Example array; you can replace this with user input.
	array := []int{5, 3, 8, 4, 2}

	steps := sorter.BubbleSort(array)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(steps)
}
