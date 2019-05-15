var Word = require('./Word.js');

var inquirer = require ('inquirer');

var letterArray = 'abcdefghijklmnopqrstuvwxyz';

var elements = [
'Hydrogen',
 'Helium',
 'Lithium',
 'Beryllium',
 'Boron',
 'Carbon',
 'Nitrogen',
 'Oxygen',
 'Fluorine',
 'Neon',
 'Sodium',
 'Magnesium',
 'Aluminum',
 'Silicon',
 'Phosphorus',
 'Sulfur',
 'Chlorine',
 'Argon',
 'Potassium',
 'Calcium',
 'Scandium',
 'Titanium',
 'Vanadium',
 'Chromium',
 'Manganese',
 'Iron',
 'Cobalt',
 'Nickel',
 'Copper',
 'Zinc',
 'Gallium',
 'Germanium',
 'Arsenic',
 'Selenium',
 'Bromine',
 'Krypton',
 'Rubidium',
 'Strontium',
 'Yttrium',
 'Zirconium',
 'Niobium',
 'Molybdenum',
 'Technetium',
 'Ruthenium',
 'Rhodium',
 'Palladium',
 'Silver',
 'Cadmium',
 'Indium',
 'Tin',
 'Antimony',
 'Tellurium',
 'Iodine',
 'Xenon',
 'Cesium',
 'Barium',
 'Lanthanum',
 'Cerium',
 'Praseodymium',
 'Neodymium',
 'Promethium',
 'Samarium',
 'Europium',
 'Gadolinium',
 'Terbium',
 'Dysprosium',
 'Holmium',
 'Erbium',
 'Thulium',
 'Ytterbium',
 'Lutetium',
 'Hafnium',
 'Tantalum',
 'Tungsten',
 'Rhenium',
 'Osmium',
 'Iridium',
 'Platinum',
 'Gold',
 'Mercury',
 'Thallium',
 'Lead',
 'Bismuth',
 'Polonium',
 'Astatine',
 'Radon',
 'Francium',
 'Radium',
 'Actinium',
 'Thorium',
 'Protactinium',
 'Uranium',
 'Neptunium',
 'Plutonium',
 'Americium',
 'Curium',
 'Berkelium',
 'Californium',
 'Einsteinium',
 'Fermium',
 'Mendelevium',
 'Nobelium',
 'Lawrencium',
 'Rutherfordium',
 'Dubnium',
 'Seaborgium',
 'Bohrium',
 'Hassium',
 'Meitnerium',
 'Darmstadtium',
 'Roentgenium',
 'Copernicium',
 'Nihonium',
 'Flerovium',
 'Moscovium',
 'Livermorium',
 'Tennessine',
 'Oga'
];

var randomIndex = Math.floor(Math.random() * elements.length);
var randomWord = elements[randomIndex];
var computerWord = new Word(randomWord);
var requiredNewWord = false;
var incorrectLetters = [];
var correctLetters = [];

var guessesLeft = 10;

function intialize() {
    if (requiredNewWord) {
        var randomIndex = Math.floor(Math.random() * elements.length);
        var randomWord = elements[randomIndex];
        computerWord = new Word(randomWord);
        requiredNewWord = false;

    }

    var wordComplete = [];
    computerWord.objArray.forEach(completeCheck);

    if(wordComplete.includes(false)) {
        inquirer.prompt([
            {
                type: 'input',
                message: 'Choose from A-Z',
                name: 'userinput'
            }
        ]).then(function(input) {
                if(!letterArray.includes(input.userinput) || input.userinput.length > 1) {
                    console.log('\nTry something else\n')
                    intialize();
                } else {
                    if (incorrectLetters.includes(input.userinput) || 
                    correctLetters.includes(input.userinput) || 
                    input.userinput === '') {
                        console.log('\n Already Guessed or Nothing was typed\n');
                        intialize();
                    } else {
                        var wordCheckArray = [];
                        computerWord.userGuess(input.userinput);
                        computerWord.objArray.forEach(wordCheck); 
                        if (wordCheckArray.join('') === wordComplete.join('')) {
                            console.log('\nWrong\n');
                            incorrectLetters.push(input.userinput);
                            guessesLeft--;
                        } else {
                            console.log('\nCorrect\n');
                            correctLetters.push(input.userinput);
                        }
                        computerWord.log();

                        console.log('Guesses Left: ' + guessesLeft + '\n');
                        console.log('Letters Guessed: '+ incorrectLetters.join(' ') + '\n')
                        if(guessesLeft > 0) {
                            intialize();
                        } else {
                            console.log('You lose\n');
                            restart();
                        }
                        function wordCheck(key) {
                            wordCheckArray.push(key.guessed);
                        }
                    }
                }
        });
    } else {
        console.log('Winner\n');
        restart();
    }
    function completeCheck(key) {
        wordComplete.push(key.guessed);
    }
}
function restart() {
    inquirer.prompt([
        {
            type: 'confirm',
            message: 'Do you want to play again?',
            name: 'restart'
        }
    ]).then(function(input) {
        if(input.restart === true) {
            requiredNewWord = true;
            incorrectLetters = [];
            correctLetters = [];
            guessesLeft = 10;
            intialize();
        } else {
            return;
        }
    });
}
intialize();