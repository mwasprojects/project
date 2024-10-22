// script.js

// Theme Toggle Functionality
const themeToggleButton = document.querySelector('.theme-toggle');
themeToggleButton.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
});

// Math Game Functionality
const mathQuestionElement = document.getElementById('math-question');
const mathAnswerInput = document.getElementById('math-answer');
const mathSubmitButton = document.getElementById('math-submit');
const mathResultElement = document.getElementById('math-result');

function generateMathQuestion() {
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    mathQuestionElement.textContent = `What is ${num1} + ${num2}?`;
    return num1 + num2; // Return the correct answer
}

let correctAnswer = generateMathQuestion();

mathSubmitButton.addEventListener('click', () => {
    const userAnswer = parseInt(mathAnswerInput.value, 10);
    if (userAnswer === correctAnswer) {
        mathResultElement.textContent = 'Correct!';
    } else {
        mathResultElement.textContent = 'Incorrect, try again!';
    }
    // Reset the question
    correctAnswer = generateMathQuestion();
    mathAnswerInput.value = ''; // Clear input
});

// Memory Game Functionality
const cards = document.querySelectorAll('.memory-card');
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    lockBoard = true;

    checkForMatch();
}

function checkForMatch() {
    const isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

cards.forEach(card => card.addEventListener('click', flipCard));

// Drawing Canvas Functionality
const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
let drawing = false;

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mousemove', draw);

function startDrawing(event) {
    drawing = true;
    draw(event);
}

function stopDrawing() {
    drawing = false;
    ctx.beginPath(); // Reset the path
}

function draw(event) {
    if (!drawing) return;

    ctx.lineWidth = 5; // Set line width
    ctx.lineCap = 'round'; // Set line cap style
    ctx.strokeStyle = '#00ffcc'; // Set stroke color

    ctx.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
}

// Start Quiz Function (Placeholder)
function startQuiz() {
    alert("Quiz functionality is not yet implemented.");
}