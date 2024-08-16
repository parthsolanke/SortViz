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
	var data struct {
		Array []int `json:"array"`
	}

	err := json.NewDecoder(r.Body).Decode(&data)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	steps := sorter.BubbleSort(data.Array)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(steps)
}
