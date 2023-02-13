const screen = document.querySelector(".screen");
const numKeys = document.querySelectorAll(".numpad input");
const bspaceKey = document.querySelector("#backspace");
const clearKey = document.querySelector("#clear");
const evalKey = document.querySelector("#eval");
const operators = document.querySelectorAll(".operators input");
let errorState = false;

numKeys.forEach(key => key.addEventListener("click", fillScreen));
bspaceKey.addEventListener("click", backspace);
clearKey.addEventListener("click", clearScreen);
operators.forEach(key => key.addEventListener("click", insertOperator));
document.addEventListener("keydown", pressKey);

evalKey.addEventListener("click", submit);

function fillScreen(e) {
    if (errorState) {
        screen.innerText = "";
        errorState = false;
    }

    const value = getEventValue(e);

    currentNum = screen.innerText.split(/[\/\*\+-]/).pop();
    if (value === "." && currentNum.match(/\./))
        return;
    if (value === "." && currentNum === "") {
        screen.innerText += "0.";
        return;
    }
    screen.innerText += value;
}

function backspace() {
    screen.innerText = screen.innerText.slice(0, -1);
}

function clearScreen() {
    screen.innerText = "";
}

function insertOperator(e) {
    if (errorState) {
        screen.innerText = "";
        errorState = false;
    }
    
    const value = getEventValue(e);

    const lastChar = screen.innerText.slice(-1);
    if (lastChar === "" && value !== "-")
        return;
    if (lastChar === "-" && value === "-")
        return;
    if (lastChar.match(/[-÷×\.\+]/) && value !== "-") {
        screen.innerText = screen.innerText.slice(0, -1) + value;
        return;
    }
    else if (screen.innerText.match(/[-÷×\.\+]/)) {
        submit();
        screen.innerText += value;
        return;
    }
    else
        screen.innerText += value;
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

function pressKey(e) {
    if (e.key.match(/[0-9]/))
        fillScreen(e);
    else if (e.key.match(/[-*+/]/))
        insertOperator(e);
    else if (["=","Enter","NumpadEnter"].includes(e.key))
        submit();
    else if (e.key === "Escape")
        clearScreen();
}

function getEventValue(e) {
    if (e.type === "click")
        return e.target.value;
    else if (e.type === "keydown")
        return e.key;
    else {
        console.error("Unknown event");
        return "";
    }
}