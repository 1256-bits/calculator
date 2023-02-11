function evaluate(expr) {
    if (!isNaN(+expr))
        return +expr;

    if (expr.match(/\+/))
        return expr.split("+").map(el => evaluate(el)).reduce((total, num) => total + num);
    if (expr.match(/-/))
        return expr.split("-").map(el => evaluate(el)).reduce((total, num) => total - num);

    const operators = expr.split(/[^0-9\.]/);
    const operands = expr.match(/[^0-9\.]/g);
    let total = operators.shift();

    for (let i of operators) {
        const operand = operands.shift();
        switch (operand) {
            case "*":
                total *= i;
                break;
            case "/":
                total /= i;
                break;
            default:
                throw (`Invalid operand: ${operand}`);
        }
    }

    return total;
}

// try {
//     console.log(evaluate("2.2*2"));
// }
// catch {
//     console.log("Crash with no survivors");
// }