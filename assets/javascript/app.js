var wins = 0;
var losses = 0;
countdownRunning = false;

var questions = [
    {
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


// Display start screen with start button

// User presses start button to begin game

// Card shown with questions and answers. 
// Unpack data, display answers and create data attributes. Start countdown timer. 

// if user clicks an answer, check if it's correct
// Check data value of clicked element and compare to correct answer
// If user selects correct answer, increment wins, show congrats screen for 5 seconds, show next question
// If countdown finishes, lose.

console.log(questions[0]);