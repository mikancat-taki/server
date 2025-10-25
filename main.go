package main

import (
	"encoding/json"
	"log"
	"net/http"
	"time"
)

func writeJSON(w http.ResponseWriter, v interface{}) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(v)
}

func ping(w http.ResponseWriter, r *http.Request) {
	writeJSON(w, map[string]interface{}{"pong": true, "time": time.Now().UnixNano() / 1e6})
}

func items(w http.ResponseWriter, r *http.Request) {
	writeJSON(w, []map[string]interface{}{
		{"id": 1, "name": "apple"},
		{"id": 2, "name": "banana"},
	})
}

func echo(w http.ResponseWriter, r *http.Request) {
	var data interface{}
	if err := json.NewDecoder(r.Body).Decode(&data); err != nil {
		http.Error(w, "bad json", http.StatusBadRequest)
		return
	}
	writeJSON(w, map[string]interface{}{"received": data, "serverTs": time.Now().UnixNano() / 1e6})
}

func main() {
	http.HandleFunc("/api/ping", ping)
	http.HandleFunc("/api/items", items)
	http.HandleFunc("/api/echo", echo)
	log.Println("Go server listening on :3000")
	log.Fatal(http.ListenAndServe(":3000", nil))
}
