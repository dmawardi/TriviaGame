var wins = 0;
var losses = 0;
countdownRunning = false;
var secondsLeft = 30;
var currentQuestion;
var qTimer;
var gratsTimer;

// display elements
var timerDisplay = $('#timerDisplay');

var loseGifs = ['loseImg1.gif', 'loseImg2.gif', 'loseImg3.gif', 'loseImg4.gif', 'loseImg5.gif', 'loseImg6.gif'];
var winGifs = ['winImg1.gif', 'winImg2.gif', 'winImg3.gif', 'winImg4.gif', 'winImg5.gif', 'winImg6.gif'];

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

function stopQuestionTimer() {
    // Stop timer
    clearInterval(qTimer);
    console.log('timer cleared');
    countdownRunning = false;
}

function questionTimer() {

    if (!countdownRunning) {
        countdownRunning = true;

        qTimer = setInterval(function () {
            // reduce seconds left by 1
            secondsLeft--;
            // Display to user
            timerDisplay.text(secondsLeft);

            if (secondsLeft == 0) {
                // Stop timer
                stopQuestionTimer();

                displayWinLoss('timesUp');
            }
        }, 1000);


    }

}

// Times the display of win/loss/timesup
// Displays following question if games not finished or score if finished
function gratsTimeOut() {
    var gratsSecsLeft = 5;
    timerDisplay.text('Gratz:' + gratsSecsLeft);

    gratsTimer = setInterval(function () {
        // reduce seconds left by 1
        gratsSecsLeft--;
        // Display to user
        timerDisplay.text('Gratz:' + gratsSecsLeft);

        console.log(gratsSecsLeft);
        if (gratsSecsLeft == 0) {
            // Stop timer
            clearInterval(gratsTimer);
            // Determine if game is finished or continuing
            gameCompleteCheck();

        }
    }, 1000);
}

function displayWinLoss(winOrLose) {
    var playArea = $('#playArea');

    // Clear play area
    playArea.empty();
    // Create text section
    var message = $('<p>');
    var image = $('<img>');
    image.addClass('rounded mx-auto d-block');

    if (winOrLose === 'win') {
        // Increment Wins
        wins++;
        // Display to user
        message.text('you Win');
        // Customize win image
        image.attr('alt', 'win!'); {
            /* Generate a random index from winGifs array and apply to image */
        }
        image.attr('src', 'assets/images/' + winGifs[Math.floor(Math.random() * winGifs.length)]);

        // Code for handling loss event
    } else if (winOrLose === 'lose') {
        console.log('you Lose');

        // Increment losses
        losses++;
        // Display to user
        message.text('you Lose');
        // Customize win image
        image.attr('alt', 'lose!'); {
            /* Generate a random index from winGifs array and apply to image */
        }
        image.attr('src', 'assets/images/' + loseGifs[Math.floor(Math.random() * loseGifs.length)]);

        // Else, Display times up
    } else if (winOrLose === 'timesUp') {
        console.log('you Lose. Because times up');

        // Increment losses
        losses++;

        // Display to user
        message.text('Times Up!');

        // Customize timesup image
        image.attr('alt', 'Times Up!'); {
            /* Generate a image for times up*/
        }
        image.attr('src', 'assets/images/timesUpImg.gif');
    }

    // Display to user
    playArea.append(message);
    playArea.append(image);
    gratsTimeOut();

}

function displayStartScreen() {
    var playArea = $('#playArea');
    // Clear play area
    playArea.empty();

    // Create text section
    var message = $('<p>');

    message.text('Press the Start button below to begin!');

    // Create Start Button
    var start = $('<button>');
    // Display option text for user by accessing element in questions object using converter array
    start.text('Start');
    // Build Button element
    start.addClass('btn btn-outline-primary btn-lg btn-block');
    start.attr('type', 'button');
    start.attr('id', 'startBtn');

    // Display to user
    playArea.append(message);
    playArea.append(start);

}

function displayScoreScreen() {
    var playArea = $('#playArea');
    // Clear play area
    playArea.empty();

    // Create text section
    var message = $('<p>');
    var scoreText = $('<p>');
    // Calculate % score from total
    var score = (wins / (wins+losses))*100;

    message.text('Game Complete!');

    // If score is 
    if (score >= 60) {
        scoreText.text('Congrats! Your score is: '+score);

    }
    else {
        scoreText.text('Sorry! You have lost with a score of: '+score);
    }

    // Create Start Button
    var restart = $('<button>');
    // Display option text for user by accessing element in questions object using converter array
    restart.text('Restart Game');
    // Build Button element
    restart.addClass('btn btn-outline-primary btn-lg btn-block');
    restart.attr('type', 'button');
    restart.attr('id', 'startBtn');

    // Display to user
    playArea.append(message);
    playArea.append(scoreText);
    playArea.append(restart);
}

function gameCompleteCheck() {
    if (wins + losses < 10) {
        // Generate random question to display
        currentQuestion = Math.floor(Math.random() * questions.length);
        console.log('Below 12 games. Next: ' + currentQuestion);
        displayQuestion(currentQuestion);
    } else {
        console.log('Game complete')
        // Display Score Screen
        displayScoreScreen();
    }

}

function displayQuestion(qIndex) {
    var playArea = $('#playArea');
    // Clear play area
    playArea.empty();
    // Array needed for loop to convert index to option value
    var optionConverterArray = ['a', 'b', 'c', 'd'];

    // Restart secondsLeft and start timer
    secondsLeft = 30;
    timerDisplay.text(secondsLeft);
    questionTimer();

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
$('#playArea').on('click', 'button', function () {
    var pressedOption = $(this).attr('data-optionValue');

    console.log(pressedOption);
    console.log('correct answer:' + questions[currentQuestion].correctAnswer);


    stopQuestionTimer();

    if (pressedOption === questions[currentQuestion].correctAnswer) {
        displayWinLoss('win');
        console.log('answer is correct! wins: ' + wins);
        // Checks if game is complete and if not, displays new question



    } else {
        displayWinLoss('lose');
        console.log('you lose. Losses: ' + losses);
        // Checks if game is complete and if not, displays new question
    }

});


// Display start screen with start button
displayStartScreen();

// User presses start button to begin game
$('#startBtn').on('click', function () {
    wins = 0;
    losses = 0;
    timerDisplay.text(secondsLeft);

    // Card shown with questions and answers. Starts timer 
    displayQuestion(0);
    currentQuestion = 0;
  

});

// if user clicks an answer, check if it's correct
// Check data value of clicked element and compare to correct answer
// If user selects correct answer, increment wins, show congrats screen for 5 seconds, show next question
// If countdown finishes, lose.