const fs = require('fs');
const path = require('path');

let file = fs.readFileSync(path.join(__dirname, '../data/words.txt'));

let words = file
  .toString()
  .split('\n')
  .filter(word => /[a-zA-Z]/.test(word[0]))
  .map(word => word.replace('\r', ''));

module.exports.getWords = () => words;

module.exports.getRandomWords = (countOfRandomWords) => {
  let randomWords = [];

  for (let i = 0; i < countOfRandomWords; i++) {
    randomWords.push(words[Math.floor(Math.random() * (words.length + 1))]);
  }

  return randomWords;
}
