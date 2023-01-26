const from_input = document.querySelector("header>form>main>div:first-of-type>input:first-of-type");
const from_results = document.querySelector("header>form>main>div:first-of-type>ul:first-of-type");
const to_input = document.querySelector("header>form>main>div:first-of-type>input:last-of-type");
const to_results = document.querySelector("header>form>main>div:first-of-type>ul:last-of-type");
const swap_dest_button = document.querySelector("header>form>main>div:first-of-type>button");

const trip_output = document.querySelector("header>form>main>div:nth-of-type(2)>output");
const trip_input = document.querySelector("header>form>main>div:nth-of-type(2)>input");

const date_output = document.querySelector("header>form>main>div:nth-of-type(3)>output");
const date_input = document.querySelector("header>form>main>div:nth-of-type(3)>input");

const calendar_months = document.querySelectorAll("header>form>main>div:nth-of-type(3)>div>ul>li");
let calendar_days = [...document.querySelectorAll("header>form>main>div:nth-of-type(3)>div>div>span")].splice(7);

const passengers_output = document.querySelector("header>form>main>div:nth-of-type(4)>output");
const adults = document.querySelector("header>form>main>div:nth-of-type(4)>div>span:nth-of-type(1)");
const child = document.querySelector("header>form>main>div:nth-of-type(4)>div>span:nth-of-type(2)");
const infant = document.querySelector("header>form>main>div:nth-of-type(4)>div>span:nth-of-type(3)");

const cards = document.querySelectorAll("section figure");

let start = null;
let end = null;

// Which month we are at then sort months from now
const months = ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"];
let month_offset;
switch (new Date().toLocaleDateString("fa-IR", { year: "numeric", month: "long", day: "numeric" }).split(" ")[1]) {
  case "فروردین":
    month_offset = 1;
    break;
  case "اردیبهشت":
    month_offset = 2;
    break;
  case "خرداد":
    month_offset = 3;
    break;
  case "تیر":
    month_offset = 4;
    break;
  case "مرداد":
    month_offset = 5;
    break;
  case "شهریور":
    month_offset = 6;
    break;
  case "مهر":
    month_offset = 7;
    break;
  case "آبان":
    month_offset = 8;
    break;
  case "آذر":
    month_offset = 9;
    break;
  case "دی":
    month_offset = 10;
    break;
  case "بهمن":
    month_offset = 11;
    break;
  case "اسفند":
    month_offset = 12;
    break;
  default:
    month_offset = 1;
    break;
}
for (let i = 1; i < month_offset; i++) {
  let tmp = months.shift();
  months.push(tmp);
}
for (let i = 0; i < 12; i++) {
  calendar_months[i].textContent = months[i];
}

// calendar days from now until next year
const calendar = [];
for (
  let i = 0, j = 0;
  i <=
  365 -
    parseInt(
      new Date()
        .toLocaleDateString("fa-IR")
        .split("/")[2]
        .replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d))
    );
  i++
) {
  let tmp = new Date(Date.now() + i * 86400000);
  if (i > 0) {
    if (
      parseInt(
        tmp
          .toLocaleDateString("fa-IR")
          .split("/")[2]
          .replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d))
      ) < calendar[i - 1].month_day
    )
      j++;
  }

  calendar.push({
    value: tmp.getTime(),
    month_day: parseInt(
      tmp
        .toLocaleDateString("fa-IR")
        .split("/")[2]
        .replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d))
    ),
    month: months[j],
    week_day: (tmp.getDay() + 1) % 7,
  });
}

start = calendar[0].value;

