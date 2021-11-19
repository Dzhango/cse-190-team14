const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d')

const offense_player1 = new Image()
offense_player1.src = "ball.png"
const offense_player2 = new Image()
offense_player2.src = "offense.png"
const offense_player3 = new Image()
offense_player3.src = "offense.png"

const offense_player4 = new Image()
offense_player4.src = "offense.png"

const offense_player5 = new Image()
offense_player5.src = "offense.png"

const defense_player1 = new Image()
defense_player1.src = "defense.png"

const defense_player2 = new Image()
defense_player2.src = "defense.png"

const defense_player3 = new Image()
defense_player3.src = "defense.png"

const defense_player4 = new Image()
defense_player4.src = "defense.png"

const defense_player5 = new Image()
defense_player5.src = "defense.png"

let offense = [{ img: offense_player1, x: 0, y: 0 }, { img: offense_player2, x: 0, y: 0 }, { img: offense_player3, x: 0, y: 0 }, { img: offense_player4, x: 0, y: 0 }, { img: offense_player5, x: 0, y: 0 }]
let defense = [defense_player1, defense_player2, defense_player3, defense_player4, defense_player5]



// variables used to get mouse position on the canvas
var $canvas = $("#canvas");
var canvasOffset = $canvas.offset();
var offsetX = canvasOffset.left;
var offsetY = canvasOffset.top;
var scrollX = $canvas.scrollLeft();
var scrollY = $canvas.scrollTop();

// variables to save last mouse position
// used to see how far the user dragged the mouse
// and then move the text by that distance
var startX;
var startY;

// some text objects
var players = [];

for (let i = 0; i < 10; i++) {
    players.push({
        x: 20 + i * 10,
        y: 20
    })
}

// // some test texts
players.push({
    text: "Hello",
    x: 20,
    y: 20
});
players.push({
    text: "World",
    x: 20,
    y: 70
});

// calculate width of each text for hit-testing purposes
// ctx.font = "16px verdana";
// for (var i = 0; i < players.length; i++) {
//     var players = players[i];
//     players.width = ctx.

//     ctx.fill(text.text).width;
//     text.height = 16;
// }

// this var will hold the index of the selected text
var selectedImage = -1;

// START: draw all texts to the canvas
init();

function init() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < 5; i++) {
        offense[i].img.onload = function() {
            offense[i].x += i * 50
            offense[i].y += i * 50
            ctx.drawImage(offense[i].img, offense[i].x, offense[i].y);
        };
        // defense[i].onload = function() {
        //     ctx.drawImage(defense[i], 500 + i * 50, 500 + i * 20);
        // };
    }

}


// clear the canvas draw all texts
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < 5; i++) {
        // offense[i].img.onload = function() {
        ctx.drawImage(offense[i].img, offense[i].x, offense[i].y);
        // };
        // defense[i].onload = function() {
        //     ctx.drawImage(defense[i], 500 + i * 50, 500 + i * 20);
        // };
    }

}

// function move(X, Y) {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);

//     for (let i = 0; i < 5; i++) {
//         offense[i].onload = function() {
//             ctx.drawImage(offense[i].img, 100 + i * 50, 100 + i * 20);
//         };
//         defense[i].onload = function() {
//             ctx.drawImage(defense[i], 500 + i * 50, 500 + i * 20);
//         };
//     }

// }

// test if x,y is inside the bounding box of texts[textIndex]
function textHittest(x, y, imgIndex) {
    var offensive = offense[imgIndex];
    // var defensive = defense[imgIndex];
    console.log(`x: ${x}, y: ${y}; xOffense:${offensive.x}, yOffense: ${offensive.y}`)

    return (x >= offensive.x && x <= offensive.x + 50 && y >= offensive.y - 60 && y <= offensive.y + 60)
        // ||
        // (x >= defensive.x && x <= defensive.x + defensive.width && y >= defensive.y - defensive.height && y <= defdefensiveense.y);
}

// handle mousedown events
// iterate through texts[] and see if the user
// mousedown'ed on one of them
// If yes, set the selectedText to the index of that text
function handleMouseDown(e) {
    e.preventDefault();
    startX = parseInt(e.clientX - offsetX);
    startY = parseInt(e.clientY - offsetY);
    console.log(`${startX}, ${startY}`)
        // Put your mousedown stuff here
    for (var i = 0; i < offense.length; i++) {
        if (textHittest(startX, startY, i)) {
            console.log('true')
            selectedImage = i;
        }
    }
}

// done dragging
function handleMouseUp(e) {
    e.preventDefault();
    selectedImage = -1;

}

// also done dragging
function handleMouseOut(e) {
    e.preventDefault();
    selectedImage = -1;
}

// handle mousemove events
// calc how far the mouse has been dragged since
// the last mousemove event and move the selected text
// by that distance
function handleMouseMove(e) {
    if (selectedImage < 0) {
        console.log('mouse')
        return;
    }
    console.log('mousemouve')
    e.preventDefault();
    mouseX = parseInt(e.clientX - offsetX);
    mouseY = parseInt(e.clientY - offsetY);

    // Put your mousemove stuff here
    var dx = mouseX - startX;
    var dy = mouseY - startY;
    startX = mouseX;
    startY = mouseY;
    // var player = offense[selectedImage];
    offense[selectedImage].x += dx;
    offense[selectedImage].y += dy;
    draw();
}

// listen for mouse events
$("#canvas").mousedown(function(e) {
    handleMouseDown(e);
});
$("#canvas").mousemove(function(e) {
    handleMouseMove(e);
});
$("#canvas").mouseup(function(e) {
    handleMouseUp(e);
});
$("#canvas").mouseout(function(e) {
    handleMouseOut(e);
});