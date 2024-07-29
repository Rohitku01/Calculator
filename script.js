// Function to append value to the display
function dis(val) {
    document.getElementById("display").value += val;
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
    }
});

// Function to evaluate the expression
function solve() {
    try {
        let expression = document.getElementById("display").value;
        expression = expression.replace(/sqrt\(([^)]+)\)/g, 'sqrt($1)');
        let result = math.evaluate(expression);
        document.getElementById("display").value = result;
    } catch (err) {
        document.getElementById("display").value = "Error";
    }
}

// Function to clear the display
function clr() {
    document.getElementById("display").value = "";
}
