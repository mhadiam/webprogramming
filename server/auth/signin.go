package main

import (
	"database/sql"
	"encoding/json"
	"net/http"

	"github.com/dgrijalva/jwt-go"
	"golang.org/x/crypto/bcrypt"
)

type t_signin struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type res_signin struct {
	Name     string `json:"name"`
	Lastname string `json:"lastname"`
}

func signin(w http.ResponseWriter, r *http.Request) {

	if r.Method != "POST" {
		http.Error(w, "Method not supported!", http.StatusMethodNotAllowed)
		return
	}

	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
	w.Header().Set("Access-Control-Allow-Credentials", "true")

	var user_info t_signin

	if err := json.NewDecoder(r.Body).Decode(&user_info); err != nil {
		http.Error(w, "Please send correct data!", http.StatusBadRequest)
		return
	}

	db, err := sql.Open("postgres", "host=localhost port=5432 user=postgres password=M11111111h dbname=web sslmode=disable")
	if err != nil {
		http.Error(w, "Internal database error!", http.StatusInternalServerError)
		return
	}
	defer db.Close()

	var email string
	var password string
	var name string
	var last_name string
	row := db.QueryRow(`SELECT email, password_hash, first_name, last_name FROM user_account WHERE email=$1`, user_info.Email)
	err = row.Scan(&email, &password, &name, &last_name)
	switch err {
	case sql.ErrNoRows:
		http.Error(w, "User not found!", http.StatusNotFound)
		return
	case nil:
		if err := bcrypt.CompareHashAndPassword([]byte(password), []byte(user_info.Password)); err != nil {
			http.Error(w, "wrong password", http.StatusForbidden)
			return
		}
	}

	token := jwt.New(jwt.SigningMethodHS256)
	claim := token.Claims.(jwt.MapClaims)
	claim["user"] = email

	token_string, _ := token.SignedString(secret)
	http.SetCookie(w, &http.Cookie{
		Name:  "token",
		Value: token_string,
	})

	var data res_signin
	data.Name = name
	data.Lastname = last_name
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(data)
}
