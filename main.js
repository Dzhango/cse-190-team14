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
let defense = [{ img: defense_player1, x: 0, y: 0 }, { img: defense_player2, x: 0, y: 0 }, { img: defense_player3, x: 0, y: 0 }, { img: defense_player4, x: 0, y: 0 }, { img: defense_player5, x: 0, y: 0 }]

let players = offense.concat(defense)

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

// this var will hold the index of the selected text
var selectedImage = -1;

// START: draw all texts to the canvas
init();

function init() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < 10; i++) {
        players[i].img.onload = function() {
            players[i].x += i * 50
            players[i].y += i * 50
            ctx.drawImage(players[i].img, players[i].x, players[i].y);
        };
        // defense[i].onload = function() {
        //     ctx.drawImage(defense[i], 500 + i * 50, 500 + i * 20);
        // };
    }

}

// clear the canvas draw all texts
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < 10; i++) {
        // offense[i].img.onload = function() {
        ctx.drawImage(players[i].img, players[i].x, players[i].y);
    }

}

// test if x,y is inside the bounding box of texts[textIndex]
function textHittest(x, y, imgIndex) {
    var player = players[imgIndex];
    // var defensive = defense[imgIndex];
    console.log(`x: ${x}, xOffense:${player.x}; y: ${y}, yOffense: ${player.y}`)

    return (x >= player.x && x <= player.x + 50 && y >= player.y - 50 && y <= player.y + 50)
}

// handle mousedown events
// iterate through texts[] and see if the user
// mousedown'ed on one of them
// If yes, set the selectedText to the index of that text
function handleMouseDown(e) {
    e.preventDefault();
    startX = parseInt(e.clientX - offsetX);
    startY = parseInt(e.clientY - offsetY);

    // startX = parseInt(e.clientX);
    // startY = parseInt(e.clientY);

    console.log(`${startX}, ${startY}`)
        // Put your mousedown stuff here
    for (var i = 0; i < players.length; i++) {
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
    players[selectedImage].x += dx;
    players[selectedImage].y += dy;
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


const buttonPredict = document.querySelector("button")
const outputHtml = document.querySelector('.output div')
const container = document.querySelector('.output')
    // const offenseDiv = document.querySelector('.ball')
const defenseDiv = document.querySelector('.defense')

buttonPredict.addEventListener('click', (e) => {
    // buttonPredict.disabled = true
    shuffle(imagesOffense)
    shuffle(imagesDefense)
    const offenseDiv = document.querySelector('.ball')
    const defenseDiv = document.querySelector('.defense')
    removeAllChildNodes(offenseDiv)
    removeAllChildNodes(defenseDiv)

    const offense = document.createElement('p')
    offense.innerText = "Offense"
    offenseDiv.appendChild(offense)
    offenseDiv.appendChild(imagesOffense[0])
    offenseDiv.appendChild(imagesOffense[1])
    offenseDiv.appendChild(imagesOffense[2])

    const defense = document.createElement('p')
    defense.innerText = "Defense"
    defenseDiv.appendChild(defense)
    defenseDiv.appendChild(imagesDefense[0])
    defenseDiv.appendChild(imagesDefense[1])
    defenseDiv.appendChild(imagesDefense[2])


    if (Math.random() > 0.5) {
        outputHtml.innerText = 'They will score'
    } else {
        outputHtml.innerText = 'They won\'t score'
    }
})

imagesOffense = []
imagesDefense = []
for (let i = 0; i < 10; i++) {
    const img = document.createElement('img')
    if (i >= 5) {
        img.src = `heatmaps/defense${i-4}.png`
        imagesDefense.push(img)
    } else {
        img.src = `heatmaps/ball${i+1}.png`
        imagesOffense.push(img)
    }
}

function showHeatMaps() {
    imagesOffense[0].onload = () => {
        offenseDiv.appendChild(imagesOffense[0])
    }
    imagesOffense[1].onload = () => {
        offenseDiv.appendChild(imagesOffense[1])
    }
    imagesOffense[2].onload = () => {
        offenseDiv.appendChild(imagesOffense[2])
    }

    imagesDefense[0].onload = () => {
        defenseDiv.appendChild(imagesDefense[0])
    }
    imagesDefense[1].onload = () => {
        defenseDiv.appendChild(imagesDefense[1])
    }
    imagesDefense[2].onload = () => {
        defenseDiv.appendChild(imagesDefense[2])
    }
}

function shuffle(array) {
    let currentIndex = array.length,
        randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]
        ];
    }

    return array;
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}