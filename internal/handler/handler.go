package handler

import (
	"encoding/json"
	"html/template"
	"net/http"

	"github.com/parthsolanke/SortViz/internal/sorter"
)

func IndexHandler(w http.ResponseWriter, r *http.Request) {
	tmpl := template.Must(template.ParseFiles("web/templates/index.html"))
	tmpl.Execute(w, nil)
}

func SortHandler(w http.ResponseWriter, r *http.Request) {
	// Example array; you can replace this with user input.
	// array := []int{ 22, 11, 90}
	array := []int{
		42, 17, 8, 63, 29,
		55, 91, 33, 76, 48,
		11, 54, 27, 85, 39,
		70, 23, 64, 51, 7,
		64, 34, 25, 12, 22,
	}

	steps := sorter.BubbleSort(array)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(steps)
}
