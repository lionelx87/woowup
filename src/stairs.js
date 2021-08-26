function stairs(steps) {
    if(steps === 1 || steps === 2) {
        return steps;
    }
    if(steps >= 3) {
        return stairs(steps - 1) + stairs(steps - 2);
    }
    return "You must enter a number greater than or equal to 1";
}

module.exports = stairs;