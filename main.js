const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d')

const offense_player1 = new Image()
offense_player1.src = "point-guard.png"
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


    // find a way to display players on an arc
    players[0].img.onload = function() {
        players[0].x = 230
        players[0].y = 315
        ctx.drawImage(players[0].img, players[0].x, players[0].y);
    };
    players[1].img.onload = function() {
        players[1].x = 300
        players[1].y = 139
        ctx.drawImage(players[1].img, players[1].x, players[1].y);
    };
    players[2].img.onload = function() {
        players[2].x = 550
        players[2].y = 50
        ctx.drawImage(players[2].img, players[2].x, players[2].y);
    };
    players[3].img.onload = function() {
        players[3].x = 344
        players[3].y = 544
        ctx.drawImage(players[3].img, players[3].x, players[3].y);
    };
    players[4].img.onload = function() {
        players[4].x = 550
        players[4].y = 590
        ctx.drawImage(players[4].img, players[4].x, players[4].y);
    };


    players[5].img.onload = function() {
        players[5].x = 350
        players[5].y = 320
        ctx.drawImage(players[5].img, players[5].x, players[5].y);
    };
    players[6].img.onload = function() {
        players[6].x = 370
        players[6].y = 200
        ctx.drawImage(players[6].img, players[6].x, players[6].y);
    };
    players[7].img.onload = function() {
        players[7].x = 370
        players[7].y = 450
        ctx.drawImage(players[7].img, players[7].x, players[7].y);
    };
    players[8].img.onload = function() {
        players[8].x = 500
        players[8].y = 230
        ctx.drawImage(players[8].img, players[8].x, players[8].y);
    };
    players[9].img.onload = function() {
        players[9].x = 500
        players[9].y = 420
        ctx.drawImage(players[9].img, players[9].x, players[9].y);
    };

    // for (let i = 5; i < 10; i++) {
    //     players[i].img.onload = function() {
    //         players[i].x = 400 + i * 10
    //         players[i].y = 351 + i * 10
    //         ctx.drawImage(players[i].img, players[i].x, players[i].y);
    //     };
    // }

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
        // offenseDiv.appendChild(imagesOffense[1])
        // offenseDiv.appendChild(imagesOffense[2])

    const defense = document.createElement('p')
    defense.innerText = "Defense"
    defenseDiv.appendChild(defense)
    defenseDiv.appendChild(imagesDefense[0])
        // defenseDiv.appendChild(imagesDefense[1])
        // defenseDiv.appendChild(imagesDefense[2])


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