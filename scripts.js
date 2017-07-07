var winCountValue = document.getElementById('winCount');
var errorMessageDisplay = document.getElementById('errorMessageDisplay');

var lastGuessText = document.getElementById( 'lastGuessText' );
var guessDisplay = document.getElementById( 'guess' );
var resultText = document.getElementById( 'resultText' );

var winCountDisplay = document.getElementById( 'winCountDisplay' );
var winCountCounter = document.getElementById( 'winCountCounter')

var minMaxInput = document.getElementById('range-inputs');
var minInputVisible = document.getElementById( 'minInput' );
var maxInputVisible = document.getElementById( 'maxInput' );

var minInputValue = document.getElementById( 'minInput' ).value;
var maxInputValue = document.getElementById( 'maxInput' ).value;

var setRangeButton = document.getElementById( 'buttonSetRange' );
var guessButton = document.getElementById( 'buttonGuess' );
var clearButton = document.getElementById( 'buttonClear' );
var resetButton = document.getElementById( 'buttonReset' );

guessButton.addEventListener( 'click', checkGuess );
clearButton.addEventListener( 'click', clearGuess );
resetButton.addEventListener( 'click', resetGuess );
setRangeButton.addEventListener( 'click', setRange );


// Default level values
var winCount = 0;

// Default range values
var minInput = 1;
var maxInput = 100;

var solution = generateRandomNumber(minInput, maxInput);
console.log("Solution: ", solution)

// ==========================
// = Generate Random Number =
// ==========================

function generateRandomNumber ( min, max ) {
  return Math.floor( Math.random() * max + 1 );
}

// =============
// = Set Range =
// =============

function setRange () {
  event.preventDefault();

  minInputValue = document.getElementById( 'minInput' ).value;
  maxInputValue = document.getElementById( 'maxInput' ).value;

  minInput = parseInt( minInputValue );
  maxInput = parseInt( maxInputValue );

  solution = generateRandomNumber( minInput, maxInput );
}

function expandRange () {
  minInput -= 10;
  maxInput += 10;
}

function increaseWinCount () {
  winCount += 1;
  winCountValue.innerText = winCount;
}

// ====================
// = Display, Hide, Disable =
// ====================
function enableButton ( button ){
  button.disabled = false;
}

function disableButton ( button ) {
  button.disabled = true;
}

function showElement ( element ) {
  element.style.visibility = "visible";
}

function hideElement ( element ) {
  element.style.visibility = "hidden";
}

function changeText (element, value) {
  element.innerText = value;
}


// ================
// = Guess Button =
// ================

function checkGuess() {
  event.preventDefault();

  var guessInput = document.getElementById( 'formInput' );
  var guessInputValue = formInput.value;

  var parsed = parseInt(guessInputValue);
  var verified = verifyInput( guessInputValue, minInput, maxInput );

  if ( verified === true ) {
    showElement(lastGuessText);
    changeText(lastGuessText, "Your last guess was");

    showElement(guessDisplay);
    changeText(guessDisplay, guessInputValue);

    showElement(resultText);

    enableButton(resetButton);

      if ( parsed === solution ) {
        changeText(resultText, "BOOM!");
        win();
      } else if ( parsed > solution ) {
        changeText(resultText, "That is too high!");
      } else if ( parsed < solution ) {
        changeText(resultText, "That is too low");
      }
  }
}

function win() {
  // Make game more difficult
  expandRange();
  console.log("New Range: ", minInput, maxInput)
  solution = generateRandomNumber(minInput, maxInput);
  console.log("New Solution: ", solution);
  winCount += 1;
  changeText(winCountCounter, winCount);
  showElement(winCountDisplay);

  showElement(minMaxInput);

  // set input values to new range
  minInputVisible.value = minInput;
  maxInputVisible.value = maxInput;


  // User sees how far they've gone

}

function verifyInput( input, min, max ) {
  var errorMessageDisplay = document.getElementById( 'errorMessageDisplay' );
  var errorCause = document.getElementById( 'errorCause' );

  const emptyStringErrorText = "No input detected";
  const notANumberErrorText = "Your guess must be a number";
  const outOfRangeErrorText = "Your guess must fall within " + minInput + " and " + maxInput;

  var parsed = parseInt(input);

  if ( isNaN(parsed) === true) {
    if( input.length === 0) {
      showElement(errorMessageDisplay);
      errorCause.innerText = emptyStringErrorText;
    } else {
      showElement(errorMessageDisplay);
      errorCause.innerText = notANumberErrorText;
    }
  } else if ( isNaN(parsed) === false){
    console.log("Min: ", min, "Max: ", max)
    if ( input < min || input > max ) {
      console.log("Input: ", input, "Min: ", min, "Max: ", max);
      showElement(errorMessageDisplay);
      changeText(errorCause, outOfRangeErrorText);
      return false;
    } else {
      return true;
      }
    }
  }

// ================
// = Clear Button =
// ================

formInput.addEventListener('input', function() {
  if (formInput.value === ""){
    disableButton(clearButton);
  } else {
    enableButton(clearButton);
  }
});

// Clears text input area on clear button press
function clearGuess(event) {
  var form = document.getElementById('form');
  form.reset();
  disableButton(clearButton);
}

// ================
// = Reset Button =
// ================

// Resets the gameboard after button on click
function resetGuess(event) {
  lastGuessText.innerText = "You haven't made a guess yet";
  hideElement(guessDisplay);
  hideElement(resultText);
  disableButton(resetButton);
  minInput = 1;
  maxInput = 100;
  generateRandomNumber(1, 100);
  hideElement(minMaxInput);
  hideElement(winCountDisplay);
  winCount = 0;
}
