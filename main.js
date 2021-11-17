const canvas = document.getElementById("basketball-map");
const ctx = canvas.getContext("2d");

function init() {
    drawCircle(100, 50)
    drawCourt(250, 75)

}
init()

function drawCircle(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, 2 * Math.PI);
    ctx.strokeStyle = 'red';
    ctx.stroke();
}

function drawCourt(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, 65, Math.PI / 2, 3 * Math.PI / 2);
    ctx.strokeStyle = 'black';
    ctx.stroke();
}