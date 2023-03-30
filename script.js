// These are the starting variables
const startBtn = document.querySelector('#StartQuiz');
const firstPanel = document.querySelector('#OpeningMessage');
const timerText = document.getElementById('timerText');
const mcQuestions = document.querySelectorAll('[id^="mc"]');
const finalScoreText = document.getElementById('FinalScore');
const usernameInput = document.getElementById('username');
const submitBtn = document.getElementById('submitBtn');
const highscore = JSON.parse(localStorage.getItem('highscore')) || [];

let secs = 60;
let intervalId;

// This allows the start button to react
startBtn.addEventListener('click', () => {
  firstPanel.style.display = firstPanel.style.display === 'none' ? 'block' : 'none';
  intervalId = setInterval(timer, 1000);
});

// This functions as a timer
function timer() {
  timerText.innerHTML = `time left ${secs--}`;
  if (secs < 0) {
    clearInterval(intervalId);
    timerText.innerHTML = '<h2>Times up!</h2>';
    scanAnswers();
  }
}

// This brings up the new questions.
mcQuestions.forEach((question, index) => {
  question.addEventListener('click', () => {
    question.style.display = 'none';
    if (index < mcQuestions.length - 1) {
      mcQuestions[index + 1].style.display = 'block';
    } else {
      scanAnswers();
    }
  });
});

// Display the final score
function scanAnswers() {
  let right = 0;
  const q1 = document.querySelector('input[name="question1"]:checked').value;
  const q2 = document.querySelector('input[name="question2"]:checked').value;
  const q3 = document.querySelector('input[name="question3"]:checked').value;
  const q4 = document.querySelector('input[name="question4"]:checked').value;
  const q5 = document.querySelector('input[name="question5"]:checked').value;
  const q6 = document.querySelector('input[name="question6"]:checked').value;

  switch (q1) {
    case 'Alerts':
      right++;
      break;
  }
  switch (q2) {
    case 'parenthesis':
      right++;
      break;
  }
  switch (q3) {
    case 'numbers and strings':
      right++;
      break;
  }
  switch (q4) {
    case 'quotes':
      right++;
      break;
  }
  switch (q5) {
    case 'console.log':
      right++;
      break;
  }
  switch (q6) {
    case 'Alerts':
      right++;
      break;
  }

  const finalScore = parseInt(right);
  finalScoreText.innerHTML = finalScore;
  usernameInput.disabled = false;
  submitBtn.addEventListener('click', () => {
    const user = usernameInput.value;
    highscore.push({ user, score: finalScore });
    localStorage.setItem('highscore', JSON.stringify(highscore));
    window.location.reload();
  });
}