package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/dgrijalva/jwt-go"
	"github.com/go-redis/redis"
)

type authorization_token struct {
	Token string
}

func signout(w http.ResponseWriter, r *http.Request) {

	if r.Method != "POST" {
		http.Error(w, "Method not supported!", http.StatusMethodNotAllowed)
		return
	}

	db, err := sql.Open("postgres", "host=localhost port=5432 user=postgres password=M11111111h dbname=web sslmode=disable")
	if err != nil {
		http.Error(w, "Internal database error!", http.StatusInternalServerError)
		return
	}
	defer db.Close()

	claims := jwt.MapClaims{}
	user_token, err := r.Cookie("token")
	if err != nil {
		http.Error(w, "Token not provided!", http.StatusUnauthorized)
		return
	}
	token, err := jwt.ParseWithClaims(user_token.Value, claims, func(token *jwt.Token) (interface{}, error) {
		return secret, nil
	})

	if err != nil {
		if err == jwt.ErrSignatureInvalid {
			http.Error(w, "", http.StatusForbidden)
			return
		}
		http.Error(w, "", http.StatusForbidden)
		return
	}
	if !token.Valid {
		http.Error(w, "Token is not valid!", http.StatusUnauthorized)
		return
	}

	var user_id int
	row := db.QueryRow(`SELECT user_id FROM user_account WHERE email=$1`, claims["user"])
	err = row.Scan(&user_id)
	if err != nil {
		http.Error(w, "User not found!", http.StatusNotFound)
		return
	}

	_, err = db.Exec(`INSERT INTO unauthorized_token (user_id, token, expiration) VALUES ($1, $2, $3)`, user_id, user_token.Value, "2026-06-22 19:10:25-07")
	if err != nil {
		fmt.Println("here: ", err)
		http.Error(w, "Can't logout!", http.StatusInternalServerError)
		return
	}

	client := redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "",
		DB:       0,
	})

	json, _ := json.Marshal(authorization_token{Token: user_token.Value})
	if email, ok := claims["user"].(string); ok {
		val, err := client.Get(email).Result()
		fmt.Println("before: ", val, err)
		client.Set(email, json, 0)
		val, err = client.Get(email).Result()
		if err != nil {
			fmt.Println("after error: ", err)
		} else {
			fmt.Println("after sucess: ", val)
		}
	}
}
