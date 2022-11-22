const from_input = document.querySelector("#from");
const to_input = document.querySelector("#to");
const swap_button = document.querySelector("#swap");
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

const trip_input = document.querySelector("#trip");
trip_input.addEventListener("click", () => {
  let y_offset = 0;
  let down = true;

  const step = (timestamp) => {
    trip_input.style = `translate: 0px ${y_offset}px`;

    if (y_offset >= 50) {
      down = false;
      if (trip_input.value === "یک طرفه") trip_input.value = "رفت و برگشت";
      else trip_input.value = "یک طرفه";
    }

    down ? (y_offset += 5) : (y_offset -= 5);

    y_offset >= 0 && window.requestAnimationFrame(step);
  };

  window.requestAnimationFrame(step);
});