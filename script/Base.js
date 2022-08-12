export class BaseModel {
    constructor(x, y, vel_x, vel_y, width, height, pic, ctx) {
        this.x = x;
        this.y = y;

        this.vel_x = vel_x;
        this.vel_y = vel_y;
        this.width = width;
        this.height = height;
        this.pic = pic;
        this.ctx = ctx;
    }

    move(time) {
        this.x += this.vel_x * time;
        this.y += this.vel_y * time;
    }

    draw() {
        this.ctx.drawImage(this.pic, this.x, this.y, this.width, this.height);
    }
}


export function move_all(array, time) {
    for (let  i in array) {
        array[i].move(time);
    }
}


export function draw_all(array) {
    for (let  i in array) {
        array[i].draw();
    }
}

