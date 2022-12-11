const from_input = document.querySelector("#from-input");
const from_results = document.querySelector("header>form>main>div:first-of-type>ul:first-of-type");
const to_input = document.querySelector("#to-input");
const to_results = document.querySelector("header>form>main>div:first-of-type>ul:last-of-type");
const swap_button = document.querySelector("#swap");
const trip_output = document.querySelector("#trip-output");
const trip_input = document.querySelector("#trip-input");
const depart_label = document.querySelector("#depart-label");
const date_output = document.querySelector("#date-output");
const date_input = document.querySelector("#date");
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
const passengers_output = document.querySelector("#passengers-output");
const passengers = document.querySelector("header>form>main>div:nth-of-type(4)>div");
const adults = document.querySelector("header>form>main>div:nth-of-type(4)>div>span:nth-of-type(1)");
const child = document.querySelector("header>form>main>div:nth-of-type(4)>div>span:nth-of-type(2)");
const infant = document.querySelector("header>form>main>div:nth-of-type(4)>div>span:nth-of-type(3)");
const cards = document.querySelectorAll("section article>figure");

const MONTHS = ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"];
const MONTHS_LENGTH = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];
const TODAY = {
  gregorian: null,
  month: null,
  date: null,
  day: null,
};

window.addEventListener("scroll", () => {
  if (this.scrollY > 60) {
    if (this.scrollY > window.innerWidth / 3 + (window.innerWidth / 15 - 60))
      document.querySelector("header").removeAttribute("class");
    else document.querySelector("header").className = "backblur";
  } else document.querySelector("header").removeAttribute("class");
});

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
  document.querySelector("header>form>main>div:first-of-type").style = "overflow: hidden";
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

    y_offset >= 0
      ? window.requestAnimationFrame(step)
      : document.querySelector("header>form>main>div:first-of-type").removeAttribute("style");
  };

  window.requestAnimationFrame(step);
});

from_input.addEventListener("input", () => {
  from_results.innerHTML = "";
  if (from_input.value.length > 1) {
    let results = [];
    search_results.forEach((e) => {
      if (
        (to_input.value.length === 0 && e.from.includes(from_input.value) && !results.some((li) => li.innerText === e.from)) ||
        (to_input.value.length > 0 &&
          e.from.includes(from_input.value) &&
          e.to.includes(to_input.value) &&
          !results.some((li) => li.innerText === e.from))
      ) {
        from_results.innerHTML = "";
        let li = document.createElement("li");
        li.innerText = e.from;
        li.addEventListener("click", () => {
          from_input.value = e.from;
          from_results.innerHTML = "";
        });
        results.push(li);
      }
    });
    results.forEach((li) => from_results.appendChild(li));
  }
});

to_input.addEventListener("input", () => {
  to_results.innerHTML = "";
  if (to_input.value.length > 1) {
    let results = [];
    search_results.forEach((e) => {
      if (
        (from_input.value.length === 0 && e.to.includes(to_input.value) && !results.some((li) => li.innerText === e.to)) ||
        (from_input.value.length > 0 &&
          e.to.includes(to_input.value) &&
          e.from.includes(from_input.value) &&
          !results.some((li) => li.innerText === e.to))
      ) {
        to_results.innerHTML = "";
        let li = document.createElement("li");
        li.innerText = e.to;
        li.addEventListener("click", () => {
          to_input.value = e.to;
          to_results.innerHTML = "";
        });
        results.push(li);
      }
    });
    results.forEach((li) => to_results.appendChild(li));
  }
});

