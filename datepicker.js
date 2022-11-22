const MONTHS = ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"];
const MONTHS_LENGTH = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];
const TODAY = {
  gregorian: new Date(),
  month: ["۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹", "۱۰", "۱۱", "۱۲"].indexOf(
    new Date().toLocaleDateString("fa-IR").split("/")[1]
  ),
  date: [
    "۱",
    "۲",
    "۳",
    "۴",
    "۵",
    "۶",
    "۷",
    "۸",
    "۹",
    "۱۰",
    "۱۱",
    "۱۲",
    "۱۳",
    "۱۴",
    "۱۵",
    "۱۶",
    "۱۷",
    "۱۸",
    "۱۹",
    "۲۰",
    "۲۱",
    "۲۲",
    "۲۳",
    "۲۴",
    "۲۵",
    "۲۶",
    "۲۷",
    "۲۸",
    "۲۹",
    "۳۰",
    "۳۱",
  ].indexOf(new Date().toLocaleDateString("fa-IR").split("/")[2]),
  day: new Date().getDay(),
};

const define_today = (date) => {
  TODAY.gregorian = date;
  TODAY.month = ["۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹", "۱۰", "۱۱", "۱۲"].indexOf(
    date.toLocaleDateString("fa-IR").split("/")[1]
  );
  TODAY.date = [
    "۱",
    "۲",
    "۳",
    "۴",
    "۵",
    "۶",
    "۷",
    "۸",
    "۹",
    "۱۰",
    "۱۱",
    "۱۲",
    "۱۳",
    "۱۴",
    "۱۵",
    "۱۶",
    "۱۷",
    "۱۸",
    "۱۹",
    "۲۰",
    "۲۱",
    "۲۲",
    "۲۳",
    "۲۴",
    "۲۵",
    "۲۶",
    "۲۷",
    "۲۸",
    "۲۹",
    "۳۰",
    "۳۱",
  ].indexOf(date.toLocaleDateString("fa-IR").split("/")[2]);
  TODAY.day = date.getDay();
};

const print_first_calendar = () => {
  const first_calendar = calendar.querySelector("div>div:nth-of-type(1)");
  const first_calendar_days = first_calendar.querySelectorAll("div>span");
  for (
    let i = (8 - (TODAY.date % 7) + TODAY.day) % 7, j = 1;
    i < MONTHS_LENGTH[TODAY.month] + ((8 - (TODAY.date % 7) + TODAY.day) % 7);
    i++, j++
  ) {
    first_calendar_days[i + 7].textContent = j.toLocaleString("fa-IR");
    first_calendar_days[i + 7].setAttribute("data-date", (j - 1 - TODAY.date) * 86400000 + TODAY.gregorian.getTime());
    if (j < TODAY.date + 1) {
      first_calendar_days[i + 7].setAttribute("class", "past");
    }
  }

  if (!first_calendar_days[42].textContent.length) {
    first_calendar_days[42].remove();
    first_calendar_days[43].remove();
    first_calendar_days[44].remove();
    first_calendar_days[45].remove();
    first_calendar_days[46].remove();
    first_calendar_days[47].remove();
    first_calendar_days[48].remove();
  }
};

const print_second_calendar = () => {
  const second_calendar = calendar.querySelector("div>div:nth-of-type(2)");
  const second_calendar_days = second_calendar.querySelectorAll("div>span");
  for (
    let i = (8 - (TODAY.date % 7) + TODAY.day) % 7, j = 1;
    i < MONTHS_LENGTH[TODAY.month] + ((8 - (TODAY.date % 7) + TODAY.day) % 7);
    i++, j++
  ) {
    second_calendar_days[i + 7].textContent = j.toLocaleString("fa-IR");
    second_calendar_days[i + 7].setAttribute("data-date", (j - 1 - TODAY.date) * 86400000 + TODAY.gregorian.getTime());
  }

  if (!second_calendar_days[42].textContent.length) {
    second_calendar_days[42].remove();
    second_calendar_days[43].remove();
    second_calendar_days[44].remove();
    second_calendar_days[45].remove();
    second_calendar_days[46].remove();
    second_calendar_days[47].remove();
    second_calendar_days[48].remove();
  }
};

const depart_input = document.querySelector("#depart");
depart_input.setAttribute(
  "value",
  `${new Date().toLocaleDateString("fa-IR").split("/")[2]} ${
    MONTHS[
      ["۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹", "۱۰", "۱۱", "۱۲"].indexOf(
        new Date().toLocaleDateString("fa-IR").split("/")[1]
      )
    ]
  } ${new Date().toLocaleDateString("fa-IR").split("/")[0].slice(-2)}`
);

const calendar = document.querySelector("header>form>main>div:nth-of-type(3)>div");
const first_calendar_months = calendar.querySelectorAll("ul>li");
for (let i = 0; i < 12; i++) {
  first_calendar_months[i].textContent = MONTHS[(TODAY.month + i) % 12];
}

print_first_calendar();
define_today(new Date(Date.now() + MONTHS_LENGTH[TODAY.month] * 86400000));
print_second_calendar();