function draw_calendar(month) {
  calendar_days.forEach((span) => {
    span.textContent = "";
    span.removeAttribute("class");
    const newspan = span.cloneNode(true);
    span.parentElement.replaceChild(newspan, span);
  });
  calendar_days = [...document.querySelectorAll("header>form>main>div:nth-of-type(3)>div>div>span")].splice(7);

  const current_month_days = calendar.filter((e) => e.month === month);
  for (let i = 0; i < current_month_days[0].week_day + 1 - current_month_days[0].month_day; i++) {
    calendar_days[i].className = "empty";
    calendar_days[i].textContent = "";
  }

  for (let i = current_month_days[0].week_day + 1 - current_month_days[0].month_day; i < current_month_days[0].week_day; i++) {
    calendar_days[i].className = "past";
    calendar_days[i].textContent = (i + 1).toLocaleString("fa-IR");
  }

  for (let i = current_month_days.length + current_month_days[0].week_day; i < calendar_days.length; i++) {
    calendar_days[i].className = "empty";
    calendar_days[i].textContent = "";
  }

  for (let i = current_month_days[0].week_day; i < current_month_days.length + current_month_days[0].week_day; i++) {
    calendar_days[i].textContent = current_month_days[i - current_month_days[0].week_day].month_day.toLocaleString("fa-IR");

    if (start !== null && current_month_days[i - current_month_days[0].week_day].value === start)
      calendar_days[i].className = "start";

    calendar_days[i].addEventListener("click", ({ currentTarget: span }) => {
      if (start === null) {
        start = current_month_days[i - current_month_days[0].week_day].value;
        span.className = "start";

        if (trip_input.value === "oneway") {
          date_output.value = new Date(start).toLocaleDateString("fa-IR", { year: "numeric", month: "long", day: "numeric" });
          date_input.value = start;
          document.querySelector("header>form>main>div:nth-of-type(3)>div").removeAttribute("style");
        }
      } else {
        if (current_month_days[i - current_month_days[0].week_day].value > start) {
          end = current_month_days[i - current_month_days[0].week_day].value;
          date_output.innerHTML = `${new Date(start).toLocaleDateString("fa-IR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })} <br> ${new Date(end).toLocaleDateString("fa-IR", { year: "numeric", month: "long", day: "numeric" })}`;
          date_input.value = start + " " + end;
          span.className = "end";
          document.querySelector("header>form>main>div:nth-of-type(3)>div").removeAttribute("style");
        }
      }
    });

    calendar_days[i].addEventListener("mouseover", () => {
      if (start !== null && current_month_days[i - current_month_days[0].week_day].value >= start) {
        for (let j = current_month_days[0].week_day; j < current_month_days.length + current_month_days[0].week_day; j++) {
          if (current_month_days[j - current_month_days[0].week_day].value > start)
            if (
              current_month_days[j - current_month_days[0].week_day].value <
              current_month_days[i - current_month_days[0].week_day].value
            )
              calendar_days[j].className = "include";
            else if (
              current_month_days[j - current_month_days[0].week_day].value ===
              current_month_days[i - current_month_days[0].week_day].value
            )
              calendar_days[j].className = "end";
            else if (calendar_days[j].className === "include" || calendar_days[j].className === "end")
              calendar_days[j].removeAttribute("class");
        }
      }
    });
  }

  if (calendar_days[35].textContent.length === 0)
    document.querySelector("header>form>main>div:nth-of-type(3)>div>div").className = "mini";
  else document.querySelector("header>form>main>div:nth-of-type(3)>div>div").removeAttribute("class");
}

document.body.addEventListener("click", () => {
  document.querySelector("header>form>main>div:nth-of-type(3)>div").removeAttribute("style");
  document.querySelector("header>form>main>div:nth-of-type(4)>div").removeAttribute("style");
});

document.querySelector("header").style = `background-position: center ${window.scrollY}px`;
document.addEventListener("scroll", () => {
  document.querySelector("header").style = `background-position: center ${window.scrollY}px`;
  if (window.scrollY > window.innerWidth * 0.4) {
    document.querySelector("header>form>main>div:nth-of-type(3)>div").removeAttribute("style");
    document.querySelector("header>form>main>div:nth-of-type(4)>div").removeAttribute("style");
  }
});

swap_dest_button.addEventListener("click", (e) => {
  if (!e.currentTarget.parentElement.style.overflow) e.currentTarget.parentElement.style = "overflow: hidden";
  let y_offset = 0;
  let down = true;

  const step = () => {
    from_input.style = `translate: 0px ${y_offset}px`;
    to_input.style = `translate: 0px ${y_offset}px`;

    if (y_offset >= 50) {
      down = false;
      let tmp = from_input.value;
      from_input.value = to_input.value;
      to_input.value = tmp;
    }

    down ? (y_offset += 5) : (y_offset -= 5);
    y_offset >= 0 ? window.requestAnimationFrame(step) : e.currentTarget.parentElement.removeAttribute("style");
  };

  window.requestAnimationFrame(step);
});

