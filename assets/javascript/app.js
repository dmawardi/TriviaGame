var wins = 0;
var losses = 0;
countdownRunning = false;
var secondsLeft = 30;

// display elements
var timerDisplay = $('#timerDisplay');

var questions = [{
        question: 'Question 1',
        answers: {
            a: 'honolulu',
            b: 'slavery',
            c: 'correct',
            d: 'bahlul'
        },
        correctAnswer: 'c',
    },
    {
        question: 'Question 2',
        answers: {
            a: 'honolulu',
            b: 'slavery',
            c: 'correct',
            d: 'kullie'
        },
        correctAnswer: 'c',
    },
    {
        question: 'Question 3',
        answers: {
            a: 'honolulu',
            b: 'slavery',
            c: 'correct',
            d: 'bully'
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

            if (secondsLeft == 0) {
                // Stop timer
                clearInterval(timer);
                console.log('timer cleared');
            }
        }, 1000);


    }

}

function displayQuestion(qIndex) {
    var playArea = $('#playArea');
    // Array needed for loop to convert index to option value
    var optionConverterArray = ['a', 'b', 'c', 'd'];

    // Create question
    questionText = $('<p>');
    questionText.attr('id', 'question');
    // Display to user
    questionText.text(questions[parseInt(qIndex)].question);

    // Append question to play area
    playArea.append(questionText);

    // Loop to Create Option buttons
    for (var i = 0; i < optionConverterArray.length; i++) {
        // Create button
        var option = $('<button>');
        console.log('index'+i+'converter'+optionConverterArray[i]);
        // Display option text for user by accessing element in questions object using converter array
        option.text(questions[qIndex].answers[optionConverterArray[i]]);
        // Build Button element
        option.addClass('btn btn-outline-primary btn-lg btn-block');
        option.attr('type', 'button');
        // Build loop/option specific attributes
        option.attr('data-optionValue', optionConverterArray[i]);
        option.attr('id', 'option-' + optionConverterArray[i]);
        // Append button to play area
        playArea.append(option);
    }
}

// Event handler for buttons within playArea id
$('#playArea').on('click', 'button', function(){

    console.log(this);

});

// Display start screen with start button

// User presses start button to begin game

// Card shown with questions and answers. 
// Unpack data, display answers and create data attributes. Start countdown timer. 

// if user clicks an answer, check if it's correct
// Check data value of clicked element and compare to correct answer
// If user selects correct answer, increment wins, show congrats screen for 5 seconds, show next question
// If countdown finishes, lose.

console.log(questions[0]);

displayQuestion(0);
questionTimer(0);