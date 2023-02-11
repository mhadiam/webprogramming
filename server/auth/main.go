package main

import (
	"net/http"
)

var secret = []byte("0xepMmZmKq-q4vA3DsQxj9RnjdNtB4sqQ1nznN8ESWQGTe5CyU")

func main() {
	http.HandleFunc("/signup", signup)
	http.HandleFunc("/signin", signin)
	// http.HandleFunc("/signout", signout)
	http.ListenAndServe("localhost:3001", nil)
}
