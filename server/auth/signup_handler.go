package main

import (
	"database/sql"
	"encoding/json"
	"net/http"

	"github.com/dgrijalva/jwt-go"
	_ "github.com/lib/pq"
	"golang.org/x/crypto/bcrypt"
)

type t_signup struct {
	Email    string `json:"email"`
	Password string `json:"password"`
	Name     string `json:"name"`
	Lastname string `json:"lastname"`
	Phone    string `json:"phone"`
	Gender   string `json:"gender"`
}

func signup(w http.ResponseWriter, r *http.Request) {

	if r.Method != "POST" {
		http.Error(w, "Method not supported!", http.StatusMethodNotAllowed)
		return
	}

	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
	w.Header().Set("Access-Control-Allow-Credentials", "true")

	var user_info t_signup

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

	hashed_password, _ := bcrypt.GenerateFromPassword([]byte(user_info.Password), 8)
	_, err = db.Exec(`INSERT INTO user_account (email, phone_number, gender, first_name, last_name, password_hash) VALUES ($1, $2, $3, $4, $5, $6)`, user_info.Email, user_info.Phone, user_info.Gender, user_info.Name, user_info.Lastname, string(hashed_password))
	if err != nil {
		http.Error(w, "User exists already!", http.StatusBadRequest)
	}

	token := jwt.New(jwt.SigningMethodHS256)
	claim := token.Claims.(jwt.MapClaims)
	claim["user"] = user_info.Email

	token_string, _ := token.SignedString(secret)
	http.SetCookie(w, &http.Cookie{
		Name:  "token",
		Value: token_string,
	})
}
