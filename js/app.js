// /*-------------------------------- Constants --------------------------------*/
const wordsList = [
    { word: 'PHANTOM', hint: 'A ghost that haunts the living, but you cant catch it!' },
    { word: 'SKULL', hint: 'The bony headpiece of someone who lived a long, long time ago.' },
    { word: 'BROOM', hint: 'This flies through the air when witches need a lift.' },
    { word: 'LANTERN', hint: 'A glowing light that guides you in the dark, especially in haunted places.' },
    { word: 'VAMPIRE', hint: 'A creature who drinks blood and sleeps in a coffin by day!' },
    { word: 'ZOMBIE', hint: 'A reanimated corpse that roams the earth in search of brains.' },
    { word: 'WITCH', hint: 'A spellcaster who often brews potions and rides a broomstick.' },
    { word: 'GHOST', hint: 'An apparition of a dead person, often seen floating through walls.' },
    { word: 'TOMB', hint: 'A structure that houses the remains of the dearly departed.' },
    { word: 'CAULDRON', hint: 'A large, bubbling pot used by witches for making potions.' },
    { word: 'MUMMY', hint: 'A wrapped-up creature from ancient times, cursed to wander forever.' },
    { word: 'WEREWOLF', hint: 'A human who transforms into a beast under the full moon.' }
]

const maxGuesses = 7

// /*---------------------------- Variables (state) ----------------------------*/
let currentWord = ''
let guessedLetters = []
let remainingGuesses = maxGuesses
let winner = false 
let seperateWord = []

// /*------------------------ Cached Element References ------------------------*/
const lettersbtns = document.querySelectorAll('.letters button')
const messageEl = document.querySelector('#message')
const wordDisplay = document.querySelector('.word-display')
const hangmanTemplate = document.querySelector('#hangman-template')
const resetBtn = document.querySelector('#reset-button')
const bgAudio = document.querySelector('#bg-audio')
const gameCover = document.querySelector('#game-cover')
const playBtn = document.querySelector('#play-button')
const gameSection = document.querySelector('#game')

// /*-------------------------------- Functions --------------------------------*/
    function init (){
        currentWord = ''
        guessedLetters = []
        remainingGuesses = maxGuesses
        winner = false
        
        const { word, hint } = wordsList[Math.floor(Math.random() * wordsList.length)]
        currentWord = word
        // console.log(currentWord)   
        messageEl.textContent = `Hint: ${hint}`
            
        resetBtn.disabled = true
        wordDisplay.innerHTML = '' 
        seperateWord = word.split('')
        seperateWord.forEach(letters => {
            const dashes = document.createElement('li')
            dashes.classList.add("letters")
            if (letters !== ' '){
                dashes.innerText = '_' 
                dashes.style.width = '50px'
            } else {
                    dashes.innerText = ''
            }
                wordDisplay.appendChild(dashes)
                // console.log(letters)
            }) 
    
        lettersbtns.forEach((button) => {
            button.disabled = false
            button.style.opacity = '1'
        })
    
        resetBtn.disabled = true
}
    
    
    
    function handleGuesses (event){
    const letterDiv = document.querySelectorAll('.letters')
    const guesses = event.target.textContent
    // console.log(guessedLetters)
    
    event.target.disabled = true
    event.target.style.opacity = '0.5'

    if (guessedLetters.includes(guesses)){
        // console.log('You already guessed that letter')
        return
    }
    guessedLetters.push(guesses)
    
    if (currentWord.includes(guesses)){
        seperateWord.forEach((letter, index) => {
            if (letter === guesses){
                letterDiv[index].innerText = guesses
                // console.log(index)
                // console.log('you guessed the right letter!')
            } 
    })
    } else {
        // console.log('you guessed the wrong letter')
        remainingGuesses--
        // console.log(`remaining guesses ${remainingGuesses}`)
        let loseAudio = new Audio()
        loseAudio.src = './audio/witch-laugh-189108.mp3'
        loseAudio.volume = '0.3'
        loseAudio.play()
    }
    updateHangman()
    updateGameStatus()
}

function updateHangman (){
    if (remainingGuesses === 6){
        hangmanTemplate.src = './images/hangman_attempt_1.png'
    }
    if (remainingGuesses === 5){
        hangmanTemplate.src = './images/hangman_attempt_2.png'
    }
    if (remainingGuesses === 4){
        hangmanTemplate.src = './images/hangman_attempt_3.png'
    }
    if (remainingGuesses === 3){
        hangmanTemplate.src = './images/hangman_attempt_4.png'
    }
    if (remainingGuesses === 2){
        hangmanTemplate.src = './images/hangman_attempt_5.png'
    }
    if (remainingGuesses === 1){
        hangmanTemplate.src = './images/hangman_attempt_6.png'
    }
    if (remainingGuesses === 0){
        hangmanTemplate.src = './images/hangman_attempt_7.png'
    }
}

function updateGameStatus() {
    const allLettersGuessed = seperateWord.every(letter => guessedLetters.includes(letter))
    if (allLettersGuessed){
        winner = true
        messageEl.innerHTML = 'You guessed it right! Coffin is unlocked!'
        resetBtn.disabled = false
        console.log('you win')
        let winAudio = new Audio()
        winAudio.src = './audio/spooky-gongwav-14904.mp3'
        winAudio.volume = '1'
        winAudio.play()
    }
    if (remainingGuesses === 0) {
        winner = false
        messageEl.innerHTML = `Game Over! It was <span style="color: #a8b527;">(${currentWord})</span>`
        resetBtn.disabled = false
        // console.log('You lose!')
    }
}


function resetGame (){
    init()
}

/*----------------------------- Event Listeners -----------------------------*/
lettersbtns.forEach((button) => {
    button.addEventListener('click', handleGuesses)
})

resetBtn.addEventListener('click', resetGame) 

playBtn.addEventListener('click', () => {
    gameCover.style.display = 'none'
    gameSection.style.display = 'block'
    init()
})    

