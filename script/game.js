const cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d");

const car = new Image();
const cop = new Image();
const road = new Image();


car.src = "./img/car.png";
cop.src = "./img/cop.png";
road.src = "./img/road.png";

//Pressing a key
document.addEventListener("keydown", whichKey)
function whichKey() {
    let keyName = event.key
    if (xPosCar + 120 <= cvs.width - 90 && (keyName == "d" || keyName == "в" || keyName == "ArrowRight")) {
        moveRight()
    }
    if (xPosCar >= 0 && (keyName == "a" || keyName == "ф" || keyName == "ArrowLeft")) {
        moveLeft()
    }
    if (yPosCar >= 90 && (keyName == "w" || keyName == "ц" || keyName == "ArrowUp")) {
        moveUp()
    }
    if (yPosCar + 170 <= cvs.height - 90 && (keyName == "s" || keyName == "ы" || keyName == "ArrowDown")) {
        moveDown()
    }
}

function moveRight() {
    xPosCar += 90;
}
function moveLeft() {
    xPosCar -= 90;
}
function moveUp() {
    yPosCar -= 90;
}
function moveDown() {
    yPosCar += 90;
}


//Car position
let xPosCar = 160;
let yPosCar = 520;


let score = 0;

//Reset score 
const reset = document.getElementById("resetScore")
document.addEventListener("click", () => {
    localStorage.setItem("maxScore", 0)
})

//Cop position
let cops = []
cops[0] = {
    x: Math.floor((Math.random()) * cvs.width) - 50,
    y: 0
}

function draw() {
    ctx.drawImage(road, 0, 0);
    for (let i = 0; i < cops.length; i++) {
        ctx.drawImage(cop, cops[i].x, cops[i].y, 100, 160);

        cops[i].y += 2;
        if (cops[i].y == 350) {
            cops.push({
                x: Math.floor((Math.random()) * cvs.width) - 50,
                y: 0
            })
        }
        //Car crash check
        if (xPosCar <= cops[i].x + 50
            && xPosCar + 120 >= cops[i].x
            && yPosCar <= cops[i].y + 160
            && yPosCar + 170 >= cops[i].y) {
            location.reload();
        }

        if (cops.length >= 3) {
            cops.shift();
        }
        //Adding score
        if (cops[i].y == cvs.height - 20) {
            score++;
        }
        //Recording score
        if (score >= localStorage.getItem('maxScore')) {
            localStorage.setItem('maxScore', score);
        }


        ctx.fillStyle = "#000";
        ctx.font = "24px Verdana";
        ctx.fillText(`Счет: ${score}`, 10, cvs.height - 20);
        ctx.fillText(`Рекорд: ${localStorage.getItem('maxScore')}`, 10, cvs.height - 40);
    }

    ctx.drawImage(car, xPosCar, yPosCar, 200, 170);

    requestAnimationFrame(draw)
}



road.onload = draw;