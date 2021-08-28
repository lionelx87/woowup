function stairs(steps) {
    if(steps === 1 || steps === 2) {
        return steps;
    }
    if(steps >= 3) {
        return stairs(steps - 1) + stairs(steps - 2);
    }
    return "You must enter a number greater than or equal to 1";
}

console.log('==== STAIRS (Start)====');
console.log(`Escalera de 2 escalones | Posibles combinaciones: ${ stairs(2) }`);
console.log(`Escalera de 3 escalones | Posibles combinaciones: ${ stairs(3) }`);
console.log(`Escalera de 5 escalones | Posibles combinaciones: ${ stairs(5) }`);
console.log(`Escalera de 8 escalones | Posibles combinaciones: ${ stairs(8) }`);
console.log(`Escalera de 10 escalones | Posibles combinaciones: ${ stairs(10) }`);
console.log('==== STAIRS (Finish)====');

module.exports = stairs;