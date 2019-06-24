
class word {
    constructor(val) {
        this.name = val.toLowerCase();
        this.arr = this.name.split("");
        this.progress = Array(this.arr.length).fill("_");
        this.badGuesses = [];
        this.wrongCount = 0;
        this.docProgress = function () {
            document.getElementById("progress").innerHTML = this.progress;
        }
        this.docBadGuesses = function () {
            document.getElementById("badGuesses").innerHTML = this.badGuesses;
        }
        this.guessLetter = function (letter) {
            if (isLetter(letter) && letter.length===1) {
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
                    if (this.progress.indexOf("_") === -1) {
                        document.getElementById("instruction").innerHTML = "You Won!!!";
                    }
                } else {
                    this.badGuesses.push(letter);
                    this.wrongCount++;
                    this.docBadGuesses();
                    if (this.wrongCount===10) {
                        document.getElementById("instruction").innerHTML = "You Lost :'(";
                    }
                }
            }
        }
    }
}

function isLetter(val) {
    var letters = /^[A-Za-z]+$/;
    return val.match(letters);
}

function game() {
    var guessMe = new word("blah");
    guessMe.docProgress();
    guessMe.docBadGuesses();
    document.getElementById("instruction").innerHTML = "Key your guesses at will, but be wise...";
    document.onkeyup = function (event) {
        var letter = event.key;
        guessMe.guessLetter(letter);
    }
}