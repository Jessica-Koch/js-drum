const canvas = document.querySelector('#draw');

// need to draw on teh context of the canvas, so must get the context
// 
const ctx = canvas.getContext('2d');

// make it the size of teh window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.strokeStyle = '#BADA55';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 10;
// ctx.globalCompositeOperation = 'xor';
// ctx.globalCompositeOperation = 'multiply';
// ctx.globalCompositeOperation = 'screen';
// ctx.globalCompositeOperation = 'darken';
// ctx.globalCompositeOperation = 'lighten';
// ctx.globalCompositeOperation = 'hard-light';
ctx.globalCompositeOperation = 'soft-light';
// ctx.globalCompositeOperation = 'difference';
// ctx.globalCompositeOperation = 'exclusion';
// ctx.globalCompositeOperation = 'color';
// ctx.globalCompositeOperation = 'luminosity';

// when you click element, it only draws when cursor is engaged
let isDrawing = false;
let hue = 0;
// creates a starting x and y and a last one 
let lastX = 0;
let lastY = 0;
let direction = true;

function draw(e){
    if (!isDrawing) {
        // stop function from running if mouse isn't down
        return;
    }
    ctx.strokeStyle = `hsl(${hue++}, 100%, 50%)`;
    // start from
    ctx.beginPath();
    // go to
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();

    if (hue > 360) {
        hue = 0;
    }

    if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
        direction = !direction;
    }

    if (direction) {
        ctx.lineWidth++;
    } else {
        ctx.lineWidth--;
    }

    // lastX = e.offsetX;
    // lastY = e.offsetY;
    // in ES6 :
    [lastX, lastY] = [e.offsetX, e.offsetY];
}

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);

