const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
console.log(params);

from_input.value = params.from;
to_input.value = params.to;

if (params.trip === "return") {
  trip_output.value = "رفت و برگشت";
  trip_input.value = "return";

  date_output.value = `${new Date(parseInt(params.date.split(" ")[0])).toLocaleDateString("fa-IR").split("/")[2]} ${
    MONTHS[
      ["۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹", "۱۰", "۱۱", "۱۲"].indexOf(
        new Date(parseInt(params.date.split(" ")[0])).toLocaleDateString("fa-IR").split("/")[1]
      )
    ]
  } - ${new Date(parseInt(params.date.split(" ")[1])).toLocaleDateString("fa-IR").split("/")[2]} ${
    MONTHS[
      ["۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹", "۱۰", "۱۱", "۱۲"].indexOf(
        new Date(parseInt(params.date.split(" ")[1])).toLocaleDateString("fa-IR").split("/")[1]
      )
    ]
  }`;
} else {
  trip_output.value = "یک طرفه";
  trip_input.value = "oneway";

  date_output = `${new Date(parseInt(params.date)).toLocaleDateString("fa-IR").split("/")[2]} ${
    MONTHS[
      ["۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹", "۱۰", "۱۱", "۱۲"].indexOf(
        new Date(parseInt(params.date)).toLocaleDateString("fa-IR").split("/")[1]
      )
    ]
  } ${new Date(parseInt(params.date)).toLocaleDateString("fa-IR").split("/")[0]}`;
}

adults.querySelector("input").dataset.value = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"].indexOf(params.adults);
adults.querySelector("input").value = parseInt(adults.querySelector("input").dataset.value).toLocaleString("fa-IR");

child.querySelector("input").dataset.value = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"].indexOf(params.child);
child.querySelector("input").value = parseInt(child.querySelector("input").dataset.value).toLocaleString("fa-IR");

infant.querySelector("input").dataset.value = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"].indexOf(params.infant);
infant.querySelector("input").value = parseInt(infant.querySelector("input").dataset.value).toLocaleString("fa-IR");

passengers_output.value = `${(
  parseInt(adults.querySelector("input").dataset.value) +
  parseInt(child.querySelector("input").dataset.value) +
  parseInt(infant.querySelector("input").dataset.value)
).toLocaleString("fa-IR")} مسافر`;
