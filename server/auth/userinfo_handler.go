// claims := jwt.MapClaims{}
// 	token, err := jwt.ParseWithClaims("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoibWFoYWRpQGdtYWlsIn0.C0EyHJgy6n7_QRDvD78hMzzRLdYoEK0QXRzbvhePJAA", claims, func(token *jwt.Token) (interface{}, error) {
// 		return secret, nil
// 	})

// 	if err != nil {
// 		if err == jwt.ErrSignatureInvalid {
// 			// w.WriteHeader(http.StatusUnauthorized)
// 			return
// 		}
// 		// w.WriteHeader(http.StatusBadRequest)
// 		return
// 	}
// 	if !token.Valid {
// 		// w.WriteHeader(http.StatusUnauthorized)
// 		return
// 	}

// 	fmt.Println(claims["user"])

package main
