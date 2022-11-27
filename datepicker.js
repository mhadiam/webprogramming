let start = null;
let end = null;

const print_first_calendar = () => {
  first_calendar_days.forEach((span) => {
    span.removeAttribute("class");
    span.removeAttribute("style");
    span.removeAttribute("data-date");
    span.textContent = "";
  });

  for (
    let i = (8 - (TODAY.date % 7) + TODAY.day) % 7, j = 0;
    i < MONTHS_LENGTH[TODAY.month] + ((8 - (TODAY.date % 7) + TODAY.day) % 7);
    i++, j++
  ) {
    first_calendar_days[i].textContent = (j + 1).toLocaleString("fa-IR");
    let data_date = new Date((j - TODAY.date) * 86400000 + TODAY.gregorian.getTime());
    let start_date = new Date(start ?? 0);
    first_calendar_days[i].setAttribute("data-date", data_date.getTime());
    if (
      j < TODAY.date &&
      TODAY.month ===
        ["۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹", "۱۰", "۱۱", "۱۲"].indexOf(
          new Date().toLocaleDateString("fa-IR").split("/")[1]
        )
    ) {
      first_calendar_days[i].setAttribute("class", "past");
    } else if (
      start !== null &&
      start_date.getMonth() === data_date.getMonth() &&
      start_date.getDate() === data_date.getDate()
    ) {
      first_calendar_days[i].className = "selected";
    }
  }
  if (MONTHS_LENGTH[TODAY.month] + ((8 - (TODAY.date % 7) + TODAY.day) % 7) < 36) {
    first_calendar_days[35].style.display = "none";
    first_calendar_days[36].style.display = "none";
    first_calendar_days[37].style.display = "none";
    first_calendar_days[38].style.display = "none";
    first_calendar_days[39].style.display = "none";
    first_calendar_days[40].style.display = "none";
    first_calendar_days[41].style.display = "none";
  }
};

const print_second_calendar = () => {
  second_calendar_days.forEach((span) => {
    span.removeAttribute("class");
    span.removeAttribute("style");
    span.removeAttribute("data-date");
    span.textContent = "";
  });
  for (
    let i = (8 - (TODAY.date % 7) + TODAY.day) % 7, j = 0;
    i < MONTHS_LENGTH[TODAY.month] + ((8 - (TODAY.date % 7) + TODAY.day) % 7);
    i++, j++
  ) {
    second_calendar_days[i].textContent = (j + 1).toLocaleString("fa-IR");
    let data_date = new Date((j - TODAY.date) * 86400000 + TODAY.gregorian.getTime());
    let start_date = new Date(start ?? 0);
    second_calendar_days[i].setAttribute("data-date", data_date.getTime());
    if (start !== null && start_date.getMonth() === data_date.getMonth() && start_date.getDate() === data_date.getDate()) {
      second_calendar_days[i].className = "selected";
    }
  }
  if (MONTHS_LENGTH[TODAY.month] + ((8 - (TODAY.date % 7) + TODAY.day) % 7) < 36) {
    second_calendar_days[35].style.display = "none";
    second_calendar_days[36].style.display = "none";
    second_calendar_days[37].style.display = "none";
    second_calendar_days[38].style.display = "none";
    second_calendar_days[39].style.display = "none";
    second_calendar_days[40].style.display = "none";
    second_calendar_days[41].style.display = "none";
  }
};

date_output.addEventListener("click", (e) => {
  e.stopPropagation();
  if (calendar.getAttribute("style")) calendar.removeAttribute("style");
  else {
    start = end = null;
    define_today(new Date());
    print_first_calendar();
    define_today(new Date(Date.now() + (MONTHS_LENGTH[TODAY.month] - TODAY.date + 15) * 86400000));
    print_second_calendar();
    calendar_months.forEach((li) => li.removeAttribute("style"));
    calendar_months[0].style = calendar_months[1].style = "font-size: 18px; opacity: 1;";
    if (passengers.getAttribute("style")) {
      passengers.removeAttribute("style");
      setTimeout(() => (calendar.style = "clip-path: inset(0px 0px 0px 0px)"), 150);
    } else {
      calendar.style = "clip-path: inset(0px 0px 0px 0px)";
    }
  }
});

print_first_calendar();
define_today(new Date(Date.now() + (MONTHS_LENGTH[TODAY.month] - TODAY.date + 15) * 86400000));
print_second_calendar();

calendar_months.forEach((li, index) => {
  if (index === 11) index = 10;
  li.addEventListener("click", () => {
    define_today(new Date());
    let tmp = 0;
    for (let i = 0; i < index; i++) {
      i === 0 ? (tmp += MONTHS_LENGTH[TODAY.month] - TODAY.date + 15) : (tmp += MONTHS_LENGTH[(TODAY.month + i) % 12]);
    }
    define_today(new Date(Date.now() + tmp * 86400000));
    print_first_calendar();

    define_today(new Date());
    tmp = 0;
    for (let i = 0; i < index + 1; i++) {
      i === 0 ? (tmp += MONTHS_LENGTH[TODAY.month] - TODAY.date + 15) : (tmp += MONTHS_LENGTH[(TODAY.month + i) % 12]);
    }
    define_today(new Date(Date.now() + tmp * 86400000));
    print_second_calendar();

    calendar_months.forEach((li) => li.removeAttribute("style"));
    calendar_months[index].style = calendar_months[index + 1].style = "font-size: 18px; opacity: 1;";
  });
});

let all_days = [...first_calendar_days, ...second_calendar_days];
all_days.forEach((span) => {
  span.addEventListener("click", () => {
    if (start === null && span.textContent.length && !span.classList.contains("past")) {
      start = parseInt(span.dataset.date);
      if (trip_input.value === "یک طرفه") {
        date_output.value = `${new Date(start).toLocaleDateString("fa-IR").split("/")[2]} ${
          MONTHS[
            ["۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹", "۱۰", "۱۱", "۱۲"].indexOf(
              new Date(start).toLocaleDateString("fa-IR").split("/")[1]
            )
          ]
        } ${new Date(start).toLocaleDateString("fa-IR").split("/")[0]}`;
        date_input.value = start;
        calendar.style = "clip-path: inset(0px 0px 600px 0px)";
      } else span.setAttribute("class", "selected");
    } else if (
      end === null &&
      span.textContent.length &&
      !span.classList.contains("past") &&
      parseInt(span.dataset.date) > start
    ) {
      end = parseInt(span.dataset.date);
      date_output.value = `${new Date(start).toLocaleDateString("fa-IR").split("/")[2]} ${
        MONTHS[
          ["۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹", "۱۰", "۱۱", "۱۲"].indexOf(
            new Date(start).toLocaleDateString("fa-IR").split("/")[1]
          )
        ]
      } - ${new Date(end).toLocaleDateString("fa-IR").split("/")[2]} ${
        MONTHS[
          ["۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹", "۱۰", "۱۱", "۱۲"].indexOf(
            new Date(end).toLocaleDateString("fa-IR").split("/")[1]
          )
        ]
      }`;
      date_input.value = `${start} ${end}`;
      calendar.style = "clip-path: inset(0px 0px 600px 0px)";
    }
  });

  if (span.getAttribute("class") !== "past") {
    span.addEventListener("mouseover", () => {
      let date_key = parseInt(span.dataset.date);
      all_days.forEach((day) => day.classList.remove("include"));
      if (start !== null && date_key > start) {
        for (const day of all_days) {
          let tmp = parseInt(day.dataset.date);
          if (tmp > start && tmp < date_key) {
            day.classList.add("include");
          }
        }
      }
    });
  }
});
