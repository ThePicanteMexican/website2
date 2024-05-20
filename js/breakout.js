rulesBtn = document.getElementById('rules-btn')
rules = document.getElementById('rules')
closeBtn = document.getElementById('close-btn')
canvas = document.getElementById('canvas')
startReplayBtn = document.getElementById('start-replay-btn');
ctx = canvas.getContext('2d')
score = 0
brickRowCount = 9
brickColumnCount = 5
gameOver = false;
hasBeenCalled = false;
gameStarted = false;


// Create ball properties
ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 10,
    speed: 4,
    dx: 4,
    dy: -4,
}

// Create Paddle Properties
paddle = {
    x: canvas.width / 2 - 40,
    y: canvas.height - 20,
    w: 80,
    h: 10,
    speed: 5,
    dx: 0,
}

// Create brick properties
brickInfo = {
    w: 70,
    h: 20,
    padding: 10,
    offsetX: 45,
    offsetY: 60,
    visible: true
}

// Create bricks
bricks = []
for(i = 0; i < brickRowCount; i++) {
    bricks[i] = []        
    for(j = 0; j < brickColumnCount; j++){
        x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX
        y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY
        // '...' will add everything in from brickInfo (Spread operator)
        bricks[i][j] = {x, y, ...brickInfo}
    }   
}

// Draw ball on canvas
function drawBall() {
    ctx.beginPath()
    ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2)
    ctx.fillStyle = '#70AE6E'
    ctx.fill()
    ctx.closePath()
}

// Draw paddle on canvas
function drawPaddle() {
    ctx.beginPath()
    ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h)
    ctx.fillStyle = '#843B62'
    ctx.fill()
    ctx.closePath()
}

// Draw score on canvas
function drawScore() {
    ctx.font = '25px Comic Sans'
    ctx.fillStyle = '#F17105'
    ctx.fillText(`Score: ${score}`, canvas.width-100, 30)
}

// Draw bricks on canvas
function drawBricks() {
    bricks.forEach(column => {
        column.forEach(brick => {
            ctx.beginPath()
            ctx.rect(brick.x,brick.y,brick.w,brick.h)
            ctx.fillStyle = brick.visible ? '#032B43' : 'transparent';
            ctx.fill()
            ctx.closePath()
        })
    })
}   

// Draw everything
function draw() {
    ctx.clearRect(0,0,canvas.width, canvas.height)
    drawPaddle()
    drawBall()
    drawScore()
    drawBricks()
}

// Move paddle on canvas
function movePaddle(){
     paddle.x = paddle.x + paddle.dx * 2

     // wall detection
     if(paddle.x < 0){
        paddle.x = 0
     }
     if(paddle.x+paddle.w > canvas.width){
        paddle.x = canvas.width - paddle.w
     }
}

// Keydown Event
function keyDown(e) {
    // console.log(e.key)
    if(e.key == 'ArrowRight' || e.key == 'Right'){
        paddle.dx = paddle.speed
    }

    if(e.key == 'ArrowLeft' || e.key == 'Left'){
        paddle.dx = -paddle.speed
    }
}

// Keyup event
function keyUp(e){
    if(e.key == 'ArrowRight' || e.key == 'Right') {
        paddle.dx = 0
    }

    if(e.key == 'ArrowLeft' || e.key == 'Left'){
        paddle.dx = 0
    }
}


// Keyboard event handler
document.addEventListener('keydown', keyDown)
document.addEventListener('keyup', keyUp)

function moveBall() {
    ball.x = ball.x + ball.dx
    ball.y = ball.y + ball.dy

    // wall collision (top)
    if(ball.y + ball.size < 0){
        ball.dy = -ball.dy
    }

    // wall collision (right)
    if(ball.x + ball.size > canvas.width){
        ball.dx = - ball.dx
    }

    // wall colision (left)
    if(ball.x + ball.size < 0){
        ball.dx = -ball.dx
    }

    // Paddle collision
    if(ball.x - ball.size > paddle.x && ball.x + ball.size < paddle.x + paddle.w && ball.y + ball.size > paddle.y)
    {
        ball.dy = -ball.speed
    }

    if(score == 45){
        ball.speed = 0
    }

    // Brick Collision
    bricks.forEach(column => {
        column.forEach(brick => {
            // Checks if the ball is currently visible
            if(brick.visible){
                // Checks if balls contact with bricks
                if(ball.y - ball.size < brick.y + brick.h && ball.x - ball.size > brick.x && ball.x + ball.size < brick.x + brick.w && ball.y + ball.size > brick.y){
                    ball.dy = -ball.dy
                    brick.visible = false
                    score++
                    if(score == brickRowCount * brickColumnCount){
                        score = 0
                        showAllBricks()
                    }
                }
            }
        })
    })

    // Lose if hit bottom
    if(ball.y + ball.size > canvas.height - 1){
        window.addEventListener('click', () => {
            update()
         })
        
    }
}

// Reveal all bricks again
function showAllBricks() {
    bricks.forEach(column => {
        column.forEach(brick => {
            brick.visible = true
        })
    })
}


// Update canvas drawing and animation
function update() {
    moveBall();
    movePaddle();
    draw();
    requestAnimationFrame(update);
}


startReplayBtn.addEventListener('click', () => {
    if (gameOver) {
        resetGame();
        startGame();
    } else if (!hasBeenCalled && !gameStarted) {
        startGame();
    }
    else if(gameStarted){
        popup.innerText = 'Game In Session';
    }
});

function resetGame() {

    // Reset the ball, paddle, and bricks
    ball = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        size: 10,
        speed: 4,
        dx: 4,
        dy: -4,
    };
    paddle = {
        x: canvas.width / 2 - 40,
        y: canvas.height - 20,
        w: 80,
        h: 10,
        speed: 5,
        dx: 0,
    };
    showAllBricks();
        // Reset the game state
        score = 0;
        seconds = 0;
        gameOver = false;
        hasBeenCalled = false;
}


function startGame() {
    hasBeenCalled = true;
    gameStarted = true;
    startReplayBtn.innerText = 'Replay';
    update();
}

function endGame() {
    gameOver = true;
}


// Rules open and close
rulesBtn.addEventListener('click', () => {
    rules.classList.add('show')
})

closeBtn.addEventListener('click', () => {
    rules.classList.remove('show')
})