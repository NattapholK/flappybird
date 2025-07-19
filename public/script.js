let board;
let boardWidth = 360;
let boardHeight = 640;
let context;
let birdWidth = 34;
let birdHeight = 24;
let birdX = boardWidth / 8;
let birdY = boardHeight / 2;
let bird = { x: birdX, y: birdY, width: birdWidth, height: birdHeight };
let pipeArray = [];
let pipeWidth = 64;
let pipeHeight = 512;
let pipeX = boardWidth;
let pipeY = 0;
let velocityX = -2;
let velocityY = 0;
let gravity = 0.15;
let jumpStrength = -5.2;
let gameOver = false;
let score = 0;
let gameStarted = false;

window.onload = function() {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d");
    requestAnimationFrame(update);
    setInterval(placePipes, 2000);
    document.addEventListener("keydown", handleInput);
    document.addEventListener("click", handleInput);
}

function update() {
    requestAnimationFrame(update);
    context.clearRect(0, 0, board.width, board.height);
    context.fillStyle = "yellow";
    if (gameStarted) {
        velocityY += gravity;
        bird.y = Math.max(bird.y + velocityY, 0); 
    }
    context.fillRect(bird.x, bird.y, bird.width, bird.height);

    if (gameOver) {
        context.fillStyle = "black";
        context.font = "40px 'Courier New'";
        context.fillText("GAME OVER", 65, 300);
        context.font = "20px 'Courier New'";
        context.fillText("Click to Restart", 90, 340);
        return;
    }

    if (!gameStarted) {
        context.fillStyle = "black";
        context.font = "30px 'Courier New'";
        context.fillText("Click to Start", 70, 300);
        return;
    }

    for (let i = 0; i < pipeArray.length; i++) {
        let pipe = pipeArray[i];
        pipe.x += velocityX;
        context.fillStyle = "red";
        context.fillRect(pipe.x, pipe.y, pipe.width, pipe.height);
        if (detectCollision(bird, pipe)) gameOver = true;
        if (!pipe.passed && bird.x > pipe.x + pipe.width) {
            score += 0.5;
            pipe.passed = true;
        }
    }
    
    if (bird.y >= board.height) gameOver = true;
    while (pipeArray.length > 0 && pipeArray[0].x < -pipeWidth) pipeArray.shift();

    context.fillStyle = "white";
    context.font = "45px sans-serif";
    context.fillText(score, 5, 45);
}

function placePipes() {
    if (gameOver || !gameStarted) return;
    let randomPipeY = pipeY - pipeHeight/4 - Math.random()*(pipeHeight/2);
    let openingSpace = board.height/4;
    pipeArray.push({x: pipeX, y: randomPipeY, width: pipeWidth, height: pipeHeight, passed: false});
    pipeArray.push({x: pipeX, y: randomPipeY + pipeHeight + openingSpace, width: pipeWidth, height: pipeHeight, passed: false});
}

function handleInput(e) {
    if (e.code == "Space" || e.type === "click") {
        if (gameOver) {
            bird.y = birdY;
            velocityY = 0;
            pipeArray = [];
            score = 0;
            gameOver = false;
            gameStarted = false;
        } else {
            gameStarted = true;
            velocityY = jumpStrength;
        }
    }
}

function detectCollision(a, b) {
    return a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y;
}