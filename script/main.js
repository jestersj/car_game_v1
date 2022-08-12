import {move_all, draw_all} from "./Base.js";
import {Cop} from "./Cop.js";
import {Coin} from "./Coin.js";


const cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d");

const road_img = new Image();
road_img.src = "./img/road.png";


const COP_VEL_X = 0,
    COP_WIDTH = cvs.clientWidth / 4,
    COP_HEIGHT = cvs.clientHeight / 4,
    COPS_SPAWN_CHANCE = 80;
let COP_VEL_Y = 120;

const COIN_SPAWN_CHANCE = 30,
    COIN_WIDTH = 30,
    COIN_HEIGHT = 30,
    COIN_VEL_X = 0,
    COIN_VEL_Y = 100;


const FPS = 60,
    DELAY = 1000 / FPS;

let last_time = null;
let SCORE  = 0;


let cops = Array(),
    coins = Array();


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
    if (cops[cops.length - 1].y >= cvs.clientHeight) {
        cops.pop();
        ++SCORE;
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


function main_func(time) {
    ctx.drawImage(road_img, 0, 0, cvs.clientWidth, cvs.clientHeight);
    time = time / 1000;

    cops_generate(time);
    move_all(cops, time);
    clear_cops();

    coins_generate(time);
    move_all(coins, time);
    clear_coins();

    draw_all(cops);
    draw_all(coins);
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
