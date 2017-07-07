var winCountValue = document.getElementById('winCount');

var lastGuessText = document.getElementById( 'lastGuessText' );
var guessDisplay = document.getElementById( 'guess' );
var resultText = document.getElementById( 'resultText' );

var minInputVisible = document.getElementById('minInput');
var maxInputVisible = document.getElementById('maxInput');

var minInputValue = document.getElementById( 'minInput' ).value;
var maxInputValue = document.getElementById( 'maxInput' ).value;

var setRangeButton = document.getElementById('buttonSetRange');
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

function generateRandomNumber( min, max ) {
  return Math.floor( Math.random() * max + 1 );
}

// =============
// = Set Range =
// =============

function setRange(){
  event.preventDefault();

  minInputValue = document.getElementById( 'minInput' ).value;
  maxInputValue = document.getElementById( 'maxInput' ).value;

  minInput = parseInt( minInputValue );
  maxInput = parseInt( maxInputValue );

  solution = generateRandomNumber( minInput, maxInput );
}

function expandRange() {
  minInput -= 10;
  maxInput += 10;
}

function increaseWinCount () {
  winCount += 1;
  winCountValue.innerText = winCount;
}

// ====================
// = Display and Hide =
// ====================

function showElement(element) {
  element.style.visibility = "visible";
}

function hideElement(element) {
  element.style.visibility = "hidden";
}

function showGuessDisplay() {

}

function hideGuessDisplay() {

}

function showRangeDisplay() {
  var display = document.getElementById('range-inputs');
  display.style.visibility = "visible";
}

function hideRangeDisplay() {
  var display = document.getElementById('range-inputs');
  display.style.visibility = "hidden";
}

function showErrorMessageDisplay() {
  var display = document.getElementById('');
  display.style.visibility = "visible";

}

function hideErrorMessageDisplay() {
  var display = document.getElementById('');
  // display.style.visibility = "visible";
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

    hideErrorMessageDisplay();
    lastGuessText.innerText = "Your last guess was";

    guessDisplay.style.visibility = "visible";
    guessDisplay.innerText = guessInputValue;

    resultText.style.visibility = "visible";

    resetButton.disabled = false;

    if ( parsed === solution ) {
      resultText.innerText = "BOOM!";
      win();
    } else if ( parsed > solution ) {
      resultText.innerText = "That is too high";
    } else if ( parsed < solution ) {
      resultText.innerText = "That is too low";
    }
  }
}

function win() {
  // Make game more difficult
  expandRange();
  // Generate new solution
  solution = generateRandomNumber(minInput, maxInput);
  console.log(solution);
  // Toggle Range
  showRangeDisplay();

  // set input values to new range
  minInputVisible.value = minInput;
  maxInputVisible.value = maxInput;


  // User sees how far they've gone
  winCount += 1;
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
      showErrorMessage();
      errorCause.innerText = emptyStringErrorText;
    } else {
      showErrorMessage();
      errorCause.innerText = notANumberErrorText;
    }
  } else if ( isNaN(parsed) === false){
    console.log("Min: ", min, "Max: ", max)
    if ( input < min || input > max ) {
      console.log("Input: ", input, "Min: ", min, "Max: ", max);
      errorMessageDisplay.style.visibility = "visible";
      errorCause.innerText = outOfRangeErrorText;
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
    clearButton.disabled = true;
  } else {
    clearButton.disabled = false;
  }
});

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
  lastGuessText.innerText = "You haven't made a guess yet";
  document.getElementById( 'guess' ).style.visibility = 'hidden';
  document.getElementById( 'resultText' ).style.visibility = 'hidden';
  resetButton.disabled = true;
  generateRandomNumber(minInput, maxInput);
  hideRangeDisplay();
  clearButton.disabled = true;
}
