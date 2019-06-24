
class word {

    constructor(val) {
        this.name = val.toLowerCase();
        this.arr = this.name.split("");
        this.progress = Array(this.arr.length).fill("_");
        this.badGuesses = [];
        this.wrongCount = 0;
    }

    docProgress() {
        document.getElementById("progress").innerHTML = this.progress;
    }

    docBadGuesses() {
        document.getElementById("badGuesses").innerHTML = this.badGuesses;
        var asteroid = document.getElementById("asteroid")
        var pos = 0;
        var interval = setInterval(frame, 10);
        function frame() {
            if (pos == 350) {
                clearInterval(interval);
            } else {
                pos++;
                asteroid.style.top = pos + 'px';
                asteroid.style.left = pos + 'px';
            }
        }
    }

    isLetter(val) {
        var letters = /^[A-Za-z]+$/;
        return val.match(letters);
    }

    guessLetter(letter) {
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
            } else {
                this.badGuesses.push(letter);
                this.wrongCount++;
                this.docBadGuesses();

            }
        }
    }
}

function game() {
    var guessMe = new word("blah");
    guessMe.docProgress();
    guessMe.docBadGuesses();
    document.getElementById("instruction").innerHTML = "Key your guesses at will, but be wise...";
    document.onkeyup = function (event) {
        var letter = event.key;
        guessMe.guessLetter(letter.toLowerCase());
        if (guessMe.progress.indexOf("_") === -1) {
            document.getElementById("instruction").innerHTML = "You Won!!!";
            if (confirm("You won!!!\nWould you like to try again?")) {
                game();
            }
        }
        if (guessMe.wrongCount === 10) {
            document.getElementById("instruction").innerHTML = "You Lost :'(";
            if (confirm("You Lost :'(\nTry again?")) {
                game();
            }
        }
    }
}