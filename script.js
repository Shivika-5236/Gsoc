const allQuestions = [
  { question: "What is JavaScript?", answers: ["A language for styling", "A web programming language", "A database"], correct: 1 },
  { question: "How do you declare a variable ?", answers: ["var x", "variable x", "int x"], correct: 0 },
  { question: "What is 2 + 2?", answers: ["3", "4", "5"], correct: 1 },
  { question: "What is NaN?", answers: ["Not a number", "A number", "Undefined"], correct: 0 },
  { question: "How do you write a single line comment?", answers: ["// comment", "/* comment */", "# comment"], correct: 0 },
  { question: "What is '=='?", answers: ["Equal value", "Assignment", "Comparison"], correct: 0 },
  { question: "What is the result of 2 + '2'?", answers: ["4", "22", "undefined"], correct: 1 },
  { question: "How do you define a function?", answers: ["function() {}", "def func()", "create function()"], correct: 0 },
  { question: "Which is a JavaScript data type?", answers: ["Character", "Integer", "String"], correct: 0 },
  { question: "What is a closure?", answers: ["Function with variables", "A storage", "A type of loop"], correct: 0 }
];

let currentQuestionIndex = 0;
let score = 0;
let quizSetCount = 0;

const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const nextButton = document.getElementById("next-btn");
const continueButton = document.getElementById("continue-btn");
const exitButton = document.getElementById("exit-btn");
const scoreBox = document.getElementById("score-box");
const scoreElement = document.getElementById("score");

function startQuiz() {
  quizSetCount = 0;
  score = 0;
  currentQuestionIndex = 0;
  loadQuestion();
}

function loadQuestion() {
  resetState();
  const currentQuestion = allQuestions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;

  currentQuestion.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.textContent = answer;
    button.classList.add("btn");
    button.addEventListener("click", () => selectAnswer(button, index === currentQuestion.correct));
    answersElement.appendChild(button);
  });
}

function resetState() {
  answersElement.innerHTML = "";
  nextButton.disabled = true;
}

function selectAnswer(button, isCorrect) {
  if (isCorrect) {
    button.classList.add("correct");
    score++;
  } else {
    button.classList.add("wrong");
  }
  Array.from(answersElement.children).forEach((btn) => (btn.disabled = true));
  nextButton.disabled = false;
}

function handleNext() {
  currentQuestionIndex++;
  if (currentQuestionIndex < (quizSetCount + 1) * 5) {
    loadQuestion();
  } else {
    if (quizSetCount === 0) {
      showContinueOption();
    } else {
      showScore();
    }
  }
}

function showContinueOption() {
  questionElement.textContent = "Do you want to continue to the next set of 5 questions?";
  nextButton.classList.add("hidden");
  continueButton.classList.remove("hidden");
  exitButton.classList.remove("hidden");
}

function continueQuiz() {
  quizSetCount++;
  currentQuestionIndex = quizSetCount * 5;
  continueButton.classList.add("hidden");
  exitButton.classList.add("hidden");
  nextButton.classList.remove("hidden");
  loadQuestion();
}

function exitQuiz() {
  showScore();
}

function showScore() {
  questionElement.textContent = "Quiz Complete!";
  scoreBox.classList.remove("hidden");
  scoreElement.textContent = score;
  nextButton.textContent = "Restart";
  nextButton.classList.remove("hidden");
  continueButton.classList.add("hidden");
  exitButton.classList.add("hidden");
}

nextButton.addEventListener("click", () => {
  if (nextButton.textContent === "Restart") {
    startQuiz();
    nextButton.textContent = "Next";
  } else {
    handleNext();
  }
});

continueButton.addEventListener("click", () => continueQuiz());
exitButton.addEventListener("click", () => exitQuiz());

startQuiz();