from_input.addEventListener("input", () => {
  from_results.innerHTML = "";
  let results = [];
  if (from_input.value.length >= 1) {
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
  } else {
    search_results.forEach((e) => {
      if (to_input.value.length === 0) {
        if (!results.some((li) => li.innerText === e.from)) {
          from_results.innerHTML = "";
          let li = document.createElement("li");
          li.innerText = e.from;
          li.addEventListener("click", () => {
            from_input.value = e.from;
            from_results.innerHTML = "";
          });
          results.push(li);
        }
      } else {
        if (e.to.includes(to_input.value) && !results.some((li) => li.innerText === e.from)) {
          from_results.innerHTML = "";
          let li = document.createElement("li");
          li.innerText = e.from;
          li.addEventListener("click", () => {
            from_input.value = e.from;
            from_results.innerHTML = "";
          });
          results.push(li);
        }
      }
    });
  }
  results.forEach((li) => from_results.appendChild(li));
});

to_input.addEventListener("input", () => {
  to_results.innerHTML = "";
  let results = [];
  if (to_input.value.length >= 1) {
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
  } else {
    search_results.forEach((e) => {
      if (from_input.value.length === 0) {
        if (!results.some((li) => li.innerText === e.to)) {
          to_results.innerHTML = "";
          let li = document.createElement("li");
          li.innerText = e.to;
          li.addEventListener("click", () => {
            to_input.value = e.to;
            to_results.innerHTML = "";
          });
          results.push(li);
        }
      } else {
        if (e.from.includes(from_input.value) && !results.some((li) => li.innerText === e.to)) {
          from_results.innerHTML = "";
          let li = document.createElement("li");
          li.innerText = e.from;
          li.addEventListener("click", () => {
            to_input.value = e.from;
            to_results.innerHTML = "";
          });
          results.push(li);
        }
      }
    });
  }
  results.forEach((li) => to_results.appendChild(li));
});

