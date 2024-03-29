var wins = 0;
var losses = 0;
countdownRunning = false;
var secondsLeft = 30;
var currentQuestion;
var qTimer;
var gratsTimer;
var completedQuestions = [];

// display elements
var timerDisplay = $('#timerDisplay');
var timeText = $('#timeText');

// list of images to display to user for win/loss situations
var loseGifs = ['loseImg1.gif', 'loseImg2.gif', 'loseImg3.gif', 'loseImg4.gif', 'loseImg5.gif', 'loseImg6.gif'];
var winGifs = ['winImg1.gif', 'winImg2.gif', 'winImg3.gif', 'winImg4.gif', 'winImg5.gif', 'winImg6.gif'];


// Clears the interval for the question timer
function stopQuestionTimer() {
    // Stop timer
    clearInterval(qTimer);
    countdownRunning = false;
}

// Starts timer for question. decrements once a second and triggers times up displayWInLoss if timer hits 0
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
// Displays following question if game is not finished or score screen if finished
function gratsTimeOut() {
    // Set timer to 5 to start
    var gratsSecsLeft = 5;
    // Display seconds left to user
    timerDisplay.text(gratsSecsLeft);

    gratsTimer = setInterval(function () {
        // reduce seconds left by 1
        gratsSecsLeft--;
        // Display to user
        timerDisplay.text(gratsSecsLeft);

        // If timer reaches 0
        if (gratsSecsLeft == 0) {
            // Stop timer
            clearInterval(gratsTimer);
            // Determine if game is finished or continuing
            gameCompleteCheck();

        }
    }, 1000);
}

// Displays win, loss or if times up animation. Then triggers grats timeout at end
function displayWinLoss(winOrLose) {
    var playArea = $('#playArea');

    // Clear play area & hide time remaining text
    playArea.empty();
    timeText.hide();

    // Create section elements
    var message = $('<p>');
    var image = $('<img>');
    image.addClass('rounded mx-auto d-block');

    // If win
    if (winOrLose === 'win') {
        // Increment Wins
        wins++;
        // Display to user
        message.text("That's correct!");
        // Customize win image
        image.attr('alt', 'win!');
        // Generate a random index from winGifs array and apply to image
        image.attr('src', 'assets/images/' + winGifs[Math.floor(Math.random() * winGifs.length)]);

        // If loss detected
    } else if (winOrLose === 'lose') {

        // Increment losses
        losses++;
        // Display to user
        message.text('That is incorrect!');
        // Customize win image
        image.attr('alt', 'lose!'); {
            /* Generate a random index from winGifs array and apply to image */
        }
        image.attr('src', 'assets/images/' + loseGifs[Math.floor(Math.random() * loseGifs.length)]);

        // Else, if time's up
    } else if (winOrLose === 'timesUp') {

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

    // Timeout 5 seconds then determine if game complete or to continue
    gratsTimeOut();

}

// Display start elements and Start button
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

// Display calculated Score and restart screen
function displayScoreScreen() {
    var playArea = $('#playArea');
    // Clear play area
    playArea.empty();

    // Create text section
    var message = $('<p>');
    var scoreText = $('<p>');
    // Calculate % score from total
    var score = (wins / (wins + losses)) * 100;

    message.text('Game Complete!');

    // If score is 
    if (score >= 60) {
        scoreText.text('Congrats! Your score is: ' + score);

    // Else if score is less
    } else {
        scoreText.text('Sorry! You have lost with a score of: ' + score);
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

// Loop looking for random value until non-repeat value found
function randomNotRepeat() {
    // Satisfy loop condition by assigning randomquestion value in array
    var randomQuestion = completedQuestions[0];

    // Continue to generate random number until
    while (completedQuestions.includes(randomQuestion)) {
        randomQuestion = Math.floor(Math.random() * questions.length);
    }
    return randomQuestion
}

// Deteremine if game is still going
function gameCompleteCheck() {
    // Are total games at max? (10). If yes, 
    if (wins + losses < 10) {
        // Show timer again
        timeText.show();
        // Generate random question to display
        currentQuestion = randomNotRepeat();
        // Add to list of completed questions
        completedQuestions.push(currentQuestion);
        // Display to user
        displayQuestion(currentQuestion);
    } else {
        // Display Score Screen with restart button
        displayScoreScreen();
    }

}

// Display question and selection options
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

// Event handler for buttons within playArea
$('#playArea').on('click', 'button', function () {
    // If option buttons clicked
    if ($(this).attr('id') !== 'startBtn') {
        var pressedOption = $(this).attr('data-optionValue');

        stopQuestionTimer();

        if (pressedOption === questions[currentQuestion].correctAnswer) {
            displayWinLoss('win');
            // Checks if game is complete and if not, displays new question

        } else {
            displayWinLoss('lose');
            // Checks if game is complete and if not, displays new question
        }

        // Start button clicked
    } else if ($(this).attr('id') == 'startBtn') {
        // Reset stats
        wins = 0;
        losses = 0;
        timerDisplay.text(secondsLeft);
        // Reset Completed Questions
        completedQuestions = [];
        // User presses start button to begin game
        // Generate initial random question. 
        currentQuestion = Math.floor(Math.random() * questions.length);
        completedQuestions.push(currentQuestion);
        displayQuestion(currentQuestion);
    }

});

// Start of Arguments
// Display start screen with start button
// Start of game is handled by event handler above
displayStartScreen();