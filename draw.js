const canva = document.getElementById("canva");
const context = canva.getContext("2d");
const eraseButton = document.getElementById("erase");
const drawButton = document.getElementById("draw");
const resultText = document.getElementById("result");
const trackerButton = document.getElementById("tracker");
const trackerText = document.getElementById("trackerText");

class Square {
  constructor(x, y, lenght) {
    this.x = x;
    this.y = y;
    this.lenght = lenght;
  }
}

let first_point = null; // first point of the form
let previous_point = null; // first point of the form
let is_drawing = false; // drawing mod
let is_a_form = false; // form is finished
let tracker = false; // tracker mod
let form = []; // array with every points

function draw_line(point_one_x, point_one_y, point_two_x, point_two_y) {
  context.beginPath();
  context.moveTo(point_one_x, point_one_y);
  context.lineTo(point_two_x, point_two_y);
  context.stroke();
}

//
// BUTTONS HANDLER
//

// draw button management
drawButton.addEventListener("click", () => {
  if (is_a_form === true) return;
  is_drawing = true;
});

// erase button management
eraseButton.addEventListener("click", () => {
  form = [];
  is_drawing = false;
  is_a_form = false;
  tracker = false;
  previous_point = null;
  first_point = null;
  context.fillStyle = "#eee";
  context.fillRect(0, 0, 800, 600);
  resultText.innerText = "There is no Form";
  trackerText.innerText = "";
});

// "tracker" button management
trackerButton.addEventListener("click", () => {
  if (is_a_form === false) return;
  if (tracker === false) tracker = true;
  else {
    tracker = false;
    trackerText.innerText = "";
  }
});

//
// MAIN FUNCTION
//

document.onclick = function (click) {
  if (is_drawing === false) return;
  let lenght = 10;
  if (click === undefined) click = document.click;
  context.fillStyle = "#BADA55";
  context.strokeStyle = "#BADA55";
  context.lineWidth = 10;
  const a = canva.getBoundingClientRect();
  let x = click.clientX - a.x;
  let y = click.clientY - a.y;
  if (is_inside_element(canva, click) && is_a_form === false) {
    if (previous_point === null) {
      // creation of the first point
      context.fillRect(x - lenght / 2, y - lenght / 2, lenght, lenght);
      first_point = new Square(x, y, lenght);
      previous_point = new Square(x, y, lenght);
      form.push([x, y]);
      return;
    } else if (is_inside_point(first_point, x, y)) {
      if (form.length > 2) {
        // creation of the form, end of the draw
        is_a_form = true;
        resultText.innerText = "There is a form";
        draw_line(
          first_point.x,
          first_point.y,
          previous_point.x,
          previous_point.y
        );
      } else {
        return;
      }
    } else {
      // linking the current point to the "previous" point (previous)
      draw_line(x, y, previous_point.x, previous_point.y);
    }
    // point backup
    form.push([x, y]);
    previous_point = new Square(x, y, lenght);
  }
};

document.onmousemove = function (mouse) {
  if (tracker === false) return;

  if (mouse === undefined) mouse = document.mouse;
  // mouse position detection
  if (!is_inside_element(canva, mouse)) {
    trackerText.innerText = "You are not in the Canva";
  } else {
    const a = canva.getBoundingClientRect();
    let x = mouse.clientX - a.x;
    let y = mouse.clientY - a.y;
    var isInside = is_inside_the_form(x, y, form);
    if (isInside) {
      trackerText.innerText = "You are in the form";
    } else {
      trackerText.innerText = "You are not in the form";
    }
  }
};
