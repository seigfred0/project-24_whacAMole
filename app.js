const container = document.querySelector('.game-container');
const squares = document.querySelectorAll('.game-box');
const mole = document.querySelector('.mole');
const button = document.querySelector('.game-details_button');

const score = document.querySelector('#score');
const clock = document.querySelector('#clock');

let molePosition;
let result = 0;
let timer;
let clockTime = 10;
let clockTimeDown;

function randomSquare() { 
    squares.forEach((square) => {
        const mole = square.querySelector('.mole')
        if (mole) {
            square.removeChild(mole)
        };
    })

    createMole()
}

function createMole() { 
    let randomMole = squares[Math.floor(Math.random() * 9)];
    const newMole = document.createElement('div');
    newMole.classList.add('mole');
    randomMole.appendChild(newMole);

    molePosition = randomMole.id
    console.log(molePosition)
}

squares.forEach((square) => { // for updating score
    square.addEventListener('mousedown', () => {
        if (square.id == molePosition) {
            result++;
            score.textContent = "Score: " + result;
            molePosition = null;
        }
    })
})

function moveMole() {
    clearInterval(timer);
    timer = setInterval(randomSquare, 1000);
    countDown();
}


function countDown() {
    clearInterval(clockTimeDown);
    clockTime = 10;
    clock.textContent = "Time Left: " + clockTime;
    
    clockTimeDown = setInterval(() => {
        clockTime--;
        clock.textContent = "Time Left: " + clockTime;
        

        if (clockTime <= 0) {
            let score = document.querySelector('#result');
            console.log(score)
            clearInterval(timer);
            clearInterval(clockTimeDown);

            score.textContent = result;
            toggleModal();
            clearScore();


        }
    }, 1000)
        
}

button.addEventListener('click', () => {
    moveMole();
});

function clearScore() {
    result = 0;
    score.textContent = "Score: 0";
}

/* //////      Start Game        ////// */

const readyButton = document.querySelector('#ready');
const gameTitle = document.querySelector('.game-title');
const gameBackground = document.querySelector('.game-background');

readyButton.addEventListener('click', () => {
    gameTitle.classList.add('hidden');
    gameBackground.classList.remove('hidden');
})


/*  Modal   */
const playAgainBtn = document.querySelector('#playAgain');
const goBackBtn = document.querySelector('#goBackMenu');

const gameModal = document.querySelector('.game-modal');

playAgainBtn.addEventListener('click', () => {
    toggleModal()
})

goBackBtn.addEventListener('click', () => {
    gameModal.classList.toggle('hidden');
    gameBackground.classList.toggle('hidden');
    gameTitle.classList.toggle('hidden');

    clearScore();
})

function toggleModal() {
    gameModal.classList.toggle('hidden');
}


