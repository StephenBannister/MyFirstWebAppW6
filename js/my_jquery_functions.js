// Quiz Functionality Section

// Initiates the currentQuestion and quizData variables
let quizData = [];
let currentQuestion = {};

// Get and display a random question
function displayRandomQuestion() {
    const randomIndex = Math.floor(Math.random() * quizData.length);
    currentQuestion = quizData[randomIndex];
    $("#questionLabel").text(currentQuestion.question);
    // Clear any old input or answers
    $("#userAnswer").val("");
    $("#answerLabel").css({ color: "black", fontWeight: "normal" });
    $("#answerLabel").text("Click 'Submit' to see if you are correct");
}

// Check the users answer and format the resulting text accordingly
function checkAnswer() {
    if ($("#userAnswer").val() == currentQuestion.answer) {
        $("#answerLabel").css({ color: "green", fontWeight: "bold" });
        $("#answerLabel").text("Nicely done! You are correct!");
    }
    else {
        $("#answerLabel").css({ color: "red", fontWeight: "bold" });
        $("#answerLabel").text("You are incorrect, the answer is " + currentQuestion.answer + ". Try another question.");
    }
}

// This loads the quizdata from a JSON file and presents a random question on page initiation
$(document).ready(function () {
    $.getJSON("/data/quizdata.json", function (data) {
        quizData = data;
        if (quizData.length > 0) {
            displayRandomQuestion();
        }
    });
});
