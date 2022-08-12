import {BaseModel} from "./Base.js";


const car_img = new Image();
car_img.src = "./img/car.png";

export class Car extends BaseModel {
    constructor(x, y, width, height, ctx) {
        super(x, y, 0, 0, width, height, car_img, ctx);
    }

    move(x, y) {
        this.x += x;
        this.y += y;
    }
}
