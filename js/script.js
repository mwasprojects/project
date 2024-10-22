// script.js - Part 1

document.addEventListener('DOMContentLoaded', () => {
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

    // Points system
    let points = 0;
    const pointsDisplay = document.getElementById('points-display');

    function addPoints(amount) {
        points += amount;
        updatePointsDisplay();
    }

    function updatePointsDisplay() {
        pointsDisplay.textContent = `Points: ${points}`;
    }

    // Quiz feature
    const quizQuestions = [
        { question: "What color is the sky?", answer: "blue" },
        { question: "How many legs does a cat have?", answer: "4" },
        { question: "What is the opposite of hot?", answer: "cold" },
    ];

    function startQuiz() {
        let score = 0;
        for (let q of quizQuestions) {
            const userAnswer = prompt(q.question);
            if (userAnswer && userAnswer.toLowerCase() === q.answer) {
                score++;
                addPoints(10);
            }
        }
        alert(`You got ${score} out of ${quizQuestions.length} correct!`);
    }

   // part 2
       // Drawing canvas
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
   
       document.getElementById('clearCanvas').addEventListener('click', () => {
           ctx.clearRect(0, 0, canvas.width, canvas.height);
       });
   
       // Memory Game
       const memoryGameHTML = `
           <div id="memory-game">
               <div class="memory-card" data-framework="apple">🍎</div>
               <div class="memory-card" data-framework="apple">🍎</div>
               <div class="memory-card" data-framework="banana">🍌</div>
               <div class="memory-card" data-framework="banana">🍌</div>
               <div class="memory-card" data-framework="orange">🍊</div>
               <div class="memory-card" data-framework="orange">🍊</div>
           </div>
       `;
   
       function showMemoryGame() {
           document.getElementById('game-area').innerHTML = memoryGameHTML;
           setupMemoryGame();
       }
   
       function setupMemoryGame() {
           const cards = document.querySelectorAll('.memory-card');
           let hasFlippedCard = false;
           let lockBoard = false;
           let firstCard, secondCard;
   
           function flipCard() {
               if (lockBoard) return;
               if (this === firstCard) return;
   
               this.classList.add('flipped');
   
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
               addPoints(5); // Add points for a match
               resetBoard();
           }
   
           function unflipCards() {
               lockBoard = true;
               setTimeout(() => {
                   firstCard.classList.remove('flipped');
                   secondCard.classList.remove('flipped');
                   resetBoard();
               }, 1500);
           }
   
           function resetBoard() {
               [hasFlippedCard, lockBoard] = [false, false];
               [firstCard, secondCard] = [null, null];
           }
   
           (function shuffle() {
               cards.forEach(card => {
                   let randomPos = Math.floor(Math.random() * 12);
                   card.style.order = randomPos;
               });
           })();
   
           cards.forEach(card => card.addEventListener('click', flipCard));
       }
   
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
   
       // Event listeners for game buttons
       document.querySelector('.btn-green').addEventListener('click', startQuiz);
       document.querySelector('.btn-blue').addEventListener('click', showMathGame);
       document.querySelector('.btn-red').addEventListener('click', showMemoryGame);
   
       // Search functionality
       const searchButton = document.querySelector('.search-btn');
       const searchInput = document.querySelector('input[type="search"]');
   
       searchButton.addEventListener('click', () => {
           const query = searchInput.value;
           if (query) {
               alert(`You searched for: ${query}`);
               // Here you can add functionality to handle the search query
           } else {
               alert('Please enter a search term.');
           }
       });
   
       // Initialize points display
       updatePointsDisplay();
   });