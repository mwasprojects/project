document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.querySelector('.search-btn');
    const searchInput = document.querySelector('input[type="search"]');

    if (searchButton && searchInput) {
        searchButton.addEventListener('click', () => {
            const query = searchInput.value;
            if (query) {
                alert(`You searched for: ${query}`);
                // Here you can add functionality to handle the search query
            } else {
                alert('Please enter a search term.');
            }
        });
    }

    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add animation to category items
    const categoryItems = document.querySelectorAll('.categories li');
    categoryItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'scale(1.05)';
        });
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'scale(1)';
        });
    });

    // Handle form submission on login page
    const loginForm = document.querySelector('.login-form form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = loginForm.querySelector('input[type="text"]').value;
            const password = loginForm.querySelector('input[type="password"]').value;
            
            // Here you would typically send this data to a server for authentication
            console.log(`Login attempt: Username - ${username}, Password - ${password}`);
            alert('Login functionality would be implemented here.');
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
        // ... (keep existing code)
    
        // Theme toggle functionality
        const themeToggle = document.querySelector('.theme-toggle');
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
        });
    
        // Text-to-speech functionality
        const textToSpeech = document.querySelector('.text-to-speech');
        textToSpeech.addEventListener('click', () => {
            const text = document.querySelector('.hero h1').textContent;
            const utterance = new SpeechSynthesisUtterance(text);
            window.speechSynthesis.speak(utterance);
        });
    
        // Child-friendly buttons functionality
        const childFriendlyButtons = document.querySelectorAll('.child-friendly-btn');
        childFriendlyButtons.forEach(button => {
            button.addEventListener('click', () => {
                alert(`You clicked on ${button.textContent}!`);
                // Here you can add specific functionality for each button
            });
        });
    });
    let points = 0;

function addPoints(amount) {
    points += amount;
    updatePointsDisplay();
}

function updatePointsDisplay() {
    const pointsDisplay = document.getElementById('points-display');
    pointsDisplay.textContent = `Points: ${points}`;
}

// Add this to your HTML
// <div id="points-display">Points: 0</div>
const quizQuestions = [
    { question: "What color is the sky?", answer: "blue" },
    { question: "How many legs does a cat have?", answer: "4" },
    // Add more questions here
];

function startQuiz() {
    let score = 0;
    for (let q of quizQuestions) {
        const userAnswer = prompt(q.question);
        if (userAnswer.toLowerCase() === q.answer) {
            score++;
            addPoints(10);
        }
    }
    alert(`You got ${score} out of ${quizQuestions.length} correct!`);
}

// Add a button to start the quiz
// <button onclick="startQuiz()">Start Quiz</button>

const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
let isDrawing = false;

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);

function startDrawing(e) {
    isDrawing = true;
    draw(e);
}

function draw(e) {
    if (!isDrawing) return;
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#000000';

    ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
}

function stopDrawing() {
    isDrawing = false;
    ctx.beginPath();
}

// Add a clear button for the canvas
const clearButton = document.createElement('button');
clearButton.textContent = 'Clear Drawing';
clearButton.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});
document.body.appendChild(clearButton); 

const cards = document.querySelectorAll('.memory-card');
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

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
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCards() {
    lockBoard = true;
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

// Math Game
let mathScore = 0;

function generateMathQuestion() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const question = `${num1} + ${num2} = ?`;
    document.getElementById('math-question').textContent = question;
    return num1 + num2;
}

function showMathGame() {
    const mathGameHTML = `
        <div id="math-game">
            <p id="math-question"></p>
            <input type="number" id="math-answer">
            <button id="math-submit">Submit</button>
            <p id="math-result"></p>
        </div>
    `;
    document.getElementById('game-area').innerHTML = mathGameHTML;
    
    let correctAnswer = generateMathQuestion();

    document.getElementById('math-submit').addEventListener('click', () => {
        const userAnswer = parseInt(document.getElementById('math-answer').value);
        const resultElement = document.getElementById('math-result');

        if (userAnswer === correctAnswer) {
            resultElement.textContent = 'Correct!';
            mathScore++;
            addPoints(5); // Add 5 points for a correct answer
            setTimeout(() => {
                correctAnswer = generateMathQuestion();
                document.getElementById('math-answer').value = '';
                resultElement.textContent = '';
            }, 1500);
        } else {
            resultElement.textContent = 'Try again!';
        }
    });
}

// Add this to your existing DOMContentLoaded event listener
document.querySelector('.btn-blue').addEventListener('click', showMathGame);


});
// Add this to your login.js file or within a <script> tag in your HTML

function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleBtn = document.querySelector('.password-toggle');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleBtn.textContent = '👁️‍🗨️';
    } else {
        passwordInput.type = 'password';
        toggleBtn.textContent = '👁️';
    }
}

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    // Here you would typically send this data to your server for authentication
    console.log('Login attempt:', { username, password, rememberMe });
    
    // For demo purposes, let's just show an alert
    alert('Login functionality would be implemented here.');
});

// Social login buttons (these would need to be integrated with the respective APIs)
document.querySelectorAll('.social-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        alert(`${this.textContent} login would be implemented here.`);
    });
});