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
cops.itemProperties[0].x = 5
console.log(cops.itemProperties.length)

// function droppingItems(itemName) {
//     this.itemName = [];
//     this.itemName[0] = {
//         x: Math.floor((Math.random()) * 10) - 50,
//         y: -160,
//         vel: 2,
//         flag_spawn: true,
//         flag_score: true
//     }
// }
// let a = droppingItems(coins);
// console.log(a)