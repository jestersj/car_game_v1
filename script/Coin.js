import {BaseModel} from "./Base.js";


const coin_img = new Image();
coin_img.src = "./img/coin.png";


export class Coin extends BaseModel {
    constructor(x, y, vel_x, vel_y, width, height, ctx) {
        super(x, y, vel_x, vel_y, width, height, coin_img, ctx);
    }
}
