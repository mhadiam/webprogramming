const from_input = document.querySelector("#from");
const to_input = document.querySelector("#to");
const swap_button = document.querySelector("#swap");
const trip_input = document.querySelector("#trip");
const MONTHS = ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"];
const MONTHS_LENGTH = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];
const TODAY = {
  gregorian: null,
  month: null,
  date: null,
  day: null,
};
const depart_label = document.querySelector("#depart-label");
const depart_input = document.querySelector("#depart");
const return_input = document.querySelector("#return");
const calendar = document.querySelector("header>form>main>div:nth-of-type(3)>div");
const calendar_months = document.querySelectorAll("header>form>main>div:nth-of-type(3)>div>ul>li");
const first_calendar = document.querySelector("header>form>main>div:nth-of-type(3)>div>div>div:nth-of-type(1)");
const first_calendar_days = document.querySelectorAll(
  "header>form>main>div:nth-of-type(3)>div>div>div:nth-of-type(1)>span:nth-of-type(n + 8)"
);
const second_calendar = document.querySelector("header>form>main>div:nth-of-type(3)>div>div>div:nth-of-type(2)");
const second_calendar_days = document.querySelectorAll(
  "header>form>main>div:nth-of-type(3)>div>div>div:nth-of-type(2)>span:nth-of-type(n + 8)"
);

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

swap_button.addEventListener("click", () => {
  let y_offset = 0;
  let down = true;

  const step = (timestamp) => {
    from_input.style = `translate: 0px ${y_offset}px`;
    to_input.style = `translate: 0px ${y_offset}px`;

    if (y_offset >= 50) {
      down = false;
      let tmp = from_input.value;
      from_input.value = to_input.value;
      to_input.value = tmp;
    }

    down ? (y_offset += 5) : (y_offset -= 5);

    y_offset >= 0 && window.requestAnimationFrame(step);
  };

  window.requestAnimationFrame(step);
});

trip_input.addEventListener("click", () => {
  let y_offset = 0;
  let down = true;

  const step = (timestamp) => {
    trip_input.style = `translate: 0px ${y_offset}px`;

    if (y_offset >= 50) {
      down = false;
      if (trip_input.value === "یک طرفه") {
        trip_input.value = "رفت و برگشت";
        depart_input.className = "return";
        depart_label.className = "return";
        setTimeout(() => (depart_label.textContent = "رفت و برگشت"), 150);
        depart_input.value = `${new Date(parseInt(return_input.value)).toLocaleDateString("fa-IR").split("/")[2]} ${
          MONTHS[
            ["۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹", "۱۰", "۱۱", "۱۲"].indexOf(
              new Date(parseInt(return_input.value)).toLocaleDateString("fa-IR").split("/")[1]
            )
          ]
        } - ${new Date(parseInt(return_input.value) + 86400000 * 7).toLocaleDateString("fa-IR").split("/")[2]} ${
          MONTHS[
            ["۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹", "۱۰", "۱۱", "۱۲"].indexOf(
              new Date(parseInt(return_input.value) + 86400000 * 7).toLocaleDateString("fa-IR").split("/")[1]
            )
          ]
        }`;
        return_input.value = `${return_input.value} ${parseInt(return_input.value) + 86400000 * 7}`;
      } else {
        trip_input.value = "یک طرفه";
        depart_label.textContent = "رفت";
        depart_input.removeAttribute("class");
        depart_label.removeAttribute("class");
        depart_input.value = `${
          new Date(parseInt(return_input.value.split(" ")[0])).toLocaleDateString("fa-IR").split("/")[2]
        } ${
          MONTHS[
            ["۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹", "۱۰", "۱۱", "۱۲"].indexOf(
              new Date(parseInt(return_input.value.split(" ")[0])).toLocaleDateString("fa-IR").split("/")[1]
            )
          ]
        } ${new Date(parseInt(return_input.value.split(" ")[0])).toLocaleDateString("fa-IR").split("/")[0]}`;
        return_input.value = return_input.value.split(" ")[0];
      }
    }

    down ? (y_offset += 5) : (y_offset -= 5);

    y_offset >= 0 && window.requestAnimationFrame(step);
  };

  window.requestAnimationFrame(step);
});

depart_input.value = `${new Date().toLocaleDateString("fa-IR").split("/")[2]} ${
  MONTHS[
    ["۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹", "۱۰", "۱۱", "۱۲"].indexOf(
      new Date().toLocaleDateString("fa-IR").split("/")[1]
    )
  ]
} ${new Date().toLocaleDateString("fa-IR").split("/")[0]}`;

return_input.value = new Date().getTime();

define_today(new Date());
for (let i = 0; i < 12; i++) {
  calendar_months[i].textContent = MONTHS[(TODAY.month + i) % 12];
}

document.body.addEventListener("click", () => calendar.removeAttribute("style"));

calendar.addEventListener("click", (e) => e.stopPropagation());
