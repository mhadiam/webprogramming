const MONTHS = ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"];
const MONTHS_LENGTH = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];
const TODAY = {
  gregorian: null,
  month: null,
  date: null,
  day: null,
};
const depart_input = document.querySelector("#depart");
const calendar = document.querySelector("header>form>main>div:nth-of-type(3)>div");
const calendar_months = document.querySelectorAll("header>form>main>div:nth-of-type(3)>div>ul>li");
const first_calendar = document.querySelector("header>form>main>div:nth-of-type(3)>div>div>div:nth-of-type(1)");
const first_calendar_days = document.querySelectorAll("header>form>main>div:nth-of-type(3)>div>div>div:nth-of-type(1)>span");
const second_calendar = document.querySelector("header>form>main>div:nth-of-type(3)>div>div>div:nth-of-type(2)");
const second_calendar_days = document.querySelectorAll("header>form>main>div:nth-of-type(3)>div>div>div:nth-of-type(2)>span");
let start = null;
let end = null;

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

const print_first_calendar = (current) => {
  first_calendar_days.forEach((span, index) => {
    if (index > 6) {
      span.removeAttribute("class");
      span.removeAttribute("style");
      span.removeAttribute("data-date");
      span.textContent = "";
    }
  });
  for (
    let i = (8 - (TODAY.date % 7) + TODAY.day) % 7, j = 1;
    i < MONTHS_LENGTH[TODAY.month] + ((8 - (TODAY.date % 7) + TODAY.day) % 7);
    i++, j++
  ) {
    first_calendar_days[i + 7].textContent = j.toLocaleString("fa-IR");
    let tmp_date = (j - 1 - TODAY.date) * 86400000 + TODAY.gregorian.getTime();
    first_calendar_days[i + 7].setAttribute("data-date", tmp_date);
    if (Math.abs(tmp_date - start) < 60000) first_calendar_days[i + 7].className = "selected";
    if (j < TODAY.date + 1 && current) {
      first_calendar_days[i + 7].setAttribute("class", "past");
    }
  }
  if (!first_calendar_days[42].textContent.length) {
    first_calendar_days[42].style.display = "none";
    first_calendar_days[43].style.display = "none";
    first_calendar_days[44].style.display = "none";
    first_calendar_days[45].style.display = "none";
    first_calendar_days[46].style.display = "none";
    first_calendar_days[47].style.display = "none";
    first_calendar_days[48].style.display = "none";
  }
};

const print_second_calendar = () => {
  second_calendar_days.forEach((span, index) => {
    if (index > 6) {
      span.removeAttribute("class");
      span.removeAttribute("style");
      span.removeAttribute("data-date");
      span.textContent = "";
    }
  });
  for (
    let i = (8 - (TODAY.date % 7) + TODAY.day) % 7, j = 1;
    i < MONTHS_LENGTH[TODAY.month] + ((8 - (TODAY.date % 7) + TODAY.day) % 7);
    i++, j++
  ) {
    second_calendar_days[i + 7].textContent = j.toLocaleString("fa-IR");
    let tmp_date = (j - 1 - TODAY.date) * 86400000 + TODAY.gregorian.getTime();
    second_calendar_days[i + 7].setAttribute("data-date", tmp_date);
    if (Math.abs(tmp_date - start) < 60000) second_calendar_days[i + 7].className = "selected";
  }
  if (!second_calendar_days[42].textContent.length) {
    second_calendar_days[42].style.display = "none";
    second_calendar_days[43].style.display = "none";
    second_calendar_days[44].style.display = "none";
    second_calendar_days[45].style.display = "none";
    second_calendar_days[46].style.display = "none";
    second_calendar_days[47].style.display = "none";
    second_calendar_days[48].style.display = "none";
  }
};

define_today(new Date());
depart_input.value = `${new Date().toLocaleDateString("fa-IR").split("/")[2]} ${
  MONTHS[
    ["۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹", "۱۰", "۱۱", "۱۲"].indexOf(
      new Date().toLocaleDateString("fa-IR").split("/")[1]
    )
  ]
} ${new Date().toLocaleDateString("fa-IR").split("/")[0].slice(-2)}`;

depart_input.addEventListener("click", () => {
  if (calendar.className) {
    calendar.removeAttribute("class");
    setTimeout(() => {
      calendar.style = "clip-path: inset(0px 0px 0px 0px)";
    }, 0);
  } else {
    start = null;
    calendar.style = "clip-path: inset(0px 0px 600px 0px)";

    setTimeout(() => {
      calendar.className = "hide";
    }, 500);
  }
});

for (let i = 0; i < 12; i++) {
  calendar_months[i].textContent = MONTHS[(TODAY.month + i) % 12];
}
print_first_calendar(true);
define_today(new Date(Date.now() + MONTHS_LENGTH[TODAY.month] * 86400000));
print_second_calendar();

calendar_months.forEach((li, index) => {
  if (index === 11) index = 10;
  li.addEventListener("click", () => {
    define_today(new Date());
    let tmp = 0;
    for (let i = 0; i < index; i++) tmp += MONTHS_LENGTH[(TODAY.month + i) % 12];
    define_today(new Date(Date.now() + tmp * 86400000));
    index === 0 ? print_first_calendar(true) : print_first_calendar(false);
    define_today(new Date());
    tmp = 0;
    for (let i = 0; i < index + 1; i++) tmp += MONTHS_LENGTH[(TODAY.month + i) % 12];
    define_today(new Date(Date.now() + tmp * 86400000));
    print_second_calendar();

    calendar_months.forEach((li) => li.removeAttribute("style"));
    calendar_months[index].style = "font-size: 18px; opacity: 1;";
    calendar_months[index + 1].style = "font-size: 18px; opacity: 1;";
  });
});

let tmp_days = [...[...first_calendar_days].slice(7, 49), ...[...second_calendar_days].slice(7, 49)];
tmp_days.forEach((span) => {
  span.addEventListener("click", () => {
    if (start === null) {
      span.setAttribute("class", "selected");
      start = parseInt(span.getAttribute("data-date"));
    } else if (end === null) {
      span.setAttribute("class", "selected");
      end = parseInt(span.getAttribute("data-date"));
      calendar.style = "clip-path: inset(0px 0px 600px 0px)";

      setTimeout(() => {
        calendar.className = "hide";
      }, 500);
    } else {
      tmp_days.forEach((s) => {
        s.classList.remove("selected");
        s.classList.remove("include");
        start = end = null;
      });
      span.setAttribute("class", "selected");
      start = parseInt(span.getAttribute("data-date"));
    }
  });

  span.getAttribute("class") !== "past" &&
    span.addEventListener("mouseover", () => {
      if (end === null) {
        let date_key = parseInt(span.getAttribute("data-date"));
        if (start !== null && date_key > start) {
          tmp_days.forEach((e) => e.classList.remove("include"));
          for (const day of tmp_days) {
            let tmp = parseInt(day.getAttribute("data-date"));
            if (tmp > start && tmp < date_key) {
              day.classList.add("include");
            }
          }
        }
      }
    });
});
