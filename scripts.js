var formInput = document.getElementById( 'formInput' );
var formInputValue = formInput.value;

var guessButton = document.getElementById( 'buttonGuess' );
var clearButton = document.getElementById( 'buttonClear' );
var resetButton = document.getElementById( 'buttonReset' );

guessButton.addEventListener( 'click', updateGuess );
clearButton.addEventListener( 'click', clearGuess );
resetButton.addEventListener( 'click', resetGuess );

var minimum = 1;
var maximum = 100;

var solution = generateRandomNumber( minimum, maximum );

// ================
// = Guess Button =
// ================

// Checks if user input is valid
// Returs true if input type is !NaN and is in min/max range
// Returns error message if input type is empty string, NaN, or number is outside min/max range

function checkGuess( input, minimum, maximum ) {
  event.preventDefault();

  var verified = verifyInput( input, minimum, maximum );

  console.log("Input: ", input);

  if ( verified === true ) {
      console.log("Minimum", minimum);
      console.log("Maximum", maximum);

    clearButton.disabled = false;
    resetButton.disabled = false;
  }
  else {
    return false;
  }
}

function verifyInput( input, min, max ) {
  const emptyStringErrorText = "No input detected";
  const notANumberErrorText = "Your guess must be a number";
  const outOfRangeErrorText = "Your guess must fall within 1 and 100";

  var errorMessageDisplay = document.getElementById( 'errorMessageDisplay' );
  var errorCause = document.getElementById( 'errorCause' );
}

// Returns true if user input is within min and max range.
// Returns false if number is outside min and max.
function isOutOfRange( input, min, max ) {
  if (input < min || input > max) {
    return true;
  }
  else {
    return false;
  }
}

function generateRandomNumber( min, max ) {
  var randomNumber = Math.floor( Math.random() * max + 1 );
  return randomNumber;
}

function updateGuess( input, minimum, maximum ) {

  var lastGuessTextt = document.getElementById( 'lastGuessText' )

  var guess = input;
  guess.innerHTML = guessVal;

  lastGuess.innerHTML = "Your last guess was";
  document.getElementById( 'guess' ).style.visibility = 'visible';
  document.getElementById( 'resultText' ).style.visibility = 'visible';
}


// ================
// = Clear Button =
// ================

// Clears text input area on clear button press
function clearGuess(event) {
  var form = document.getElementById('form');
  form.reset();
  clearButton.disabled = true;
}

// ================
// = Reset Button =
// ================

// Resets the gameboard after button on click
function resetGuess(event) {
  document.getElementById( 'lastGuessText' ).innerHTML = "You haven't made a guess yet";
  document.getElementById( 'guess' ).style.visibility = 'hidden';
  document.getElementById( 'resultText' ).style.visibility = 'hidden';
  resetButton.disabled = true;
  // TODO: Generate new random number on reset
}
