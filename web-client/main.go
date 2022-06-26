package main

import "net/http"

func main() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "client/dist/index.html")
	})

	http.Handle("/js/", http.FileServer(http.Dir("client/dist")))
	http.Handle("/assets/", http.FileServer(http.Dir("client/dist")))

	http.ListenAndServe(":3000", nil)
}
