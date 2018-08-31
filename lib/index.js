'use strict';

var _lib = require('./lib.js');

const fs = require('fs');

// TODO read in the file createPrompt.json, run the object read in through createPrompt,
// pass the result of createPrompt to chooseRandom, and then save the result to
// cp_solutions.json
// TODO import readFile, writeFile, chooseRandom, createPrompt, and createQuestions
let reader = JSON.parse(fs.readFileSync('/Users/jacobhazelton/repos/vs/js-assignment-3-jhazelton1/lib/createPrompt.json', 'utf8', err => {
  if (err) {
    console.log(err);
  }
  console.log('File was read');
}));

let createdPrompts = (0, _lib.createPrompt)(reader);

let randomized = (0, _lib.chooseRandom)(createdPrompts, 10);
fs.writeFileSync('/Users/jacobhazelton/repos/vs/js-assignment-3-jhazelton1/lib/cp_solutions.json', JSON.stringify(randomized), 'utf8', err => {
  if (err) {
    console.log(err);
  }
  console.log('Success!');
});

// TODO read the file createQuestions.json. Pass the read in object to createQuestions,
// pass its result to chooseRandom, and then save the final result to cq_solutions.json

let questionsReader = JSON.parse(fs.readFileSync('/Users/jacobhazelton/repos/vs/js-assignment-3-jhazelton1/lib/createQuestions.json', 'utf8', err => {
  if (err) {
    console.log(err);
  }
  console.log('Second File Read');
}));

let createdQuestions = (0, _lib.createQuestions)(questionsReader);

let randomizedQuestions = (0, _lib.chooseRandom)(createdQuestions, 5);
fs.writeFileSync('/Users/jacobhazelton/repos/vs/js-assignment-3-jhazelton1/lib/cq_solutions.json', JSON.stringify(randomizedQuestions), 'utf8', err => {
  if (err) {
    console.log(err);
  }
  console.log('Success! Again!');
});