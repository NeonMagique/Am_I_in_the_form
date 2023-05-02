/**
 * @brief Return a true value if you are in the elemement "elem" when you click on it
 * @param elem> element you want to test
 * @param click> click event
 * @returns >bool
 */
function is_inside_element(elem, click) {
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
 * @brief Return a true value if the click at the coordinates x/y are in the point
 * @param point> you want to test
 * @param x> x coordinate of the click
 * @param y> y coordinate of the click
 * @returns >bool
 */
function is_inside_point(point, x, y) {
  let margin_error = point.lenght;
  if (
    x >= point.x - margin_error &&
    x <= point.x + point.lenght + margin_error &&
    y >= point.y - margin_error &&
    y <= point.y + point.lenght + margin_error
  )
    return true;
  return false;
}

/**
 * @brief Return a value if the y horizontal line is intersecting by the line point_one_x/point_one_y -> point_two_x/point_two_y
 * @param point_one_x> x coordinate of the _point  point line
 * @param point_one_y> y coordinate of the first point line
 * @param point_two_x> x coordinate of the second  point line
 * @param point_two_y> y coordinate of the second point line
 * @param y> y coordinate of the horizontal line
 * @returns >bool
 */
function is_intersecting(
  point_one_x,
  point_one_y,
  point_two_x,
  point_two_y,
  y
) {
  // check if the straight line cuts the horizontal line of the y-point
  if (
    (point_one_y > y && point_two_y < y) ||
    (point_one_y < y && point_two_y > y)
  ) {
    // calculates linear interpolation
    var x =
      ((point_two_x - point_one_x) * (y - point_one_y)) /
        (point_two_y - point_one_y) +
      point_one_x;
    return x;
  }
  return false;
}

/**
 * @brief Return a true value if the point at the coordinates x/y are in the form
 * @param x> x coordinate
 * @param y> y coordinate
 * @param form>  array of each points
 * @returns >bool
 */
function is_inside_the_form(x, y, form) {
  let count = 0;
  for (let i = 0; i < form.length - 1; i++) {
    let interpolation = is_intersecting(
      form[i][0],
      form[i][1],
      form[i + 1][0],
      form[i + 1][1],
      y
    );
    // if interpolation is different from false && interpolation is greater than the x coordinate, the counter increases
    if (interpolation !== false && interpolation >= x) {
      count++;
    }
  }
  // if the counter is odd, then we are in the form
  return count % 2 !== 0;
}
