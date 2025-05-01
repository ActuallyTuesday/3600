// komlan.js is to connect to the komlanquiz.html

// This function evaluates the user's responses to the quiz
function evaluateQuiz() {
    // Define correct answers for the first 3 multiple-choice questions
    const answers = [
        { question: "q1", correct: "c)" },
        { question: "q2", correct: "d)" },
        { question: "q3", correct: "d)" },
    ];

    // Define the correct answer for the fill-in-the-blank question
    const fillInAnswer = "hungarian";

    // Define the correct options for the multiple-answer question
    const multiCorrect = ["a", "c", "d"];

    let score = 0; // Tracks user's score
    let total = 5; // Total number of questions
    let feedback = "<div class='results'><h3>Results:</h3><ul>"; // Initialize feedback HTML

    // Loop through the first 3 multiple-choice questions
    answers.forEach((item, index) => {
        // Find the selected answer for the current question
        const selected = document.querySelector(`input[name="${item.question}"]:checked`);
        const userAnswer = selected ? selected.parentElement.textContent.trim() : "No answer";
        const correct = item.correct;

        // Increase score if correct
        if (userAnswer.startsWith(correct)) score++;

        // Add individual feedback
        feedback += `<li>Question ${index + 1}: You answered \"${userAnswer}\" — Correct answer: Option ${correct.charAt(0).toUpperCase()}</li>`;
    });

    // Evaluate fill-in-the-blank question
    const q4 = document.querySelector('input[name="q4"]').value.trim().toLowerCase();
    if (q4 === fillInAnswer) score++;
    feedback += `<li>Question 4: You answered \"${q4}\" — Correct answer: Hungarian</li>`;

    // Evaluate the multiple-answer checkbox question
    const checkboxes = document.querySelectorAll('input[name="q5"]');
    let selectedLetters = [];
    let selectedTexts = [];

    checkboxes.forEach(box => {
        if (box.checked) {
            const text = box.parentElement.textContent.trim();
            selectedTexts.push(text);
            selectedLetters.push(text.charAt(0).toLowerCase());
        }
    });

    // Compare arrays for equality
    selectedLetters.sort();
    const sortedCorrect = [...multiCorrect].sort();
    const isCorrect = selectedLetters.length === sortedCorrect.length && selectedLetters.every((val, index) => val === sortedCorrect[index]);

    if (isCorrect) score++;

    // Add feedback for question 5
    feedback += `<li>Question 5: You selected [${selectedTexts.join(", ")}] — Correct answers: A, C, D</li>`;

    // Calculate final score and pass/fail result
    const percentage = (score / total) * 100;
    const result = percentage >= 60 ? "Pass" : "Fail";

    feedback += `</ul><p><strong>Final Score:</strong> ${score}/${total} (${percentage}%) — ${result}</p></div>`;

    // Remove existing results if present
    const existingResults = document.querySelector(".results");
    if (existingResults) existingResults.remove();

    // Insert the new results into the quiz page
    const content = document.querySelector(".content");
    content.insertAdjacentHTML("beforeend", feedback);
}
