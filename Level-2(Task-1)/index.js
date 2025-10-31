const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");
const swipeBtn = document.querySelector(".swipe-btn");
const functionBtns = document.querySelectorAll(".function-btn");
const buttonsContainer = document.querySelector(".buttons-container");

let isScientific = false;

// Display Update
function updateDisplay(value) {
    if (display.textContent === "0" && value !== "AC") {
        display.textContent = value;
    } else {
        display.textContent += value;
    }
}

// Evaluate expression safely
function calculate(expression) {
    try {
        // Replace operators for JS compatibility
        expression = expression.replace(/÷/g, "/").replace(/×/g, "*");

        // Handle factorial
        expression = expression.replace(/(\d+)!/g, (_, n) => {
            let fact = 1;
            for (let i = 1; i <= +n; i++) fact *= i;
            return fact;
        });

        // Replace power symbol ^
        expression = expression.replace(/(\d+)\^(\d+)/g, (_, a, b) => `Math.pow(${a},${b})`);

        // Handle scientific functions
        expression = expression
            .replace(/sin\(/g, "Math.sin(")
            .replace(/cos\(/g, "Math.cos(")
            .replace(/tan\(/g, "Math.tan(")
            .replace(/log\(/g, "Math.log10(")
            .replace(/ln\(/g, "Math.log(")
            .replace(/sqrt\(/g, "Math.sqrt(")
            .replace(/pi/g, "Math.PI")
            .replace(/e/g, "Math.E");

        display.textContent = eval(expression);
    } catch (error) {
        display.textContent = "Error";
    }
}

// Button actions
buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
        const value = btn.getAttribute("data-value");

        if (!value) return;

        switch (value) {
            case "AC":
                display.textContent = "0";
                break;
            case "DEL":
                display.textContent = display.textContent.slice(0, -1) || "0";
                break;
            case "=":
                calculate(display.textContent);
                break;
            case "^2":
                display.textContent = `(${display.textContent})**2`;
                calculate(display.textContent);
                break;
            case "1/":
                display.textContent = `1/(${display.textContent})`;
                calculate(display.textContent);
                break;
            default:
                updateDisplay(value);
        }
    });
});

// Toggle Scientific Mode
swipeBtn.addEventListener("click", () => {
    isScientific = !isScientific;

    functionBtns.forEach((btn) => {
        btn.style.display = isScientific ? "inline-block" : "none";
    });

    buttonsContainer.style.gridTemplateColumns = isScientific
        ? "repeat(5, 1fr)"
        : "repeat(4, 1fr)";
});
