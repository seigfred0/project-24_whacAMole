const container = document.querySelector('.game-container');
const squares = document.querySelectorAll('.game-box');
const mole = document.querySelector('.mole');
const button = document.querySelector('.game-details_button');

const score = document.querySelector('#score');
const clock = document.querySelector('#clock');
const display = document.querySelector('.display');


let molePosition;
let result = 0;
let timer;
let clockTime = 10;
let clockTimeDown;

function randomSquare() { // main function
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
    // clockTimeDown = setInterval(countDown, 1000);
    clearInterval(clockTimeDown);
    clockTime = 10;
    clock.textContent = "Time Left: " + clockTime;
    
    clockTimeDown = setInterval(() => {
        clockTime--;
        clock.textContent = "Time Left: " + clockTime;
        

        if (clockTime <= 0) {
            clearInterval(timer);
            clearInterval(clockTimeDown);
            // alert('Game Dead');
            display.textContent = "Your Final Score is: " + result;
        }
    }, 1000)
        
}
// if (clockTime <= 0) {
//     display.textContent = "Your Final Score is: " + result;
//     clearInterval(timer);
//     clearInterval(clockTimeDown);
//     console.log('It is zero')
// }

button.addEventListener('click', () => {
    result = 0;
    score.textContent = "Score: ";
    display.textContent = ""; // Clear the display



    moveMole();
});