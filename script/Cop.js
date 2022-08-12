import {BaseModel} from "./Base.js";


const cop_img = new Image();
cop_img.src = "./img/cop.png";


export class Cop extends BaseModel {
    constructor(x, y, vel_x, vel_y, width, height, ctx) {
        super(x, y, vel_x, vel_y, width, height, cop_img, ctx);
    }
}