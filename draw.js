const canva = document.getElementById("canva");
const context = canva.getContext("2d");
const eraseButton = document.getElementById("erase");
const drawButton = document.getElementById("draw");
const resultText = document.getElementById("result");
const trackerButton = document.getElementById("tracker");
const trackerText = document.getElementById("trackerText");

class pixel {
  constructor(x, y, lenght) {
    this.x = x;
    this.y = y;
    this.lenght = lenght;
  }
}

let first = null; // premier point
let previous = null; // point précédent
let draw = false; // mode draw activé
let is_a_form = false; // forme terminé
let nbr_points = 0; // nombre de points posés
let tracker = false; // mode tracker activé
let form = [0]; // array sauvegardant tout les points

/**
 * Return a true value if you are in the elemement "elem" when you click on it
 * @param {*} elem> element you want to test
 * @param {*} click> click event
 * @returns bool
 */
//
function inside_element(elem, click) {
  const a = elem.getBoundingClientRect();
  if (
    click.clientX >= a.x &&
    click.clientX <= a.x + a.width &&
    click.clientY >= a.y &&
    click.clientY <= a.y + a.height
  )
    return true;
  return false;
}

/**
 * Return a true value if the point at the coordinates x/y are in the pixel
 * @param {*} pixel> pixel you want to test
 * @param {*} x> x coordinate
 * @param {*} y> y coordinate
 * @returns bool
 */
//
function inside_pixel(pixel, x, y) {
  let margin_error = pixel.lenght / 2;
  if (
    x >= pixel.x - margin_error &&
    x <= pixel.x + pixel.lenght + margin_error &&
    y >= pixel.y - margin_error &&
    y <= pixel.y + pixel.lenght + margin_error
  )
    return true;
  return false;
}

function intersect(x1, y1, x2, y2, y) {
  if ((y1 > y && y2 < y) || (y1 < y && y2 > y)) {
    var x = ((x2 - x1) * (y - y1)) / (y2 - y1) + x1;
    return x;
  }
  return false;
}

function isInside_the_form(x, y, form) {
  let count = 0;
  for (let i = 0; i < form.length - 1; i++) {
    let interpolation = intersect(
      form[i][0],
      form[i][1],
      form[i + 1][0],
      form[i + 1][1],
      y
    );
    if (interpolation !== false && interpolation >= x) {
      count++;
    }
  }
  return count % 2 !== 0;
}

// gestion du bouton draw
drawButton.addEventListener("click", () => {
  if (is_a_form === true) return;
  draw = true;
});

// gestion du bouton erase
eraseButton.addEventListener("click", () => {
  form = [0];
  draw = false;
  is_a_form = false;
  tracker = false;
  previous = null;
  first = null;
  nbr_points = 0;
  context.fillStyle = "#eee";
  context.fillRect(0, 0, 800, 600);
  resultText.innerText = "There is no Form";
  trackerText.innerText = "";
});

// gestion du bouton "tracker"
trackerButton.addEventListener("click", () => {
  if (is_a_form === false) return;
  tracker = true;
});

document.onclick = function (click) {
  if (draw === false) return;
  let lenght = 10;
  if (click === undefined) click = document.click;
  context.fillStyle = "#BADA55";
  context.lineWidth = 10;
  const a = canva.getBoundingClientRect();
  let x = click.clientX - a.x;
  let y = click.clientY - a.y;
  if (inside_element(canva, click) && is_a_form === false) {
    if (previous === null) {
      // création du premier point
      context.fillRect(x - lenght / 2, y - lenght / 2, lenght, lenght);
      first = new pixel(x, y, lenght);
      previous = new pixel(x, y, lenght);
      form.shift();
      form.push([x, y]);
      return;
    } else if (inside_pixel(first, x, y)) {
      if (nbr_points > 2) {
        // création de la forme, fin du draw
        is_a_form = true;
        resultText.innerText = "There is a form";
        context.strokeStyle = "#BADA55";
        context.lineWidth = 10;
        context.beginPath();
        context.moveTo(previous.x, previous.y);
        context.lineTo(first.x, first.y);
        context.stroke();
      } else {
        return;
      }
    } else {
      // liaison du point actuel avec le point dit "previous" (précédent)
      context.strokeStyle = "#BADA55";
      context.lineWidth = 10;
      context.beginPath();
      context.moveTo(x, y);
      context.lineTo(previous.x, previous.y);
      context.stroke();
    }
    // save du point
    form.push([x, y]);
    previous = new pixel(x, y, lenght);
    nbr_points += 1;
  }
  if (tracker === true) {
    // détection de la position du click
    var isInside = isInside_the_form(x, y, form);
    if (isInside) {
      trackerText.innerText = "You are in the form";
    } else {
      trackerText.innerText = "You are not in the form";
    }
  }
};
