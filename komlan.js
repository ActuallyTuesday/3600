// komlanquiz.js

function evaluateQuiz() {
    let score = 0;
    const results = [];

    // Question 1
    const q1 = document.querySelector('input[name="q1"]:checked');
    if (q1 && q1.nextSibling.textContent.trim().startsWith("c)")) {
        score++;
        results.push("Q1: Correct - c) It contains mysterious and terrifying secrets beneath its surface");
    } else {
        results.push("Q1: Incorrect - Correct answer: c");
    }

    // Question 2
    const q2 = document.querySelector('input[name="q2"]:checked');
    if (q2 && q2.nextSibling.textContent.trim().startsWith("b)")) {
        score++;
        results.push("Q2: Correct - b) They will instantly freeze, suffocate, or be exposed to deadly cosmic rays");
    } else {
        results.push("Q2: Incorrect - Correct answer: b");
    }

    // Question 3
    const q3 = document.querySelector('input[name="q3"]:checked');
    if (q3 && q3.nextSibling.textContent.trim().startsWith("b)")) {
        score++;
        results.push("Q3: Correct - b) Black hole");
    } else {
        results.push("Q3: Incorrect - Correct answer: b");
    }

    // Question 4
    const q4 = document.querySelector('input[name="q4"]').value.trim();
    if (q4 === "80" || q4 === "80%") {
        score++;
        results.push("Q4: Correct - 80%");
    } else {
        results.push("Q4: Incorrect - Correct answer: 80%");
    }

    // Question 5
    const q5Answers = document.querySelectorAll('input[name="q5"]:checked');
    const correctQ5 = ["a) Shipwrecks and ghost ships", "c) Deep-sea creatures like the giant squid"];
    const selectedQ5 = Array.from(q5Answers).map(cb => cb.nextSibling.textContent.trim());
    const isCorrectQ5 = correctQ5.every(ans => selectedQ5.includes(ans)) && selectedQ5.length === correctQ5.length;
    if (isCorrectQ5) {
        score++;
        results.push("Q5: Correct - a and c");
    } else {
        results.push("Q5: Incorrect - Correct answers: a and c");
    }

    // Display results
    const output = document.createElement("div");
    output.classList.add("results");
    output.innerHTML = `<h3>Results:</h3>
        <p>Total Score: ${score}/5</p>
        <p>${results.join("<br>")}</p>
        <p>${score >= 3 ? "Pass ✅" : "Fail ❌"}</p>`;

    document.querySelector("main.content").appendChild(output);
}

function restartQuiz() {
    // Clear selected radio buttons and checkboxes
    document.querySelectorAll('input[type="radio"], input[type="checkbox"]').forEach(input => input.checked = false);

    // Clear text inputs
    document.querySelectorAll('input[type="text"]').forEach(input => input.value = "");

    // Remove result display
    const existingResults = document.querySelector(".results");
    if (existingResults) existingResults.remove();
}  

// To be triggered by buttons:
// <button onclick="evaluateQuiz()">Submit Quiz</button>
// <button onclick="restartQuiz()">Restart Quiz</button>
