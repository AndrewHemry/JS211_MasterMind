'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let board = [];
let solution = '';
let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
let correctLetters = 0;
let correctLetterLocations = 0;
let numberOfTurns = 10;

const printBoard = () =>  {
  for (let i = 0; i < board.length; i++) {
    console.log(board[i]);
  }
}

const generateSolution = () =>  {
  for (let i = 0; i < 4; i++) {
    const randomIndex = getRandomInt(0, letters.length);
    solution += letters[randomIndex];
  }
}

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
}

const generateHint = (guess) =>  {
  let solutionArray = solution.split("");
  let guessArray = guess.split("");
  console.log(solutionArray);
  console.log(guessArray);

  // This for loop is to increase the correct letters guessed counter and remove the first matching array value
  for (let i = 0; i < solutionArray.length; i++) {
    if (solutionArray[i] === guessArray[i]) {
      correctLetterLocations++;
      solutionArray[i] = null
    }
  }

  // This for loop is to compare the Guess & Solution Array, then remove any duplicate letters that may match the original indexed value
  for (let i = 0; i < solutionArray.length; i++) {
    let indexLetterGuessed = guessArray[i]
    let targetIndex = solutionArray.indexOf(indexLetterGuessed)
    if (targetIndex !== -1)  //Can this be !==?
    { 
      correctLetters++;
      solutionArray[targetIndex] = null
    }
  }
  

  const hint = `Your guess was ${guess}. The number of correct letters NOT in the proper location is currently ${correctLetters}, with ${correctLetterLocations} of the correct letters in the proper location. You have ${numberOfTurns} turns remaining! Choose wisly.`;
  board.push(hint);

  // This is to reset the number of both correct letter variables so they don't consistently add
  correctLetterLocations = 0;
  correctLetters = 0;

}

const mastermind = (guess) => {
  // Comment this out to generate a random solution
  solution = 'abcd';

  if (guess == solution) {
    console.log("You guessed it!")
    return "You guessed it!";
    } else if (numberOfTurns == 0) { 
     console.log(`You have ran out of turns! The solution was ${solution}. Reset and try again.`)
     return `You have ran out of turns! The solution was ${solution}. Reset and try again.`
    } else {
    numberOfTurns--
    generateHint(guess)
  }
}


const getPrompt = () =>  {
  rl.question('guess: ', (guess) => {
    mastermind(guess);
    printBoard();
    getPrompt();
  });
}

// Tests

if (typeof describe === 'function') {
  solution = 'abcd';
  describe('#mastermind()', () => {
    it('should register a guess and generate hints', () => {
      mastermind('aabb');
      assert.equal(board.length, 1);
    });
    it('should be able to detect a win', () => {
      assert.equal(mastermind(solution), 'You guessed it!');
    });
  });

  describe('#generateHint()', () => {
    it('should generate hints', () => {
      assert.equal(generateHint('abdc'), '2-2');
    });
    it('should generate hints if solution has duplicates', () => {
      assert.equal(generateHint('aabb'), '1-1');
    });

  });

} else {

  generateSolution();
  getPrompt();
}