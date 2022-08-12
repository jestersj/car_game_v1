import {BaseModel} from "./Base.js";


const car_img = new Image();
car_img.src = "./img/car.png";

export class Car extends BaseModel {
    constructor(x, y, vel_x, vel_y, width, height, ctx) {
        super(x, y, vel_x, vel_y, width, height, car_img, ctx);
    }

    move() {
        this.x += this.vel_x;
        this.y += this.vel_y;
    }
}
