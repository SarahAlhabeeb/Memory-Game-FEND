
// Create a list that holds all the cards
const cards = ['fa-diamond', 'fa-diamond',
    'fa-paper-plane-o', 'fa-paper-plane-o',
    'fa-anchor', 'fa-anchor',
    'fa-bolt', 'fa-bolt',
    'fa-cube', 'fa-cube',
    'fa-leaf', 'fa-leaf',
    'fa-bicycle', 'fa-bicycle',
    'fa-bomb', 'fa-bomb',
];

// Generate function that displays cards on page
function generateCard(card) {
    return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/* Initiate the game:
 *   - display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

function initGame() {

    const deck = document.querySelector('.deck');
    const cardHTML = shuffle(cards).map(function (card) {
        return generateCard(card);
    });
    deck.innerHTML = cardHTML.join('');
    moves = 0;
    moveCounter.innerText = moves;
}

let openCards = [];
let CompletedCards = [];
let moves = 0;
let sec = 0;
let min = 0;

let moveCounter = document.querySelector('.moves');
let secCounter = document.querySelector('.seconds');
let minCounter = document.querySelector('.minutes');
let finalMove = document.querySelector('.totalMoves');
let finalMin = document.querySelector('.finalMin');
let finalSec = document.querySelector('.finalSec');
let star1 = document.querySelector('.starOne');
let star2 = document.querySelector('.starTwo');
let star3 = document.querySelector('.starThree');
let restart = document.getElementsByClassName('.restart');

// Timer function
function timer() {
    sec = 0;
    min = 0;
    secCounter.innerText = sec;
    minCounter.innerText = min;
    t = setInterval(function () {
        sec = sec + 1;
        if (sec == 60) {
            min += 1;
            sec = 0;
        }
        if (min == 60) {
            let hours = 0;
            hours++;
            min = 0;
        }
        secCounter.innerText = sec;
        minCounter.innerText = min;
    }, 1000);

}

// To stop timer
function stopTimer() {
    clearInterval(t);
}

// when the user wins
function winGame() {
    finalMove.innerText = moves;
    finalMin.innerText = min;
    finalSec.innerText = sec;
    let starRating = document.querySelector(".stars").innerHTML;
    document.getElementById("starRating").innerHTML = starRating;
    stopTimer();
    modal.style.display = "block";

}

// Get the modal
var modal = document.getElementById('myModal');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

//disable cards
function disable() {
    allCards.forEach(function (card) {
        card.classList.add('disabled');
    });
}

//enable cards and disable matched cards
function enable() {
    allCards.forEach(function (card) {
        card.classList.remove('disabled');
        for (var i = 0; i < CompletedCards.length; i++) {
            CompletedCards[i].classList.add("disabled");
        }
    });
}

// Start the game
initGame();

let allCards = document.querySelectorAll('.card');

// set up the event listener for cards
allCards.forEach(function (card) {
    card.addEventListener('click', function (e) {

        if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {

            card.classList.add('open', 'show');
            openCards.push(card);

            if (openCards.length == 1) {
                if (moves == 0) {
                    timer(); //stating the timer with first move
                }

            }

            if (openCards.length == 2) {
                // if they match, show

                if (openCards[0].dataset.card == openCards[1].dataset.card) {
                    openCards[0].classList.add('match');
                    openCards[0].classList.remove('open');
                    openCards[0].classList.remove('show');

                    openCards[1].classList.add('match');
                    openCards[1].classList.remove('open');
                    openCards[1].classList.remove('show');

                    CompletedCards.push(openCards[0]);
                    CompletedCards.push(openCards[1]);

                    openCards = [];
                }
                // else if they do not match, hide
                else {
                    disable();
                    setTimeout(function () {
                        openCards.forEach(function (card) {
                            card.classList.remove('open', 'show');
                            enable();
                        });

                        openCards = [];
                    }, 1000);

                }

                // increase moves and change rating based on them
                moves += 1;
                moveCounter.innerText = moves;
                if (moves > 8) {
                    star3.classList.remove("checked");
                }
                if (moves > 14) {
                    star2.classList.remove("checked");
                }
                if (moves > 19) {
                    star1.classList.remove("checked");
                }
            }

        }
        // when completed cards are 16, the user wins
        if (CompletedCards.length == 16) {
            winGame();
        }
    });
});