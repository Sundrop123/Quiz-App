'use strict';



// Questions are Below 
const questionSet = [
  { 
    number: 1,
    text: `Find x, 2x+10=50`,
    ans1: `x=20`,
    ans2: `x=15`, 
    ans3: `x=5`, 
    ans4: `x=40`
  }, 

  {
    number: 2,
    text: `Solve, 10 x 2 + 2 - 15(2+2)`,
    ans1: `28`, 
    ans2: `22`, 
    ans3: `-38`, 
    ans4: `-60`
  }, 

  {
    number: 3,
    text: `What is the square root of 10,000`,
    ans1: `10`, 
    ans2: `50`, 
    ans3: `100`, 
    ans4: `1000`
  }, 
  {
    number: 4, 
    text: `Solve, 10(2) + 6 - 2`,
    ans1: `4`, 
    ans2: `16`, 
    ans3: `14`, 
    ans4: `24`
  }, 
  {
    number: 5,
    text: `What is 6 x 10`,
    ans1: `6`, 
    ans2: `60`, 
    ans3: `600`, 
    ans4: `6000`
  }, 
  {
    number: 6,
    text: `What is divisible by 6`,
    ans1: `50`, 
    ans2: `10 `, 
    ans3: `24`, 
    ans4: `41`
  }, 
  {
    number: 7,
    text: `What is divisible by 15`,
    ans1: `5`, 
    ans2: `7`, 
    ans3: `75`, 
    ans4: `20`
  }, 
  {
    number: 8,
    text: `What is divisible by 22`,
    ans1: `42`, 
    ans2: `50`, 
    ans3: `13`, 
    ans4: `66`
  }, 
  {
    number: 9,
    text: `Solve, 200 divided by 10`,
    ans1: `20`, 
    ans2: `15`, 
    ans3: `50`, 
    ans4: `15`
  }, 
  {
    number: 10,
    text: `Solve, 4x + 10 = 26`,
    ans1: `4`, 
    ans2: `6`, 
    ans3: `12`, 
    ans4: `14`
  }
];
// Correct Answers 
const ANSWERS = [ 
  `x=20`, 
  `-38`, 
  `100`, 
  `24`, 
  `60`, 
  `24`, 
  `75`, 
  `66`, 
  `20`, 
  `4`
];

let questionNum = 1;

let correctAnswers = 0;

function questionTemplate(correctAnswers, question, questionsAnswered) {
  return `
    <section id="question-page" role="main">
    <h2 id="question">${question.text}</h2>
    
    <form>
      <fieldset>
        <label>
          <input class="answer" type="radio" name="option" unchecked></input>
          <span>${question.ans1}</span>
        </label>
  
        <label>
          <input class="answer" type="radio"  name="option"></input>
          <span>${question.ans2}</span>
        </label>
  
        <label>
          <input class="answer" type="radio" name="option"></input>
          <span>${question.ans3}</span>
        </label>
  
        <label>
          <input class="answer" type="radio" name="option"></input>
          <span>${question.ans4}</span>
        </label>
      </fieldset>  
      <button id="js-submit-button">Submit</button>

    </form>

    <div id="status-bar">
      <span id="question-count">Question: ${question.number}/10</span>
      <span id="score-count">Score: ${correctAnswers}/${questionsAnswered}</span>
    </div>
  </section>
  `;
}

function handleStartButton() {
  $('#js-start-button').click(function(event) {
    nextQuestion();
  });
}

function handleSubmitButton() {
  $('#container').on('click', '#js-submit-button', function(event) {
    event.preventDefault()

    const answer = $('input:checked').siblings('span');
// Gives the feedback of a question if it is answered correct/false
    const userIsCorrect = checkUserAnswer(answer);
    if(userIsCorrect) {
      generateCorrectFeedback();
    } else {
      generateIncorrectFeedback();
    }
  });
}

function handleNextButton() {
  $('#container').on('click', '#js-next-button', function(event) {

    if(questionNum === 10) {
      createResultsPage(correctAnswers);
    } else {
      iterateQuestion();
      nextQuestion();
  }
  });
}

function handleRestartButton() {
  $('#container').on('click', '#js-restart-button', function(event) {

    questionNum = 1;

    correctAnswers = 0;

    nextQuestion();
  });
}

function nextQuestion() {

  const question = questionSet[questionNum - 1];

  const questionsAnswered = questionNum - 1;

  $('#container').html(questionTemplate(correctAnswers, question, questionsAnswered));
}

function checkUserAnswer(answer) {
  if(answer.text() === ANSWERS[questionNum - 1]) {
    return true;
  } else {
    return false;
  }
}

function generateCorrectFeedback() {
  $('#container').html(correctFeedback);
  iterateCorrectAnswers();
}
// Below displays the feedback for a correctly answered question
const correctFeedback = `
  <section class="feedback-page" role="main">
    <h2>Correct!</h2>
    <img src="https://proxy.duckduckgo.com/iu/?u=http%3A%2F%2Fguernseydonkey.com%2Fwp-content%2Fuploads%2F2018%2F12%2FThumbs_Up_Skin-Color.png&f=1" alt="Thumbs Up" width= 250px height= 250px>
    <button id="js-next-button">Next</button>
  </section>
`;

function generateIncorrectFeedback() {
  $('#container').html(incorrectFeedbackTemplate(questionNum));
}
// Below shows the feedback of a incorrectly answered question
function incorrectFeedbackTemplate(questionNum) {
  return `
    <section class="feedback-page" role="main">
      <h2> Incorrect! The correct answer is ${ANSWERS[questionNum - 1]}!</h2>
      <img src="https://proxy.duckduckgo.com/iu/?u=http%3A%2F%2Fclipart-library.com%2Fimages%2FzcX5zegni.png&f=1" alt="Thumbs Down" width= 250px height= 250px>
      <button id="js-next-button">Next</button>
    </section>
`;
}

function iterateQuestion() {
  questionNum++;
}

function iterateCorrectAnswers() {
  correctAnswers++;
}

function createResultsPage(correctAnswers) {
  $('#container').html(`
    <section id="final-page">
      <h2>Final Score: ${correctAnswers} out of 10</h2>
      <button id="js-restart-button">Play Again?</button>
    </section>
  `);
}

function handleButtons() {
  handleStartButton();
  handleSubmitButton();
  handleNextButton();
  handleRestartButton();
}

handleButtons();
