// TODO import readFile, writeFile, chooseRandom, createPrompt, and createQuestions
import { createPrompt, chooseRandom } from './lib.js'
import { createQuestions } from './lib.js'
const fs = require('fs')

// TODO read in the file createPrompt.json, run the object read in through createPrompt,
// pass the result of createPrompt to chooseRandom, and then save the result to
// cp_solutions.json
let reader = JSON.parse(
  fs.readFileSync(
    '/Users/jacobhazelton/repos/vs/js-assignment-3-jhazelton1/lib/createPrompt.json',
    'utf8',
    err => {
      if (err) {
        console.log(err)
      }
      console.log('File was read')
    }
  )
)

let createdPrompt = createPrompt(reader)

let randomized = chooseRandom(createdPrompt, 10)
fs.writeFileSync(
  '/Users/jacobhazelton/repos/vs/js-assignment-3-jhazelton1/lib/cp_solutions.json',
  JSON.stringify(randomized),
  'utf8',
  err => {
    if (err) {
      console.log(err)
    }
    console.log('Success!')
  }
)

// TODO read the file createQuestions.json. Pass the read in object to createQuestions,
// pass its result to chooseRandom, and then save the final result to cq_solutions.json
