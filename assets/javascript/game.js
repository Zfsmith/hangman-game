
var words = ["rick", "morty", "jerry", "summer", "beth","tinyrick","mrmeeseeks","scarryterry","birdperson","squanchy","sleepygary"]

var rand = "";
var word = "";
var blanks = [];
var guesses = 0;
var letters = [];
var wins = 0;
var losses = 0;
var lock = false;
var alpha = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
var open = new Audio('assets/sounds/soda.wav');
var dis = new Audio('assets/sounds/dis.wav');
var got = new Audio('assets/sounds/got.wav');

start();

function sleep(ms){
	return new Promise(resolve =>setTimeout(resolve, ms));
}

function reset(){
	lock = false
	open.play();
	start();
}




function start(){
	rand = Math.floor(Math.random() * words.length)
	word = words[rand];
	blanks = [];
	guesses = 10;
	letters = [];

	console.log(word);

	//create array of "_ "
	for (i=0; i<word.length; i++){
		blanks.push('_');
	}
	
	//join the "_ " array into a string.
	console.log(blanks.join(" "));
	document.querySelector("#input").innerHTML = (blanks.join(" "));
	document.querySelector("#letters").innerHTML = (letters);
	document.querySelector("#guesses").innerHTML = (guesses);
	document.querySelector("#score").innerHTML = ("Wins: "+ wins + " Losses: "+ losses);
	}
//refresh the game board
function refresh(x){
	console.log(x);
	blanks[x] = word[i] + " ";
	document.querySelector("#input").innerHTML = (blanks.join(" "));
	
}
console.log(blanks);

document.onkeyup = function(event){

	var letterstest = false;

	for(i=0;i<alpha.length;i++){
		if(event.key === alpha[i]){
			letterstest = true;
		}
	}


	//get user input
	if(!lock && letterstest){
		console.log(event.key);

		var test = false;
		var scoretest = false;
		var wintest = true;

		for (j = 0; j < letters.length; j++){
			if (event.key === letters[j]){
				test = true;
			}
		}
		
		if(!test){
			for (i = 0; i < word.length; i++){
				if (event.key === word[i]){
				refresh(i);
				var scoretest = true;
				}
			}
			if(!scoretest){
				guesses--;
				document.querySelector("#guesses").innerHTML = (guesses);
			}
			letters.push(event.key);
			document.querySelector("#letters").innerHTML = (letters);
		}
		for (k=0; k < blanks.length; k++){
			//console.log(blanks[k]);
			if(blanks[k] === '_'){
				wintest = false;
			}
		}

		
		if (wintest){
			document.querySelector("#input").innerHTML = ("You Win!!!!!");
				lock = true;
				got.play();
				wins++;
				document.querySelector("#score").innerHTML = ("Wins: "+ wins + " Losses: "+ losses);
				//start();
				

			}else
			if(guesses <= 0){
				//console.log(guesses);
				document.querySelector("#input").innerHTML = ("You Lose.....");
				lock = true;
				dis.play();
				losses++;
				document.querySelector("#score").innerHTML = ("Wins: "+ wins + " Losses: "+ losses);
				//start();
		}			
	}
}
