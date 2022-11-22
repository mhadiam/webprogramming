const MONTH = ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"];

const depart_input = document.querySelector("#depart");
depart_input.setAttribute(
  "value",
  `${new Date().toLocaleDateString("fa-IR").split("/")[2]} ${
    MONTH[
      ["۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹", "۱۰", "۱۱", "۱۲"].indexOf(
        new Date().toLocaleDateString("fa-IR").split("/")[1]
      )
    ]
  } ${new Date().toLocaleDateString("fa-IR").split("/")[0].slice(-2)}`
);

const calendar = document.querySelector("header>form>main>div:nth-of-type(3)>div");
const months_calendar = calendar.querySelectorAll("ul>li");
for (let i = 0; i < 12; i++) {
  months_calendar[i].textContent =
    MONTH[
      (["۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹", "۱۰", "۱۱", "۱۲"].indexOf(
        new Date().toLocaleDateString("fa-IR").split("/")[1]
      ) +
        i) %
        12
    ];
}
const days_calendar = calendar.querySelectorAll("div>span");
for (let i = 7; i < 42; i++) {
  days_calendar[i].textContent = (i - 6).toLocaleString("fa-IR");
}
