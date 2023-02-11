const screen = document.querySelector(".screen");
const numKeys = document.querySelectorAll(".numpad input");
// const operators = document.querySelectorAll("")
const bspaceKey = document.querySelector("#backspace");
const clearKey = document.querySelector("#clear");
const evalKey = document.querySelector("#eval");
const operands = document.querySelectorAll(".operands input");
let errorState = false;

numKeys.forEach(key => key.addEventListener("click", fillScreen));
bspaceKey.addEventListener("click", backspace);
clearKey.addEventListener("click", clearScreen);
operands.forEach(key => key.addEventListener("click", insertOperand));

evalKey.addEventListener("click", submit);

function fillScreen(e) {
    if (errorState) {
        screen.innerText = "";
        errorState = false;
    }
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

function insertOperand(e) {
    if (errorState) {
        screen.innerText = "";
        errorState = false;
    }
    const lastChar = screen.innerText.slice(-1);
    if (lastChar === "" && e.target.value !== "-")
        return;
    if (lastChar === "-" && e.target.value === "-")
        return;
    if (lastChar.match(/[-÷×\.\+]/) && e.target.value !== "-") {
        screen.innerText = screen.innerText.slice(0, -1) + e.target.value;
        return;
    }
    else if (screen.innerText.match(/[-÷×\.\+]/)) {
        submit();
        screen.innerText += e.target.value;
        return;
    }
    else
        screen.innerText += e.target.value;
}

function submit() {
    const evalMe = screen.innerText.replaceAll(/[÷×]/g, (match) => {
        switch (match) {
            case "×":
                return "*";
            case "÷":
                return "/";
        }
    });
    const result = +evaluate(evalMe).toFixed(3);
    if (result === Infinity) {
        screen.innerText = "Error: division by zero";
        errorState = true;
    }
    else
        screen.innerText = result;
}