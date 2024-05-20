const wordEl = document.getElementById('word')
const wrongLettersEl = document.getElementById('wrong-letters')
const playAgainBtn = document.getElementById('play-button')
const popup = document.getElementById('popup-container')
const notification = document.getElementById('notification-container')
const finalMessage = document.getElementById('final-message')
const figureParts = document.querySelectorAll('.figure-part')
let gameOver = false;

const word = ['aplication', 'programing', 'interface', 'wizard']

let selectedIndex = Math.floor(word.length * Math.random())
let selectedWord = word[selectedIndex]

const correctLetters = []
const wrongLetters = []

//show hidden word
function displayWord(){
    wordEl.innerHTML = `
    ${selectedWord
        .split('')
        .map(letter => `
    <span class = "letter">
        ${correctLetters.includes(letter) ? letter : ''}
    </span>

    `).join('')}

    `
    const innerWord=wordEl.innerText.replace(/\n/g, '')

    if(innerWord == selectedWord){
        finalMessage.innerText = 'Congratulations You won!'
        popup.style.display = 'flex'
        gameOver = true;
    }
}
//update the wrong numebrs
function updateWrongLettersEl(){
    wrongLettersEl.innerHTML= `
    ${wrongLetters.length > 0 ? '<p>wrong</p>' : ''}
    ${wrongLetters.map(letter => `<span>${letter}<span>`)}
    `

    figureParts.forEach((part,index) => {
        const errors =wrongLetters.length

        if(index < errors){
            part.style.display ='block'
        }else{
            part.style.display = 'none'
        }
    })

    if(wrongLetters.length == figureParts.length){
        finalMessage.innerText = 'Unfortunatly u lost the word was: ' + selectedWord + '!'
        popup.style.display = 'flex'
        gameOver = true;
    }
}


//show notif
function showNotification(){
    notification.classList.add('show')

    setTimeout(() =>{
        notification.classList.remove('show')
    }, 2000)
}

//keydown letter press
window.addEventListener('keydown', e=>{
    if (gameOver) return;

    console.log(e.keyCode)
    if (e.keyCode >= 65 && e.keyCode <=90){
        const letter = e.key

        if(selectedWord.includes(letter)){
            if( !correctLetters.includes(letter)){
                correctLetters.push(letter)

                displayWord()
            }else{
                showNotification()
            }
        } else{
            if (!wrongLetters.includes(letter)){
                wrongLetters.push(letter)

                updateWrongLettersEl()
            }else{
                showNotification()
            }
        }
    }
})

playAgainBtn.addEventListener('click', () => {
    gameOver = false;
    correctLetters.length = 0
    wrongLetters.length = 0
    console.log('u clicked')
    selectedIndex = Math.floor(word.length * Math.random())
    selectedWord = word[selectedIndex]

    displayWord()

    updateWrongLettersEl()

    popup.style.display = 'none'
})

displayWord()