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
