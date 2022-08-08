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
    if (xPosCar + 120 <= cvs.width - 90 && (keyName == "d" || keyName == "в" || keyName == "ArrowRight") && !isPaused) {
        moveRight();
    }
    if (xPosCar >= 0 && (keyName == "a" || keyName == "ф" || keyName == "ArrowLeft") && !isPaused) {
        moveLeft();
    }
    if (yPosCar >= 90 && (keyName == "w" || keyName == "ц" || keyName == "ArrowUp") && !isPaused) {
        moveUp();
    }
    if (yPosCar + 170 <= cvs.height - 90 && (keyName == "s" || keyName == "ы" || keyName == "ArrowDown") && !isPaused) {
        moveDown();
    }
    if ((keyName == "Escape" || keyName == "Space")) {
        pauseModeSwitch();
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
reset.addEventListener("click", () => {
    localStorage.setItem("maxScore", 0);
})

//Cop position
// let cops = []
// cops[0] = {
//     x: Math.floor((Math.random()) * cvs.width) - 50,
//     y: -160,
//     vel: 2,
//     flag_spawn: true,
//     flag_score: true
// }

//Class dropping something
class DroppingItems {
    constructor(itemName) {
        this.name = itemName;
        this.itemProperties = [];
        this.itemProperties[0] = {
            x: Math.floor((Math.random()) * 10) - 50,
            y: -160,
            vel: 2,
            flag_spawn: true,
            flag_score: true
        }
    }
}
let cops = new DroppingItems("cops")

//Menu
let isPaused = true;
function pauseModeSwitch() {
    isPaused = !isPaused;
}
const menuBtn = document.getElementById("menu_btn")
menuBtn.addEventListener("click", () => {
    pauseModeSwitch();
})

const menuPause = document.getElementById("menu_window")
function menuVisibilityFlex() {
    menuPause.style.display = 'flex'
}
function menuVisibilityNone() {
    menuPause.style.display = 'none'
}
//Menu buttons
const playBtnPause = document.getElementById("play_btn_pause");
playBtnPause.addEventListener("click", () => pauseModeSwitch());

const restartBtnPause = document.getElementById("restart_btn_pause");
restartBtnPause.addEventListener("click", () => restartGame());

const playBtnStart = document.getElementById("play_btn_start");
playBtnStart.addEventListener("click", () => {
    pauseModeSwitch();
    isStart = false;
})
const restartBtnEnd = document.getElementById("restart_btn_end");
restartBtnEnd.addEventListener("click", () => restartGame());

const finalScore = document.getElementById("result");

//Which menu to open
let isStart = true;
let isEnd = false;
const startMenu = document.getElementById("menu_window_start");
const pauseMenu = document.getElementById("menu_window_pause");
const endMenu = document.getElementById("menu_window_end");
function whichMenu() {
    if (isStart && !isEnd) {
        startMenu.style.display = "flex"
        pauseMenu.style.display = "none"
        endMenu.style.display = "none"

    }
    if (!isStart && !isEnd) {
        startMenu.style.display = "none"
        pauseMenu.style.display = "flex"
        endMenu.style.display = "none"
    }
    if (!isStart && isEnd) {
        startMenu.style.display = "none"
        pauseMenu.style.display = "none"
        endMenu.style.display = "flex"
        isEnd =!isEnd
    }

}

//Function to restart
function restartGame() {
    cops.length = 0;
    cops[0] = {
        x: Math.floor((Math.random()) * cvs.width) - 50,
        y: -160,
        vel: 2,
        flag_spawn: true,
        flag_score: true
    }
    xPosCar = 160;
    yPosCar = 520;
    score = 0;

    pauseModeSwitch();
}
    
    


function draw() {
    ctx.drawImage(road, 0, 0);
    for (let i = 0; i < cops.itemProperties.length; i++) {
        ctx.drawImage(cop, cops.itemProperties[i].x, cops.itemProperties[i].y, 100, 160);

        if (!isPaused) {
            cops.itemProperties[i].y += cops.itemProperties[i].vel;
        }
        if (cops.itemProperties[i].y >= 350 && cops.itemProperties[i].flag_spawn && !isPaused) {
            cops.itemProperties[i].flag_spawn = false;
            cops.itemProperties.push({
                x: Math.floor((Math.random()) * cvs.width) - 50,
                y: -160,
                vel: cops[i].vel + 0.1,
                flag_spawn: true,
                flag_score: true
            })
        }
        //Car crash check
        if (xPosCar <= cops.itemProperties[i].x + 50
            && xPosCar + 120 >= cops.itemProperties[i].x
            && yPosCar <= cops.itemProperties[i].y + 160
            && yPosCar + 170 >= cops.itemProperties[i].y) {
            isPaused = true;
            isEnd = true;
        }

        if (cops.itemProperties.length >= 5) {
            cops.itemProperties.shift();
        }
        //Adding score
        if (cops.itemProperties[i].y >= cvs.height - 20 && cops.itemProperties[i].flag_score) {
            score++;
            cops.itemProperties[i].flag_score = false;
        }
        //Recording score
        if (score >= localStorage.getItem('maxScore')) {
            localStorage.setItem('maxScore', score);
        }
        //Opening pause menu
        if (isPaused) {
            menuVisibilityFlex();

        }
        if (!isPaused) {
            menuVisibilityNone();
        }
        //Checking which type of window should be opened
        whichMenu();

        ctx.fillStyle = "#fff";
        ctx.font = "24px Undertale Battle Font";
        ctx.fillText(`Score: ${score}`, 10, cvs.height - 20);
        ctx.fillText(`Record: ${localStorage.getItem('maxScore')}`, 10, cvs.height - 40);
        finalScore.innerHTML = `<h2>Score: ${score} <br> Record: ${localStorage.getItem('maxScore')}</h2>`;

    }



    ctx.drawImage(car, xPosCar, yPosCar, 200, 170);

    requestAnimationFrame(draw)

}



road.onload = draw;