let blockSize = 25;
let total_row = 17; //total row number
let total_col = 17; //total column number
let board;
let context;

let snakeX = blockSize * 5;
let snakeY = blockSize * 5;

// Set the total number of rows and columns
let speedX = 0;  //speed of snake in x coordinate.
let speedY = 0;  //speed of snake in Y coordinate.

let snakeBody = [];
let score = 0; // Initialize score

let foodX;
let foodY;

let gameOver = false;

// Add a variable to control the speed of the game
let speed = 100; // Adjust this value to make the game slower or faster
let lastUpdateTime = 0;

window.onload = function () {
    // Set board height and width
    board = document.getElementById("board");
    board.height = total_row * blockSize;
    board.width = total_col * blockSize;
    context = board.getContext("2d");

    placeFood();
    document.addEventListener("keyup", changeDirection);  //for movements
    // Set snake speed
    requestAnimationFrame(update); // Use requestAnimationFrame for smoother updates
}

function update(timestamp) {
    if (gameOver) {
        return;
    }

    // Control the speed of the game
    if (timestamp - lastUpdateTime < speed) {
        requestAnimationFrame(update);
        return;
    }
    lastUpdateTime = timestamp;

    // Background of a Game with gradient
    let gradient = context.createLinearGradient(0, 0, board.width, board.height);
    gradient.addColorStop(0, "lightblue");
    gradient.addColorStop(1, "lightgreen");
    context.fillStyle = gradient;
    context.fillRect(0, 0, board.width, board.height);

    // Draw grid
    drawGrid();

    // Set food color and position
    context.fillStyle = "yellow";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]);
        placeFood();
        score++; // Increment score
    }

    // body of snake will grow
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle = "white";
    snakeX += speedX * blockSize; //updating Snake position in X coordinate.
    snakeY += speedY * blockSize;  //updating Snake position in Y coordinate.
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    // Display score
    context.fillStyle = "black";
    context.font = "20px Arial";
    context.fillText("Score: " + score, 10, 20);

    if (snakeX < 0 
        || snakeX > total_col * blockSize 
        || snakeY < 0 
        || snakeY > total_row * blockSize) { 
        
        // Out of bound condition
        gameOver = true;
        alert("Game Over");
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) { 
            
            // Snake eats own body
            gameOver = true;
            alert("Game Over");
        }
    }

    requestAnimationFrame(update); // Continue the animation
}

// Function to draw the grid
function drawGrid() {
    context.strokeStyle = "gray"; // Change grid line color to black
    context.lineWidth = 0.5; // Width of the grid lines

    // Draw vertical lines
    for (let x = 0; x <= total_col; x++) {
        context.beginPath();
        context.moveTo(x * blockSize, 0);
        context.lineTo(x * blockSize, board.height);
        context.stroke();
    }

    // Draw horizontal lines
    for (let y = 0; y <= total_row; y++) {
        context.beginPath();
        context.moveTo(0, y * blockSize);
        context.lineTo(board.width, y * blockSize);
        context.stroke();
    }
}

// Movement of the Snake - We are using addEventListener
function changeDirection(e) {
    if (e.code == "ArrowUp" && speedY != 1) { 
        speedX = 0;
        speedY = -1;
    }
    else if (e.code == "ArrowDown" && speedY != -1) {
        speedX = 0;
        speedY = 1;
    }
    else if (e.code == "ArrowLeft" && speedX != 1) {
        speedX = -1;
        speedY = 0;
    }
    else if (e.code == "ArrowRight" && speedX != -1) { 
        speedX = 1;
        speedY = 0;
    }
}

// Randomly place food
function placeFood() {
    foodX = Math.floor(Math.random() * total_col) * blockSize; 
    foodY = Math.floor(Math.random() * total_row) * blockSize; 
}