trip_output.addEventListener("click", () => {
  let y_offset = 0;
  let down = true;

  const step = (timestamp) => {
    trip_output.style = `translate: 0px ${y_offset}px`;

    if (y_offset >= 50) {
      down = false;
      if (trip_output.value === "یک طرفه") {
        trip_output.value = "رفت و برگشت";
        trip_input.value = "return";
        date_output.value = `${new Date(parseInt(date_input.value)).toLocaleDateString("fa-IR").split("/")[2]} ${
          MONTHS[
            ["۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹", "۱۰", "۱۱", "۱۲"].indexOf(
              new Date(parseInt(date_input.value)).toLocaleDateString("fa-IR").split("/")[1]
            )
          ]
        } - ${new Date(parseInt(date_input.value) + 86400000 * 7).toLocaleDateString("fa-IR").split("/")[2]} ${
          MONTHS[
            ["۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹", "۱۰", "۱۱", "۱۲"].indexOf(
              new Date(parseInt(date_input.value) + 86400000 * 7).toLocaleDateString("fa-IR").split("/")[1]
            )
          ]
        }`;
        date_input.value = `${date_input.value} ${parseInt(date_input.value) + 86400000 * 7}`;
      } else {
        trip_output.value = "یک طرفه";
        trip_input.value = "oneway";
        date_output.value = `${new Date(parseInt(date_input.value.split(" ")[0])).toLocaleDateString("fa-IR").split("/")[2]} ${
          MONTHS[
            ["۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹", "۱۰", "۱۱", "۱۲"].indexOf(
              new Date(parseInt(date_input.value.split(" ")[0])).toLocaleDateString("fa-IR").split("/")[1]
            )
          ]
        } ${new Date(parseInt(date_input.value.split(" ")[0])).toLocaleDateString("fa-IR").split("/")[0]}`;
        date_input.value = date_input.value.split(" ")[0];
      }
    }

    down ? (y_offset += 5) : (y_offset -= 5);

    y_offset >= 0 && window.requestAnimationFrame(step);
  };

  window.requestAnimationFrame(step);
});

date_output.value = `${new Date().toLocaleDateString("fa-IR").split("/")[2]} ${
  MONTHS[
    ["۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹", "۱۰", "۱۱", "۱۲"].indexOf(
      new Date().toLocaleDateString("fa-IR").split("/")[1]
    )
  ]
} ${new Date().toLocaleDateString("fa-IR").split("/")[0]}`;

date_input.value = new Date().getTime();

define_today(new Date());
for (let i = 0; i < 12; i++) {
  calendar_months[i].textContent = MONTHS[(TODAY.month + i) % 12];
}

passengers_output.addEventListener("click", (e) => {
  e.stopPropagation();
  if (passengers.getAttribute("style")) passengers.removeAttribute("style");
  else if (calendar.getAttribute("style")) {
    calendar.removeAttribute("style");
    setTimeout(() => (passengers.style = "clip-path: inset(0px 0px 0px 0px)"), 250);
  } else {
    passengers.style = "clip-path: inset(0px 0px 0px 0px)";
  }
});

document.body.addEventListener("click", () => {
  calendar.removeAttribute("style");
  passengers.removeAttribute("style");
});

calendar.addEventListener("click", (e) => e.stopPropagation());

passengers.addEventListener("click", (e) => e.stopPropagation());

adults.querySelectorAll("button").forEach((button, index) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    if (index === 0) {
      if (parseInt(adults.querySelector("input").dataset.value) < 9) {
        adults.querySelector("input").value = (parseInt(adults.querySelector("input").dataset.value) + 1).toLocaleString(
          "fa-IR"
        );
        adults.querySelector("input").dataset.value = parseInt(adults.querySelector("input").dataset.value) + 1;
        passengers_output.value = `${(
          parseInt(adults.querySelector("input").dataset.value) +
          parseInt(child.querySelector("input").dataset.value) +
          parseInt(infant.querySelector("input").dataset.value)
        ).toLocaleString("fa-IR")} مسافر`;
      }
    } else if (parseInt(adults.querySelector("input").dataset.value) > 1) {
      adults.querySelector("input").value = (parseInt(adults.querySelector("input").dataset.value) - 1).toLocaleString("fa-IR");
      adults.querySelector("input").dataset.value = parseInt(adults.querySelector("input").dataset.value) - 1;
      passengers_output.value = `${(
        parseInt(adults.querySelector("input").dataset.value) +
        parseInt(child.querySelector("input").dataset.value) +
        parseInt(infant.querySelector("input").dataset.value)
      ).toLocaleString("fa-IR")} مسافر`;
    }
  });
});

adults.querySelector("input").addEventListener("input", (e) => {
  e.currentTarget.value = e.currentTarget.value.replace(/(?![۰-۹])./gim, "");
  const input = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"].indexOf(e.currentTarget.value);
  e.currentTarget.dataset.value = input >= 1 ? input : "1";
  passengers_output.value = `${(
    parseInt(adults.querySelector("input").dataset.value) +
    parseInt(child.querySelector("input").dataset.value) +
    parseInt(infant.querySelector("input").dataset.value)
  ).toLocaleString("fa-IR")} مسافر`;
});

