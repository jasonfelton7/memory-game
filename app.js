document.addEventListener('DOMContentLoaded', () => {
    // card options
const cardArray = [
    {
        name: 'wavy-lines',
        img: 'images/black-and-white-wavy-lines.png'
    },
    {
        name: 'wavy-lines',
        img: 'images/black-and-white-wavy-lines.png'
    },
    {
        name: 'bluegreen-check',
        img: 'images/bluegreen-checkerboard.png'
    },
    {
        name: 'bluegreen-check',
        img: 'images/bluegreen-checkerboard.png'
    },
    {
        name: 'inverted-nine',
        img: 'images/inverted-nine-domino.png'
    },
    {
        name: 'inverted-nine',
        img: 'images/inverted-nine-domino.png'
    },
    {
        name: 'nine-domino',
        img: 'images/nine-domino.png'
    },
    {
        name: 'nine-domino',
        img: 'images/nine-domino.png'
    },
    {
        name: 'inv-yellow',
        img: 'images/inv-yellow-black-diagonal.png'
    },
    {
        name: 'inv-yellow',
        img: 'images/inv-yellow-black-diagonal.png'
    },
    {
        name: 'red-polka',
        img: 'images/red-polka-on-white.png'
    },
    {
        name: 'red-polka',
        img: 'images/red-polka-on-white.png'
    },
    {
        name: 'yellow-diag',
        img: 'images/yellow-black-diagonal-stripes.png'
    },
    {
        name: 'yellow-diag',
        img: 'images/yellow-black-diagonal-stripes.png'
    },
    {
        name: 'yellow-three',
        img: 'images/yellow-black-three-domino.png'
    },
    {
        name: 'yellow-three',
        img: 'images/yellow-black-three-domino.png'
    }
]

cardArray.sort(() => 0.5 - Math.random());

const grid = document.querySelector('.grid');
const resultDisplay = document.querySelector('#result');
const alertDisplay = document.querySelector('#alerts');
const resetButton = document.querySelector('#reset');
let cardsChosen = [];
let cardsChosenId = [];
let cardsWon = [];

// create gameboard
function createBoard() {
    for(let i = 0; i < cardArray.length; i++) {
        const card = document.createElement('img');
        card.setAttribute('src', 'images/card-back.png');
        card.setAttribute('data-id', i);
        card.addEventListener('click', flipcard);
        grid.appendChild(card);
    }
}

// check for matches
function checkForMatch() {
    const cards = document.querySelectorAll('img');
    const optionOneId = cardsChosenId[0];
    const optionTwoId = cardsChosenId[1];

    if (optionOneId === optionTwoId) {
        cards[optionOneId].setAttribute('src', 'images/card-back.png');
        cards[optionTwoId].setAttribute('src', 'images/card-back.png');
        alertDisplay.textContent = 'You have clicked the same image!';
    }
    else if (cardsChosen[0] === cardsChosen[1]) {
        alertDisplay.textContent = 'You found a match';
        cards[optionOneId].setAttribute('src', 'images/plain-white.png');
        cards[optionTwoId].setAttribute('src', 'images/plain-white.png');
        cards[optionOneId].removeEventListener('click', flipcard);
        cards[optionTwoId].removeEventListener('click', flipcard);
        cardsWon.push(cardsChosen);
    } else {
        cards[optionOneId].setAttribute('src', 'images/card-back.png');
        cards[optionTwoId].setAttribute('src', 'images/card-back.png');
        alertDisplay.textContent = 'Sorry, try again';
    }

    cardsChosen = [];
    cardsChosenId = [];
    resultDisplay.textContent = `Matches Made: ${cardsWon.length}`;
    if (cardsWon.length === cardArray.length/2) {
        clearInterval(interval);
        let finalTime = timer.innerHTML;
        resultDisplay.textContent = `Congratulations! You found them all in: ${finalTime}!`;
        alertDisplay.textContent = '--';
    }
}


// flip your card
function flipcard() {
    let cardId = this.getAttribute('data-id');
    cardsChosen.push(cardArray[cardId].name);
    cardsChosenId.push(cardId);
    this.setAttribute('src', cardArray[cardId].img);
    if (cardsChosen.length === 2) {
        setTimeout(checkForMatch, 400);
    }
}
resetButton.addEventListener('click', restart);
function restart() {
    document.location.href = '';
}
    
// game timer
let second = 0;
let minute = 0;
let timer = document.querySelector('.timer');

let interval;

function startTimer() {
    interval = setInterval(function() {
        timer.innerHTML = minute + "mins " + second + "secs";
        second++;
        if(second === 60) {
            minute++;
            second = 0;
        }
        if(minute === 60) {
            hour++;
            minute = 0;
        }
    }, 1000)
}

createBoard();
startTimer();
})

// credit to Ania Kobow for the YouTube tutorial on the code for this game. I designed all the cards and card backs myself in Adobe Illustrator and changed the styling of the webpage to improve the look.

// I also changed from using pop-up alerts to using textContent to display the messages directly on the page.

// In addition, I added extra cards that make up a fourth row and added a reset button.
