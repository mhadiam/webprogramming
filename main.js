const from_input = document.querySelector("#from");
const to_input = document.querySelector("#to");
const swap_button = document.querySelector("#swap");

swap_button.addEventListener("click", () => {
  let x_offset = 0;
  let down = true;

  const step = (timestamp) => {
    from_input.style = `translate: 0px ${x_offset}px`;
    to_input.style = `translate: 0px ${x_offset}px`;

    if (x_offset >= 50) {
      down = false;
      let tmp = from_input.value;
      from_input.value = to_input.value;
      to_input.value = tmp;
    }

    down ? (x_offset += 5) : (x_offset -= 5);

    if (x_offset >= 0) window.requestAnimationFrame(step);
  };

  window.requestAnimationFrame(step);
});
