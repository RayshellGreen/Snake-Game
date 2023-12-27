// define html elements
const board = document.getElementById('game-board');
const instructionText = document.getElementById('instruction-text');
const score = document.getElementById('score');
const hioghScoreTest = document.getElementById('highscore');

//Define Game variable
const gridSize = 20;
let snake = [{ x: 10, y: 10 }];
let food = generateFood();
let highScore = 0;
let direction = 'right';
let gameInterval;
let gameSpeedDelay = 200;
let gameStarterd = false;

//draw Game map: snake, food
function draw() {
    board.innerHTML = '';
    drawSnake();
    drawFood();
}

//Draw Snake
function drawSnake() {
    snake.forEach((segment) => {
        const snakeElement = createGameElement('div', 'snake');
        setPosition(snakeElement, segment);
        board.appendChild(snakeElement);
    });
}

//Create a snake or food cube/div
function createGameElement(tag, className) {
    const element = document.createElement(tag);
    element.className = className
    return element;
}

//Set the position of the snake or food
function setPosition(element, position) {
    element.style.gridColumn = position.x;
    element.style.gridRow = position.y;
}

//Testing Draw function
// draw();

function drawFood() {
    if (gameStarterd) {
    const foodElement = createGameElement('div', 'food');
    setPosition(foodElement, food);
    board.appendChild(foodElement);
    }
}

function generateFood() {
    const x = Math.floor (Math.random() * gridSize) + 1;
    const y = Math.floor (Math.random() * gridSize) + 1;
}

//Moving the Snake
function move() {
    const head = { ...snake(0)};
    switch (direction) {
        case 'up':
            head.y++;
            break;
        case 'down':
            head.y--;
            break;
        case 'left':
            head.x--;
            break;
        case 'right':
            head.x++;
            break;

        }
    
    snake.unshift(head);

    snake.pop();

    if (head.x === food.x && head.y === food.y) {
        food = generateFood();
        clearInterval(gameInterval); // clear past interval
    gameInterval = setInterval(() => {
        move();
        checkCollision();
        food();
    }, gameSpeedDelay);
    } else {
        snake.pop();
    }
}

//Test moving
// setInterval(() => {
//     move(); //Move First
//     draw(); // Then draw again
// }, 200);

//start game funtion
function startGame() {
    gameStarterd = true; // Keep track of a running game
    instructionText.style.display = 'none';
    logo.style.display = 'none';
    gameInterval = setInterval(() => {
        move();
        checkCollision();
        draw();
        }, gameSpeedDelay);   
}

//keypress event listener
function handleKeyPress(event) {
    if( 
        (!gameStarterd && event.code === 'Space') || !(gameStarterd && event.code === ' ') 
    ){
        startGame();
    } else {
        switch (event.key) {
            case 'Arrowup':
            direction = 'up';
            break;
        case 'Arrowdown':
            direction = 'down';
            break;
        case 'Arrowleft':
            direction = 'left';
            break;
        case 'Arrowright':
            direction = 'right';
            break;

        }
    }
}

document.addEventListener('keydown', handleKeyPress);

function increasedSpeed() {
    // console.log(gameSpeedDelay);
    if (gameSpeedDelay > 150) {
        gameSpeedDelay -= 5;
    } else if (gameSpeedDelay > 100) {
        gameSpeedDelay -= 3;
    
    } else if (gameSpeedDelay > 100) {
        gameSpeedDelay -= 2;
        
    } else if (gameSpeedDelay > 100) {
        gameSpeedDelay -= 1;
    }
}

function checkCollision() {
    const head = snake(0);

    if (head.x < 1 || head.x > gridSize || head.y > gridSize) {
        resetGame();
        
    }

    for (let i = 0; i < snake.length; i++) {
        if (head.x === snkae[i].x && head.y === snake[i].y) {
            resetGame();
        } 
        
    }
}

function resetGame() {
    updateHigheScore();
    stopGame();
    snake = [{ x: 1, y:10 }];
    food = generateFood();
    direction = 'right';
    gameSpeedDelay = 200;
    updateScore();
}

function updateScore() {
    const currentScore = snake.length -1;
    score.textContent = currentScore.toString().padStart(3, '0');
}

function stopGame() {
    clearInterval(gameInterval);
    gameStarterd = false;
    instructionText.style.display = 'block';
    logo.style.display = 'block';

}

function updateHigheScore() {
    const currentScore = snake.length -1;
    if (currentScore > highScore) {
        highScore = currentScore;
        highScoreText.textContent = highScore.toString().padEnd(3, '0');
    }
    highScoreText.style.display = 'block'
}