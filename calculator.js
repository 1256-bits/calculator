const screen = document.querySelector(".screen");
const numKeys = document.querySelectorAll(".numpad input");
// const operators = document.querySelectorAll("")
const bspaceKey = document.querySelector("#backspace");
const clearKey = document.querySelector("#clear");
const evalKey = document.querySelector("#eval");
const operands = document.querySelectorAll(".operands input");

/*
    TODO:
    1) Working operands
    2) Can't add more than one "." per number
    3) "." adds 0 if used in the beginning
    4) "=" calls evaluate
*/

numKeys.forEach(key => key.addEventListener("click", fillScreen));
bspaceKey.addEventListener("click", backspace);
clearKey.addEventListener("click", clearScreen);
operands.forEach(key => key.addEventListener("click", fillScreen));

evalKey.addEventListener("click", () => {
    screen.innerText = evaluate(screen.innerText);
});

function fillScreen(e) {
    currentNum = screen.innerText.split(/[\/\*\+-]/).pop();
    if (e.target.value === "." && currentNum.match(/\./))
        return;
    if (e.target.value === "." && currentNum === "") {
        screen.innerText += "0.";
        return;
    }
    screen.innerText += e.target.value;
}

function backspace() {
    screen.innerText = screen.innerText.slice(0, -1);
}

function clearScreen() {
    screen.innerText = "";
}