trip_output.addEventListener("click", () => {
  let y_offset = 0;
  let down = true;

  const step = () => {
    trip_output.style = `translate: 0px ${y_offset}px`;

    if (y_offset >= 50) {
      down = false;

      if (trip_input.value === "oneway") {
        trip_output.value = "دو طرفه";
        trip_input.value = "return";

        if (start !== null) {
          date_output.innerHTML = `${new Date(start).toLocaleDateString("fa-IR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })} <br> ${new Date(start + 7 * 86400000).toLocaleDateString("fa-IR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}`;
          date_input.value = start + " " + (start + 7 * 86400000);
        } else {
          date_output.innerHTML = `${new Date(calendar[0].value).toLocaleDateString("fa-IR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })} <br> ${new Date(calendar[6].value).toLocaleDateString("fa-IR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}`;
          date_input.value = calendar[0].value + " " + calendar[6].value;
        }
      } else {
        trip_output.value = "یک طرفه";
        trip_input.value = "oneway";

        if (start !== null) {
          date_output.value = new Date(start).toLocaleDateString("fa-IR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });
          date_input.value = start;
        } else {
          date_output.value = new Date(calendar[0].value).toLocaleDateString("fa-IR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });
          date_input.value = calendar[0].value;
        }
      }
    }

    down ? (y_offset += 5) : (y_offset -= 5);
    y_offset >= 0 && window.requestAnimationFrame(step);
  };

  window.requestAnimationFrame(step);
});

date_output.addEventListener("click", (e) => {
  e.stopPropagation();
  if (document.querySelector("header>form>main>div:nth-of-type(3)>div").getAttribute("style"))
    document.querySelector("header>form>main>div:nth-of-type(3)>div").removeAttribute("style");
  else {
    start = end = null;
    calendar_days.forEach((span) => {
      if (span.className === "start" || span.className === "end" || span.className === "include") span.removeAttribute("class");
    });

    if (document.querySelector("header>form>main>div:nth-of-type(4)>div").getAttribute("style")) {
      document.querySelector("header>form>main>div:nth-of-type(4)>div").removeAttribute("style");
      setTimeout(() => {
        document.querySelector("header>form>main>div:nth-of-type(3)>div").style =
          "pointer-events: auto; clip-path: inset(0px 0px 0px 0px)";
      }, 150);
    } else {
      document.querySelector("header>form>main>div:nth-of-type(3)>div").style =
        "pointer-events: auto; clip-path: inset(0px 0px 0px 0px)";
    }
  }
});

date_output.value = new Date(calendar[0].value).toLocaleDateString("fa-IR", { year: "numeric", month: "long", day: "numeric" });
date_input.value = calendar[0].value;
draw_calendar(months[0]);

calendar_months.forEach((li) => {
  li.addEventListener("click", () => {
    calendar_months.forEach((other) => other.removeAttribute("style"));
    li.style = "font-size: 18px; opacity: 1;";
    draw_calendar(li.textContent);
  });
});

calendar_days[0].parentElement.addEventListener("mouseleave", () => {
  if (end === null) {
    for (const d of calendar_days) {
      if (d.className === "include") d.removeAttribute("class");
    }
  }
});

document.querySelector("header>form>main>div:nth-of-type(3)>div").addEventListener("click", (e) => e.stopPropagation());

passengers_output.addEventListener("click", (e) => {
  e.stopPropagation();
  if (document.querySelector("header>form>main>div:nth-of-type(4)>div").getAttribute("style"))
    document.querySelector("header>form>main>div:nth-of-type(4)>div").removeAttribute("style");
  else if (document.querySelector("header>form>main>div:nth-of-type(3)>div").getAttribute("style")) {
    document.querySelector("header>form>main>div:nth-of-type(3)>div").removeAttribute("style");
    setTimeout(
      () =>
        (document.querySelector("header>form>main>div:nth-of-type(4)>div").style =
          "pointer-events: auto; clip-path: inset(0px 0px 0px 0px)"),
      250
    );
  } else {
    document.querySelector("header>form>main>div:nth-of-type(4)>div").style =
      "pointer-events: auto; clip-path: inset(0px 0px 0px 0px)";
  }
});

document.querySelector("header>form>main>div:nth-of-type(4)>div").addEventListener("click", (e) => e.stopPropagation());

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
  figure.addEventListener("mouseenter", (e) => {
    let w = figure.getBoundingClientRect().width;
    let h = figure.getBoundingClientRect().height;
    let x = e.clientX - (figure.getBoundingClientRect().left + w / 2);
    let y = -(e.clientY - (figure.getBoundingClientRect().top + h / 2));
    let degree = (Math.sqrt(x ** 2 + y ** 2) / Math.sqrt(h ** 2 / 4 + w ** 2 / 4)) * 10;
    let increase = degree / 20;
    let start_degree = 0;
    figure.className = "disable";

    let interval = setInterval(() => {
      if (start_degree > degree) {
        clearInterval(interval);
        figure.removeAttribute("class");
      } else {
        let scale = 1 - (0.1 * (start_degree + increase)) / degree;
        figure.querySelector("img").style = `transform: scale(${scale < 0.9 ? 0.9 : scale}) rotate3d(${y}, ${x}, 0, ${
          start_degree + increase
        }deg);`;
        start_degree += increase;
      }
    }, 5);
  });

  figure.addEventListener("mousemove", (e) => {
    if (figure.className === "disable") return;

    let w = figure.getBoundingClientRect().width;
    let h = figure.getBoundingClientRect().height;
    let x = e.clientX - (figure.getBoundingClientRect().left + w / 2);
    let y = -(e.clientY - (figure.getBoundingClientRect().top + h / 2));

    figure.querySelector("img").style = `transform: scale(0.9) rotate3d(${y}, ${x}, 0, ${
      (Math.sqrt(x ** 2 + y ** 2) / Math.sqrt(h ** 2 / 4 + w ** 2 / 4)) * 10
    }deg);`;
  });

  figure.addEventListener("mouseleave", () => {
    let rotation = /scale\(.*\) rotate3d\((\-?\d+\.?\d*), (\-?\d+\.?\d*), (\-?\d+\.?\d*), (.*)deg\)/.exec(
      figure.querySelector("img").style.transform
    );
    let degree = rotation[4];
    let decrease = degree / 10;
    let scale = 0.9;

    let interval = setInterval(() => {
      if (degree < 0) {
        figure.querySelector("img").removeAttribute("style");
        clearInterval(interval);
      } else {
        figure.querySelector("img").style = `transform: scale(${scale + 0.0101 > 1 ? 1 : scale + 0.0101}) rotate3d(${
          rotation[1]
        }, ${rotation[2]}, ${rotation[3]}, ${degree - decrease}deg)`;
        degree -= decrease;
        scale += 0.0101;
      }
    }, 10);
  });
});
