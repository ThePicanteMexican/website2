const screens = document.querySelectorAll('.screen')
const choose_insects_btns = document.querySelectorAll('.choose-insect-btn')
const game_container = document.getElementById('game-container')
const start_btn = document.getElementById('start-btn')
const timeEl = document.getElementById('time')
const scoreEl = document.getElementById('score')
const message = document.getElementById('message')
const popup = document.getElementById('popup-container');
const finalMessage = document.getElementById('final-message');

let seconds = 0
let score = 0
let selected_insect = {}
let gameTimer;
let timeInterval;

start_btn.addEventListener('click', () => {
    screens[0].classList.add('up')
})

choose_insects_btns.forEach(btn => {
    btn.addEventListener(('click'), () => {
        screens[1].classList.add('up')
        const img = btn.querySelector('img')
        const alt = img.getAttribute('alt')
        const src = img.getAttribute('src')
        selected_insect = {src, alt}
        setTimeout(createInsect, 1000)
        startGame()
    })
})

function startGame() {
    gameTimer = setTimeout(endGame, 30000);
    timeInterval = setInterval(increaseTime, 1000)
}

function increaseTime() {
    let min = Math.floor(seconds / 60);
    let sec = seconds % 60;
    if(min < 10) {
        min = `0${min}`;
    }
    if(sec < 10) {
        sec = `0${sec}`;
    }
    timeEl.innerHTML = `Time: ${min}:${sec}`;
    seconds++;
}


function createInsect() {
    const insect = document.createElement('div')
    insect.classList.add('insect')
    const {x,y} = getRandomLocation()
    insect.style.top = `${y}px`
    insect.style.left = `${x}px`
    insect.innerHTML = `<img src="${selected_insect.src}" alt="${selected_insect.alt}" style = "tramsform: rotate(${Math.random() * 360}deg" />`
    insect.addEventListener('click', catchInsect)
    game_container.appendChild(insect)
}

function catchInsect() {
    increaseScore()
    this.classList.add('caught')
    setTimeout(() => this.remove(), 2000)
    addInsects()
}

function addInsects() {
    setTimeout(createInsect, 1000)
    setTimeout(createInsect, 1500)
}

function increaseScore() {
    score++
    if(score > 19){
        message.classList.add('visible')
    }
    scoreEl.innerHTML = `Score: ${score}`
}

function getRandomLocation() {
    const width = window.innerWidth
    const height = window.innerHeight
    const x = Math.random() * (width - 200) + 100
    const y = Math.random() * (height - 200) + 100
    return {x,y}
}

function endGame() {
    console.log("Game Should End Now!")
    clearTimeout(gameTimer); 
    clearInterval(timeInterval);

    if (score > 60) {
        finalMessage.innerText = 'Congratulations, you won!';
    } else {
        finalMessage.innerText = 'Unfortunately, you lost.';
    }

    popup.style.display = 'block';
}