child.querySelectorAll("button").forEach((button, index) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    if (index === 0) {
      if (parseInt(child.querySelector("input").dataset.value) < 9) {
        child.querySelector("input").value = (parseInt(child.querySelector("input").dataset.value) + 1).toLocaleString("fa-IR");
        child.querySelector("input").dataset.value = parseInt(child.querySelector("input").dataset.value) + 1;
        passengers_output.value = `${(
          parseInt(adults.querySelector("input").dataset.value) +
          parseInt(child.querySelector("input").dataset.value) +
          parseInt(infant.querySelector("input").dataset.value)
        ).toLocaleString("fa-IR")} مسافر`;
      }
    } else {
      if (parseInt(child.querySelector("input").dataset.value) > 0) {
        child.querySelector("input").value = (parseInt(child.querySelector("input").dataset.value) - 1).toLocaleString("fa-IR");
        child.querySelector("input").dataset.value = parseInt(child.querySelector("input").dataset.value) - 1;
        passengers_output.value = `${(
          parseInt(adults.querySelector("input").dataset.value) +
          parseInt(child.querySelector("input").dataset.value) +
          parseInt(infant.querySelector("input").dataset.value)
        ).toLocaleString("fa-IR")} مسافر`;
      }
    }
  });
});

child.querySelector("input").addEventListener("input", (e) => {
  e.currentTarget.value = e.currentTarget.value.replace(/(?![۰-۹])./gim, "");
  const input = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"].indexOf(e.currentTarget.value);
  e.currentTarget.dataset.value = input >= 0 ? input : "0";
  passengers_output.value = `${(
    parseInt(adults.querySelector("input").dataset.value) +
    parseInt(child.querySelector("input").dataset.value) +
    parseInt(infant.querySelector("input").dataset.value)
  ).toLocaleString("fa-IR")} مسافر`;
});

infant.querySelectorAll("button").forEach((button, index) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    if (index === 0) {
      if (parseInt(infant.querySelector("input").dataset.value) < 9) {
        infant.querySelector("input").value = (parseInt(infant.querySelector("input").dataset.value) + 1).toLocaleString(
          "fa-IR"
        );
        infant.querySelector("input").dataset.value = parseInt(infant.querySelector("input").dataset.value) + 1;
        passengers_output.value = `${(
          parseInt(adults.querySelector("input").dataset.value) +
          parseInt(child.querySelector("input").dataset.value) +
          parseInt(infant.querySelector("input").dataset.value)
        ).toLocaleString("fa-IR")} مسافر`;
      }
    } else {
      if (parseInt(infant.querySelector("input").dataset.value) > 0) {
        infant.querySelector("input").value = (parseInt(infant.querySelector("input").dataset.value) - 1).toLocaleString(
          "fa-IR"
        );
        infant.querySelector("input").dataset.value = parseInt(infant.querySelector("input").dataset.value) - 1;
        passengers_output.value = `${(
          parseInt(adults.querySelector("input").dataset.value) +
          parseInt(child.querySelector("input").dataset.value) +
          parseInt(infant.querySelector("input").dataset.value)
        ).toLocaleString("fa-IR")} مسافر`;
      }
    }
  });
});

infant.querySelector("input").addEventListener("input", (e) => {
  e.currentTarget.value = e.currentTarget.value.replace(/(?![۰-۹])./gim, "");
  const input = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"].indexOf(e.currentTarget.value);
  e.currentTarget.dataset.value = input >= 0 ? input : "0";
  passengers_output.value = `${(
    parseInt(adults.querySelector("input").dataset.value) +
    parseInt(child.querySelector("input").dataset.value) +
    parseInt(infant.querySelector("input").dataset.value)
  ).toLocaleString("fa-IR")} مسافر`;
});

cards.forEach((figure) => {
  figure.addEventListener("mousemove", (e) => {
    let w = figure.getBoundingClientRect().width;
    let h = figure.getBoundingClientRect().height;
    let x = e.clientX - (figure.getBoundingClientRect().left + w / 2);
    let y = -(e.clientY - (figure.getBoundingClientRect().top + h / 2));
    figure.querySelector("img").style = `transform: rotate3d(${y}, ${x}, 0, ${
      (Math.sqrt(x ** 2 + y ** 2) / Math.sqrt(h ** 2 / 4 + w ** 2 / 4)) * 10
    }deg)`;
  });

  figure.addEventListener("mouseout", () => {
    figure.querySelector("img").removeAttribute("style");
  });
});
