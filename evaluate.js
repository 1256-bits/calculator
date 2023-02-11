function evaluate(expr) {
    if (!isNaN(+expr))
        return +expr;

    if (expr.match(/\+/))
        return expr.split("+").map(el => evaluate(el)).reduce((total, num) => total + num);
    if (expr.match(/(?<!\/|\*)-/))
        return expr.split(/-/).map(el => evaluate(el)).reduce((total, num) => total - num);

    const operands = expr.split(/[^0-9\.\-]/);
    const operators = expr.match(/[^0-9\.\-]/g);
    let total = operands.shift();

    for (let i of operands) {
        const operator = operators.shift();
        switch (operator) {
            case "*":
                total *= i;
                break;
            case "/":
                total /= i;
                break;
            default:
                throw (`Invalid operand: ${operator}`);
        }
    }

    return total;
}

console.log(+evaluate(6*-2));