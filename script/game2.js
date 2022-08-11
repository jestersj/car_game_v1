const cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d");


const car_img = new Image();
const cop_img = new Image();
const coin_img = new Image();
const road_img = new Image();


car_img.src = "./img/car.png";
cop_img.src = "./img/cop.png";
coin_img.src = "./img/coin.png";
road_img.src = "./img/road.png";


let FPS = 60,
    DELAY = 1000 / FPS,
    last_time = null,
    frame = -1;

let today = new Date();
let current_time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
let last_cop_spawn_time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
let last_coin_spawn_time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();


class BaseModel {
    constructor(x, y, vel_x, vel_y, width, height, pic) {
        this.x = x;
        this.y = y;
        this.vel_x = vel_x;
        this.vel_y = vel_y;
        this.width = width;
        this.height = height;
        this.pic = pic;
    }

    move(time) {
        this.x += this.vel_x * time;
        this.y += this.vel_y * time;
    }

    draw() {
        ctx.drawImage(this.pic, this.x, this.y, this.width, this.height);
    }
}


class Cop extends BaseModel {
    constructor(x, y, vel_x, vel_y, width, height) {
        super(x, y, vel_x, vel_y, width, height, cop_img);
    }
}


class Car extends BaseModel {
    constructor(x, y, vel_x, vel_y, width, height) {
        super(x, y, vel_x, vel_y, width, height, car_img);
    }
}


class Coin extends BaseModel {
    constructor(x, y, vel_x, vel_y, width, height) {
        super(x, y, vel_x, vel_y, width, height, coin_img);
    }
}

let cops = Array(),
    coins = Array();

let COP_VEL_X = 0,
    COP_VEL_Y = 120,
    COP_WIDTH = cvs.clientWidth / 4,
    COP_HEIGHT = cvs.clientHeight / 4;

function spawn_cop() {
    let x = (Math.random()) * (cvs.width - COP_WIDTH);
    let y = -COP_HEIGHT;

    cops.push(new Cop(x, y, COP_VEL_X, COP_VEL_Y, COP_WIDTH, COP_HEIGHT));
}


COPS_SPAWN_CHANCE = 80;
COIN_SPAWN_CHANCE = 10;

function cops_generate(time) {
    let x = COPS_SPAWN_CHANCE * time / 100;
    let y = Math.random();
    if (y < x  && cops[cops.length - 1].y >= COP_HEIGHT) {
        spawn_cop();
    }
}


function draw_cops() {
    for (let i in cops) {
        cops[i].draw();
    }
}


function move_cops(time) {
    for (let i in cops) {
        cops[i].move(time);
    }
}


SCORE = 0;


function clear_cops() {
    if (cops[cops.length - 1].y >= cvs.clientHeight) {
        cops.pop();
        ++SCORE;
    }
}


function main_func(time) {
    time = time / 1000;
    ctx.drawImage(road_img, 0, 0, cvs.clientWidth, cvs.clientHeight);

    if (time === 0) {
        spawn_cop();
    } else {
        cops_generate(time);
        // coins_generate();
    }

    clear_cops();
    draw_cops();
    move_cops(time);
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
