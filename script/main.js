import {move_all, draw_all, collide} from "./Base.js";
import {Cop} from "./Cop.js";
import {Coin} from "./Coin.js";
import {Car} from "./Car.js";


const cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d");

ctx.fillStyle = "#fff";
ctx.font = "24px Undertale Battle Font";


const road_img = new Image();
road_img.src = "./img/road.png";

const FPS = 120,
    DELAY = 1000 / FPS;

let last_time = null;
let score = 0;
let is_paused = false;


const CAR_WIDTH = cvs.clientWidth / 6,
    CAR_HEIGHT = cvs.clientHeight / 4,
    CAR_X = cvs.clientWidth / 2 - CAR_WIDTH / 2,
    CAR_Y = cvs.clientHeight - CAR_HEIGHT - 20,
    CAR_JUMP_X = cvs.clientWidth / 8,
    CAR_JUMP_Y = cvs.clientHeight / 8;

let car = new Car(CAR_X, CAR_Y, CAR_WIDTH, CAR_HEIGHT, ctx);


document.addEventListener("keydown", move_car)

function move_car() {
    let keyName = event.key
    if (car.x + car.width + CAR_JUMP_X <= cvs.clientWidth && (keyName === "d" || keyName === "в" || keyName === "ArrowRight")) {
        car.move(CAR_JUMP_X, 0);
    }
    if (car.x >= CAR_JUMP_X && (keyName === "a" || keyName === "ф" || keyName === "ArrowLeft")) {
        car.move(-CAR_JUMP_X, 0);
    }
    if (car.y >= CAR_JUMP_Y && (keyName === "w" || keyName === "ц" || keyName === "ArrowUp")) {
        car.move(0, -CAR_JUMP_Y);
    }
    if (car.y + car.height + CAR_JUMP_Y <= cvs.clientHeight && (keyName === "s" || keyName === "ы" || keyName === "ArrowDown")) {
        car.move(0, CAR_JUMP_Y);
    }
}


const COP_VEL_X = 0,
    COP_WIDTH = cvs.clientWidth / 4,
    COP_HEIGHT = cvs.clientHeight / 4,
    COPS_SPAWN_CHANCE = 80;
let COP_VEL_Y = 120;

let cops = Array();


const COIN_SPAWN_CHANCE = 30,
    COIN_WIDTH = 30,
    COIN_HEIGHT = 30,
    COIN_VEL_X = 0,
    COIN_VEL_Y = 100;


let coins = Array();


function spawn_cop() {
    let x = (Math.random()) * (cvs.width - COP_WIDTH);
    let y = -COP_HEIGHT;

    cops.push(new Cop(x, y, COP_VEL_X, COP_VEL_Y, COP_WIDTH, COP_HEIGHT, ctx));
}


function cops_generate(time) {
    if (cops.length === 0) spawn_cop();

    let x = COPS_SPAWN_CHANCE * time / 100;
    let y = Math.random();
    if (y < x && cops[cops.length - 1].y >= COP_HEIGHT) {
        spawn_cop();
    }
}


function clear_cops() {
    if (cops[0].y >= cvs.clientHeight) {
        cops.shift();
        ++score;
    }
}


function spawn_coin() {
    let x = (Math.random()) * (cvs.width - COIN_WIDTH);
    let y = -COIN_HEIGHT;

    coins.push(new Coin(x, y, COIN_VEL_X, COIN_VEL_Y, COIN_WIDTH, COIN_HEIGHT, ctx));
}

function coins_generate(time) {
    let x = COIN_SPAWN_CHANCE * time / 100;
    let y = Math.random();
    if (y < x) {
        spawn_coin();
    }
}


function clear_coins() {
    if (coins.length === 0) return;

    if (coins[coins.length - 1].y >= cvs.clientHeight) {
        coins.pop();
    }
}


const reset = document.getElementById("resetScore")
reset.addEventListener("click", () => {
    localStorage.setItem("maxScore", "0");
})

const result = document.getElementById("result");


function car_crash() {
    for (let i in cops) {
        if (collide(car, cops[i])) return true;
    }

    return false;
}


function pause() {
    is_paused = true;
    document.removeEventListener("keydown", move_car);
}


function restart() {
    cops = Array();
    coins = Array();
    score = 0;

    car.x = CAR_X;
    car.y = CAR_Y;
}


function main_func(time) {
    ctx.drawImage(road_img, 0, 0, cvs.clientWidth, cvs.clientHeight);
    time = time / 1000;

    console.log(is_paused);
    if (!is_paused) {
        cops_generate(time);
        move_all(cops, time);
        clear_cops();

        coins_generate(time);
        move_all(coins, time);
        clear_coins();
    }

    for (let i in cops) {
        console.log(cops[i]);
    }
    console.log(car);
    draw_all(cops);
    draw_all(coins);
    car.draw();

    if (car_crash()) {
        pause();
    }

    if (score >= localStorage.getItem('maxScore')) {
        localStorage.setItem('maxScore', score.toString());
    }

    ctx.fillText(`Score: ${score}`, 10, cvs.height - 20);
    ctx.fillText(`Record: ${localStorage.getItem('maxScore')}`, 10, cvs.height - 40);
    result.innerHTML = `<h2>Score: ${score} <br> Record: ${localStorage.getItem('maxScore')}</h2>`;
}

function loop() {
    let today = new Date();
    let current_time = today.getTime();

    if (last_time == null) {
        main_func(0);
    } else if (current_time - last_time >= DELAY) {
        main_func(current_time - last_time);
    }

    last_time = current_time;

    requestAnimationFrame(loop);
}


road_img.onload = loop;
