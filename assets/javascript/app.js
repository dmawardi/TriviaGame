var wins = 0;
var losses = 0;
countdownRunning = false;
var secondsLeft = 30;

// display elements
var timerDisplay = $('#timerDisplay');
var option1 = $('#option-1');
var option2 = $('#option-2');
var option3 = $('#option-3');
var option4 = $('#option-4');


var questions = [{
        question: 'Question 1',
        answers: {
            a: 'honolulu',
            b: 'slavery',
            c: 'correct',
        },
        correctAnswer: 'c',
    },
    {
        question: 'Question 2',
        answers: {
            a: 'honolulu',
            b: 'slavery',
            c: 'correct',
        },
        correctAnswer: 'c',
    },
    {
        question: 'Question 3',
        answers: {
            a: 'honolulu',
            b: 'slavery',
            c: 'correct',
        },
        correctAnswer: 'c',
    },

]

function questionTimer() {

    if (!countdownRunning) {
        countdownRunning = true;

        var timer = setInterval(function () {
            // reduce seconds left by 1
            secondsLeft--;

            // Display to user
            timerDisplay.text(secondsLeft);


            console.log(secondsLeft);
            if (secondsLeft == 0) {
                // Stop timer
                clearInterval(timer);
                console.log('timer cleared');
            }
        }, 1000);


    }

}

function displayQuestion() {
    option1.text(questions[0].answers[0]);
    option2.text(questions[0].answers[0]);
    option3.text(questions[0].answers[0]);
    option4.text(questions[0].answers[0]);

}

// Display start screen with start button

// User presses start button to begin game

// Card shown with questions and answers. 
// Unpack data, display answers and create data attributes. Start countdown timer. 

// if user clicks an answer, check if it's correct
// Check data value of clicked element and compare to correct answer
// If user selects correct answer, increment wins, show congrats screen for 5 seconds, show next question
// If countdown finishes, lose.

console.log(questions[0]);
questionTimer();