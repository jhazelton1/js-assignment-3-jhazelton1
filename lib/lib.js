'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// TODO copy chooseRandom() from previous assignment
const chooseRandom = exports.chooseRandom = (array = [], numItems) => {
  const getRandomInt = max => {
    return Math.floor(Math.random() * Math.floor(max));
  };

  if (array.length < 2) {
    return array;
  }

  if (numItems > array.length) {
    numItems = getRandomInt(array.length - 1) + 1;
  }

  const randomIndices = Array(numItems).fill().reduce((res, next) => {
    let r = getRandomInt(array.length);
    while (res.includes(r)) {
      r = getRandomInt(array.length);
    }
    res.push(r);
    return res;
  }, []);
  return randomIndices.map(x => array[x]);
};

// TODO copy createPrompt() from previous assignment
const checker = obj => {
  if (typeof obj !== 'object') {
    return { numQuestions: 1, numChoices: 2 };
  }

  if (typeof obj['numQuestions'] !== 'number') {
    return { numQuestions: 1, numChoices: 2 };
  }

  if (typeof obj['numChoices'] !== 'number') {
    return { numQuestions: 1, numChoices: 2 };
  }

  return obj;
};

const createPrompt = exports.createPrompt = createPromptObject => {
  createPromptObject = checker(createPromptObject);

  let createPromptArray = [];
  for (let i = 1; i <= createPromptObject.numQuestions; i++) {
    createPromptArray.push({
      type: 'input',
      name: `question-${i}`,
      message: `Enter question ${i}`
    });
    for (let j = 1; j <= createPromptObject.numChoices; j++) {
      createPromptArray.push({
        type: 'input',
        name: `question-${i}-choice-${j}`,
        message: `Enter answer choice ${j} for question ${i}`
      });
    }
  }
  return createPromptArray;
};

// TODO implement createQuestions()
const createQuestions = exports.createQuestions = createQuestionsObject => {
  typeof createQuestionsObject !== 'object' ? createQuestionsObject = {} : createQuestionsObject;

  const getQuestions = obj => {
    return Object.keys(obj).filter(i => i.match(/question-.$/));
  };

  const getChoices = (obj, num) => {
    let name = /question-/;
    let choice = /-choice/;
    let regex = RegExp(name.source + num + choice.source);

    return Object.keys(obj).filter(i => i.match(regex));
  };

  const getValue = (obj, valueName) => {
    return obj[valueName] === undefined ? '' : obj[valueName];
  };

  let createQuestionsArray = [];

  for (let i = 0; i < getQuestions(createQuestionsObject).length; i++) {
    createQuestionsArray.push({
      type: 'list',
      name: getQuestions(createQuestionsObject)[i],
      message: createQuestionsObject[getQuestions(createQuestionsObject)[i]],
      choices: getChoices(createQuestionsObject, i + 1).map(e => getValue(createQuestionsObject, e))
    });
  }

  return createQuestionsArray;
};

exports.default = {
  chooseRandom,
  createPrompt,
  createQuestions

  // TODO export above functions

};