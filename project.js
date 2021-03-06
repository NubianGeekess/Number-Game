

                  /* WALKING THE DOM
    In other to alter documents and their content we need to:
      1)reach the corresponding DOM object. 
      2)get it into a varriable.
      3)then we cav modify it

    */
    	
    	//This genetates a random whole number between 1 - 100
var randomNumber = Math.floor(Math.random() * 100) + 1;

//this variables are used later to insert values in our result paragraphs later on in the code
var guesses = document.querySelector(".guesses");
var lastResult  = document.querySelector(".lastResult");
var lowOrHi = document.querySelector(".lowOrHi");

//these are used to control submitting the guess later on(the submit button and the text field input)
var guessSubmit = document.querySelector(".guessSubmit");
var guessField = document.querySelector(".guessField");

//the guess count is used to record the number of guesses. the reset button will exist later.
var guessCount = 1;
var resetButton;
guessField.focus();


function checkGuess() {
	//Number(checks if the input is a number), guessField.value(the input enterred by the user. n/b .value is the value to be sent to the server)
	var userGuess = Number(guessField.value);

	//checks if the user is on his first go at guessing
	if(guessCount === 1) {
		guesses.textContent = "Previous guesses: ";
	}
	//appends the users guess to the guess paragrapgh. the space is to maintain spaces between the guesses 
	guesses.textContent += userGuess + " ";

	if (userGuess === randomNumber) {
		lastResult.textContent = "you are correct";
		lastResult.style.backgrounColor = "green";
		lowOrHi.textContent = "";
		setGameOver();
	}
	else if (guessCount === 10) {
		lastResult.textContent = "You Lost. Game OVER! **wikced laugh, Hahaha";
	}
	else {
		lastResult.textContent = "Wrong!";
		lastResult.style.backgroundColor = "red";
		if (userGuess < randomNumber) {
			lowOrHi.textContent = "your guess is too low";
		}
		else if (userGuess > randomNumber) {
			lowOrHi.textContent = "your guess is too High. go lower";
		}

	}


	//to get us reeady for the next guess
	guessCount++
	guessField.value = ""; //empty the ext field
	guessField.focus()


}

//we want to call this function when the submit button is clicked. without calling the function it would not do anything.

//the two arguments of the eventListener method are what we are listening for and what we want to run when the code is clicked(what we are listenin for happens)

guessSubmit.addEventListener("click", checkGuess); //note we do no sopecify the paranthesis when using event listeners(checkGuess())


  function setGameOver() {
	//so that when the game is over you can not click on the textField nor the submit button
	guessField.disabled = True;
	guessSubmit.disabled = True;
	//create a new button so to refresh the game.
	resetButton = document.createElement("button");
	resetButton.textContent = "Start new Game";
	//all the two lines did was create the element, the next two adds them to the body of the  document
	resetButton.body.appendChild(resetButton)
	resetButton.addEventListener("click", resetGame);

}
	function resetGame(){
		guessCount = 1;

		var resetParas = document.querySelectorAll(".resultParas p");
		for (var i = 0; i < resetParas.length; i++) {
			resetParas[i].textContent = "";
		}

		resetButton.parentNode.removeChild("resetButton");
		guessField.disabled = false;
		guessSubmit.disabled = false;
		guessField.value = "";
		guessField.focus();
		lastResult.style.backgroundColor = "white";
		randomNumber = Math.floor(Math.random() * 100) + 1;	
	}