var Letter = require('./letters.js');

function Word(answer) {
    this.objArray = [];

    for (var i = 0; i < answer.length; i++) {
        var letter = new Letter(answer[i]);
        this.objArray.push(letter);
    }

    this.log = function() {
        var answerlog = "";
        for (var i = 0; i < this.objArray.length; i++) {
            answerlog += this.objArray[i] + " ";
        }
        console.log(answerlog + "\n============\n");
    };

    this.userGuess = function(input) {
        for (var i  = 0; i < this.objArray.length; i++) {
            this.objArray[i].guess(input);
        }
    };
}

module.exports = Word;