// From Gpt

// Function to append value to the display
function dis(val) {
    const display = document.getElementById("display");
    if (display.value === "0" && val !== '.') {
        display.value = val;
    } else {
        display.value += val;
    }
}

// Function to evaluate the expression
function solve() {
    try {
        let expression = document.getElementById("display").value;
        console.log('Evaluating expression:', expression);
        
        // Handle square root and other formatting issues
        expression = expression.trim().replace(/√\s*/g, 'sqrt(').replace(/√$/, 'sqrt(0)');
        console.log('Formatted expression:', expression);
        
        // Handle unmatched parentheses
        let openParentheses = (expression.match(/\(/g) || []).length;
        let closeParentheses = (expression.match(/\)/g) || []).length;
        if (openParentheses > closeParentheses) {
            expression += ')'.repeat(openParentheses - closeParentheses);
        }
        
        // Evaluate the expression
        let result = math.evaluate(expression);
        document.getElementById("display").value = result;
    } catch (err) {
        console.error('Error evaluating expression:', err);
        document.getElementById("display").value = "Error";
    }
}

// Function to clear the display
function clr() {
    document.getElementById("display").value = "0";
}

// Function to remove the last character from the display
function backspace() {
    const display = document.getElementById("display");
    if (display.value.length > 1) {
        display.value = display.value.slice(0, -1);
    } else {
        display.value = "0";
    }
}

// Initialize the display with 0
function initialize() {
    document.getElementById("display").value = "0";
}

// Event listener for keyboard input
document.addEventListener('keydown', function(event) {
    const key = event.key;
    if ((key >= '0' && key <= '9') || ['+', '-', '*', '/', '%'].includes(key)) {
        dis(key);
    } else if (key === 'Enter') {
        solve();
    } else if (key === 'Escape') {
        clr();
    } else if (key === 'Backspace') {
        backspace();
    }
});

// Call initialize function on page load
window.onload = initialize;
