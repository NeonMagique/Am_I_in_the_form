const my_canva = document.getElementById("canva");
const context = my_canva.getContext("2d");

class pixel {
    constructor(x, y, lenght){
        this.x = x;
        this.y = y;
        this.lenght = lenght;
    }
}

let previous = null;
function inside_element(elem, click) {
    const a = elem.getBoundingClientRect();
    if (click.clientX >= a.x && click.clientX <= a.x + a.width && click.clientY >= a.y && click.clientY <= a.y + a.height)
        return true;
    return false;
}

document.onclick = function(click) {
    let lenght = 10;
	if (click === undefined)
        click = document.click;
    context.fillStyle = "#BADA55";
    const a = my_canva.getBoundingClientRect();
    if (inside_element(my_canva, click)) {
        let x = click.clientX - a.x;
        let y = click.clientY - a.y;
        if (previous === null) {
            // création du premier point
            context.fillRect(x  - lenght / 2, y - lenght / 2, lenght, lenght);
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
        previous = new pixel(x, y, lenght);
    }
};
