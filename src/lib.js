// TODO copy chooseRandom() from previous assignment
export const chooseRandom = (array = [], numItems) => {
  const getRandomInt = max => {
    return Math.floor(Math.random() * Math.floor(max))
  }

  if (array.length < 2) {
    return array
  }

  if (numItems > array.length) {
    numItems = getRandomInt(array.length - 1) + 1
  }

  const randomIndices = Array(numItems).fill().reduce((res, next) => {
    let r = getRandomInt(array.length)
    while (res.includes(r)) {
      r = getRandomInt(array.length)
    }
    res.push(r)
    return res
  }, [])
  return randomIndices.map(x => array[x])
}

// TODO copy createPrompt() from previous assignment
const checker = obj => {
  if (typeof obj !== 'object') {
    return { numQuestions: 1, numChoices: 2 }
  }

  if (typeof obj['numQuestions'] !== 'number') {
    return { numQuestions: 1, numChoices: 2 }
  }

  if (typeof obj['numChoices'] !== 'number') {
    return { numQuestions: 1, numChoices: 2 }
  }

  return obj
}
export const createPrompt = createPromptObject => {
  createPromptObject = checker(createPromptObject)

  const getQuestion = num => ({
    type: `input`,
    name: `question-${num}`,
    message: `Enter question ${num}`
  })

  const getChoice = (question, num) => ({
    type: 'input',
    name: `question-${question}-choice-${num}`,
    message: `Enter answer choice ${num} for question ${question}`
  })

  let createPromptArray = []
  for (let i = 1; i <= createPromptObject.numQuestions; i++) {
    createPromptArray.push(getQuestion(i))
    for (let j = 1; j <= createPromptObject.numChoices; j++) {
      createPromptArray.push(getChoice(i, j))
    }
  }
  return createPromptArray
}

// TODO implement createQuestions()
export const createQuestions = createQuestionsObject => {
  typeof createQuestionsObject !== 'object'
    ? (createQuestionsObject = {})
    : createQuestionsObject

  const getQuestions = obj => {
    return Object.keys(obj).filter(i => i.match(/question-.$/))
  }

  const getChoices = (obj, num) => {
    let name = /question-/
    let choice = /-choice/
    let regex = RegExp(name.source + num + choice.source)

    return Object.keys(obj).filter(i => i.match(regex))
  }

  const getValue = (obj, valueName) => {
    return obj[valueName] === undefined ? '' : obj[valueName]
  }

  let createQuestionsArray = []

  for (let i = 0; i < getQuestions(createQuestionsObject).length; i++) {
    createQuestionsArray.push({
      type: 'list',
      name: getQuestions(createQuestionsObject)[i],
      message: createQuestionsObject[getQuestions(createQuestionsObject)[i]],
      choices: getChoices(createQuestionsObject, i + 1).map(e =>
        getValue(createQuestionsObject, e)
      )
    })
  }

  return createQuestionsArray
}

export default {
  chooseRandom,
  createPrompt,
  createQuestions
}

// TODO export above functions
