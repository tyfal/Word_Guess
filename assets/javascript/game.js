
var won = 0;
var lost = 0;
var keyInput = true;

class word {

    constructor(val) {
        this.name = val.toLowerCase();
        this.arr = this.name.split("");
        this.progress = Array(this.arr.length).fill("_");
        this.badGuesses = [];
        this.wrongCount = 0;
    }

    docProgress() {
        document.getElementById("progress").innerHTML = this.progress.join(" ");
    }

    docBadGuesses() {
        document.getElementById("badGuesses").innerHTML = this.badGuesses.join(", ");
        document.getElementById("guessesLeft").innerHTML = "You have " + (10 - this.wrongCount) + " guesses left";
    }

    moveAsteroid() {
        var asteroid = document.getElementById("asteroid");
        var pos = 0;
        var xPos = 0
        var interval = setInterval(frame, 5);
        function frame() {
            if (pos == 300) {
                clearInterval(interval);
                pos = 0;
                xPos = 0;
            } else {
                pos++;
                xPos += 5;
                asteroid.style.top = pos + 'px';
                asteroid.style.left = xPos + 'px';
            }
        }
    }

    isLetter(val) {
        var letters = /^[A-Za-z]+$/;
        return val.match(letters);
    }

    guessLetter(letter) {
        keyInput = false;
        if (this.isLetter(letter) && letter.length === 1) {
            var guess = letter.toLowerCase();
            var match = false;
            for (var i = 0; i < this.arr.length; i++) {
                if (this.arr[i] === letter) {
                    match = true;
                    this.progress[i] = guess;
                }
            }
            if (match) {
                this.docProgress();
                keyInput = true;
            } else {
                this.badGuesses.push(letter);
                this.wrongCount++;
                this.moveAsteroid();
                this.docBadGuesses();
                setTimeout(function() {
                    keyInput = true;
                }, 1500);
            }
        }
    }
}

function game() {
    var wordList = ["blah", "red", "space", "super", "alien", "doctor"];
    var randomWord = wordList[Math.floor(Math.random() * wordList.length)];
    var guessMe = new word(randomWord);
    guessMe.docProgress();
    guessMe.docBadGuesses();
    document.getElementById("instruction").innerHTML = "Key your guesses at will, but be wise...";
    document.getElementById("guessesLeft").innerHTML = "You have " + (10 - guessMe.wrongCount) + " guesses left";
    document.getElementById("gamesWon").innerHTML = "Games won: " + won;
    document.getElementById("gamesLost").innerHTML = "Games lost: " + lost;
    document.onkeyup = function (event) {
        if (keyInput) {
            var letter = event.key;
            guessMe.guessLetter(letter.toLowerCase());
            if (guessMe.progress.indexOf("_") === -1) {
                won ++;
                document.getElementById("instruction").innerHTML = "You Won!!!";
                document.getElementById("gamesWon").innerHTML = "Games won: " + won;
                if (confirm("You won!!!\nGreat job guessing \""+guessMe.name+"\".\nWould you like to try again?")) {
                    game();
                }
            }
            if (guessMe.wrongCount === 10) {
                lost ++;
                document.getElementById("instruction").innerHTML = "You Lost :'(";
                if (confirm("You Lost :'(\nYou failed to guess \""+guessMe.name+"\".\nTry again?")) {
                    document.getElementById("gamesLost").innerHTML = "Games lost: " + lost;
                    game();
                }
            }
        }
    }
}