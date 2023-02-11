document.querySelector("h1>span:first-of-type").addEventListener("click", (e) => {
  if (e.currentTarget.parentElement.getAttribute("class")) e.currentTarget.parentElement.removeAttribute("class");
  document.querySelector("form button").textContent = "ورود";

  document.querySelectorAll(".registeronly").forEach((input) => {
    input.disabled = true;
    input.style = "opacity: 0.5";
  });
});

document.querySelector("h1>span:last-of-type").addEventListener("click", (e) => {
  if (!e.currentTarget.parentElement.getAttribute("class")) e.currentTarget.parentElement.setAttribute("class", "register");
  document.querySelector("form button").textContent = "ثبت نام";

  document.querySelectorAll(".registeronly").forEach((input) => {
    input.disabled = false;
    input.removeAttribute("style");
  });
});

document.querySelector("button").addEventListener("click", (e) => {
  e.preventDefault();
  let form_data = {};
  if (document.querySelector("form").checkValidity()) {
    new FormData(e.currentTarget.parentElement).forEach((value, key) => (form_data[key] = value));

    if (e.currentTarget.textContent !== "ورود") {
      fetch(`http://127.0.0.1:3001/signup`, {
        method: "POST",
        body: JSON.stringify(form_data),
        credentials: "include",
      }).then((res) => {
        if (res.ok) {
          localStorage.setItem("name", document.querySelector('input[name="name"]').value);
          localStorage.setItem("lastname", document.querySelector('input[name="lastname"]').value);
          location.href = "/";
        } else {
          alert("کاربر وجود دارد. لطفا وارد شوید.");
          document.querySelector("h1>span:first-of-type").click();
        }
      });
    } else {
      fetch(`http://127.0.0.1:3001/signin`, {
        method: "POST",
        body: JSON.stringify(form_data),
        credentials: "include",
      }).then((res) => {
        if (res.ok) {
          res.json().then((val) => {
            localStorage.setItem("name", val["name"]);
            localStorage.setItem("lastname", val["lastname"]);
            location.href = "/";
          });
        } else {
          if (res.status === 404) {
            alert("کاربر وجود ندارد!");
          } else if (res.status === 403) {
            alert("رمز عبور اشتباه است!");
          }
        }
      });
    }
  }
});
