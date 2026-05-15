//your JS code here.

// Do not change code below this line
// This code will just display the questions to the screen
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

const questionsContainer = document.getElementById("questions");
const submitBtn = document.getElementById("submit");
const scoreDiv = document.getElementById("score");

// get saved progress
let progress = JSON.parse(sessionStorage.getItem("progress")) || {};

// display saved score if exists
const savedScore = localStorage.getItem("score");
if (savedScore !== null) {
  scoreDiv.textContent = `Your score is ${savedScore} out of 5.`;
}

// Display the quiz questions and choices
function renderQuestions() {
  questionsContainer.innerHTML = "";

  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];

    const div = document.createElement("div");

    const q = document.createElement("p");
    q.textContent = question.question;

    div.appendChild(q);

    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];

      const label = document.createElement("label");

      const input = document.createElement("input");
      input.type = "radio";
      input.name = `question-${i}`;
      input.value = choice;

      // restore checked value
      if (progress[i] === choice) {
        input.checked = true;
      }

      // save progress in session storage
      input.addEventListener("change", () => {
        progress[i] = choice;
        sessionStorage.setItem("progress", JSON.stringify(progress));
      });

      label.appendChild(input);
      label.append(choice);

      div.appendChild(label);
      div.appendChild(document.createElement("br"));
    }

    questionsContainer.appendChild(div);
  }
}

// calculate score
submitBtn.addEventListener("click", () => {
  let score = 0;

  for (let i = 0; i < questions.length; i++) {
    if (progress[i] === questions[i].answer) {
      score++;
    }
  }

  scoreDiv.textContent = `Your score is ${score} out of 5.`;

  // save score in local storage
  localStorage.setItem("score", score);
});

renderQuestions();