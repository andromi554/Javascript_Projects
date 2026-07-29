const startScreen = document.getElementById("start-screen");
const resultScreen = document.getElementById("result-screen");
const quizScreen = document.getElementById("quiz-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestion =  document.getElementById("current-question");
const totalQuestions = document.getElementById("total-questions");
const scorespan = document.getElementById("score");
const finalScore = document.getElementById("final-score");
const maxScore = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

const quizQuestions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "London", correct: false },
      { text: "Berlin", correct: false },
      { text: "Paris", correct: true },
      { text: "Madrid", correct: false },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Venus", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false },
    ],
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Arctic Ocean", correct: false },
      { text: "Pacific Ocean", correct: true },
    ],
  },
  {
    question: "Which of these is NOT a programming language?",
    answers: [
      { text: "Java", correct: false },
      { text: "Python", correct: false },
      { text: "Banana", correct: true },
      { text: "JavaScript", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for gold?",
    answers: [
      { text: "Go", correct: false },
      { text: "Gd", correct: false },
      { text: "Au", correct: true },
      { text: "Ag", correct: false },
    ],
  },
];

let currentQuestionIndex = 0;
let socre = 0;
let answerDisabled = false;

startButton.addEventListener("click",startQuiz);
restartButton.addEventListener("click",restartQuiz);


function startQuiz(){
    currentQuestionIndex = 0;
    score = 0 ;
    scorespan.textContent = 0;
    startScreen.classList.remove("active");
    quizScreen.classList.add("active");

    showQuestions();

} 


function showQuestions(){

    answerDisabled = false;

    const currentQs = quizQuestions[currentQuestionIndex];
    currentQuestion.textContent = currentQuestionIndex + 1;
    const prog_per = (currentQuestionIndex / quizQuestions.length) * 100;
    progressBar.style.width = prog_per + "%";
    questionText.textContent = currentQs.question

    answersContainer.innerHTML  = "";

    currentQs.answers.forEach((answer) =>{
        const ans_btn = document.createElement("button");
        ans_btn.textContent = answer.text;
        ans_btn.classList.add("answer-btn");

        ans_btn.dataset.correct = answer.correct;

        ans_btn.addEventListener("click",selectAnswer);
        answersContainer.appendChild(ans_btn);
    })

}

function selectAnswer(){
    if(answerDisabled) return;

    answerDisabled = true;

    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct === "true";

    Array.from(answersContainer.children).forEach((answer) => {
        if (answer.dataset.correct === "true"){
            answer.classList.add("correct");
        }else if (answer === selectedButton){
            answer.classList.add("incorrect");
        }
    });

    if (isCorrect){
  
        score++;
        scorespan.textContent = score;
    }

    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizQuestions.length){
            showQuestions();
        }else {
            showResults();
        }
    }, 1000);
}


function showResults(){
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");

    finalScore.textContent =score;

    const percentage= (score/quizQuestions.length) * 100;
    if (percentage === 100) {
    resultMessage.textContent = "Perfect! You're a genius!";
  } else if (percentage >= 80) {
    resultMessage.textContent = "Great job! You know your stuff!";
  } else if (percentage >= 60) {
    resultMessage.textContent = "Good effort! Keep learning!";
  } else if (percentage >= 40) {
    resultMessage.textContent = "Not bad! Try again to improve!";
  } else {
    resultMessage.textContent = "Keep studying! You'll get better!";
  }

}

function restartQuiz(){
    resultScreen.classList.remove("active");
    startQuiz();
}