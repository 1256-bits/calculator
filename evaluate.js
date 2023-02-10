function evaluate(expr) {
    if (!isNaN(+expr))
        return +expr;

    if (expr.match(/\+/))
        return expr.split("+").map(el => evaluate(el)).reduce((total, num) => total + num);
    if (expr.match(/-/))
        return expr.split("-").map(el => evaluate(el)).reduce((total, num) => total - num);

    const operators = expr.split(/[*/]/);
    const operands = expr.match(/[/*]/g);
    let total = operators.shift();

    for (let i of operators) {
        switch (operands.shift()) {
            case "*":
                total *= i;
                break;
            case "/":
                total /= i;
                break;
        }
    }

    return total;
}

console.log(evaluate("2+2*2"));