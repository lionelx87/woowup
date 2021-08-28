const stairs = require('./src/stairs');
const MODE = require('./src/constants/replenishment.constants');
const { replenishment } = require('./src/replenishment');

console.log();

console.log('==== STAIRS (Start)====');
console.log(`Escalera de 2 escalones | Posibles combinaciones: ${ stairs(2) }`);
console.log(`Escalera de 3 escalones | Posibles combinaciones: ${ stairs(3) }`);
console.log(`Escalera de 5 escalones | Posibles combinaciones: ${ stairs(5) }`);
console.log(`Escalera de 8 escalones | Posibles combinaciones: ${ stairs(8) }`);
console.log(`Escalera de 10 escalones | Posibles combinaciones: ${ stairs(10) }`);
console.log('==== STAIRS (Finish)====');

console.log();

console.log('==== REPLENISHMENT with AVERAGE (Start)====');
const nextPurchasesWithAverage = replenishment(MODE.AVERAGE);
nextPurchasesWithAverage.forEach( purchase => {
    console.log(`Probablemente la próxima compra del producto ${purchase.name} sea el ${purchase.nextPurchase}`);
});
console.log('==== REPLENISHMENT with AVERAGE (End)====');

console.log();

console.log('==== REPLENISHMENT with MEDIAN (Start)====');
const nextPurchasesWithMEDIAN = replenishment(MODE.MEDIAN);
nextPurchasesWithMEDIAN.forEach( purchase => {
    console.log(`Probablemente la próxima compra del producto ${purchase.name} sea el ${purchase.nextPurchase}`);
});

console.log('==== REPLENISHMENT with MEDIAN (End)====');

console.log();