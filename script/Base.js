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


function check_in(base1, x, y) {
    return (base1.x <= x)  && (x <= base1.x + base1.width) && (base1.y <= y) && (y <= base1.y + base1.height);
}



function check_vertices_in(base1, base2) {
    let x,  y;

    x = base2.x;
    y = base2.y;
    if (check_in(base1, x, y)) return true;

    x = base2.x;
    y = base2.y + base2.height;
    if (check_in(base1, x, y)) return true;

    x = base2.x + base2.width;
    y = base2.y;
    if (check_in(base1, x, y)) return true;

    x = base2.x + base2.width;
    y = base2.y + base2.height;
    if (check_in(base1, x, y)) return true;

    return false;
}

export function collide(base1, base2) {
    return check_vertices_in(base1, base2) || check_vertices_in(base2, base1);
}