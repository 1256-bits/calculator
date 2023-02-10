function evaluate(expr) {
    if (!isNaN(+expr))
        return +expr;

    if (expr.match(/\+/))
        return expr.split("+").map(el => evaluate(el)).reduce((total, num) => total + num);
    if (expr.match(/-/))
        return expr.split("-").map(el => evaluate(el)).reduce((total, num) => total - num);

}

// console.log(evaluate("2+2-6"));