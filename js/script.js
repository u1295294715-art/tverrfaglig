const quiz = [
  {
    question: "Hva måles i Ohm? (Elektro)",
    answers: ["strøm", "Motstand", "Spenning", "Effekt"],
    correct: 1
  },
  {
    question: "Hva er en algoritme? (IM)",
    answers: ["En type datamaskin", "En steg-for-steg løsning på et problem", "En nettside", "En database"],
    correct: 1
  },
  {
    question: "Hva er normal kroppstemperatur hos mennesker? (Helse)",
    answers: ["35 grader celius", "37 grader Celsius", "39 grader Celsius", "40 grader Celsius"],
    correct: 1
  },
  {
    question: " Hva er kroppens viktigste energikilde under hard trening? (Idrett)",
    answers: ["Proteiner", "Karbohydrater", "Vann", "Vitaminer   "],
    correct: 1
  },
  {
    question: " Hva står RGB for i digital design? (MK)" ,
    answers: ["Red Green Blue", "Rapid Graphic Build", "Render Graphic Base", "Red Gradient Blend"],
    correct: 0
  },
  {
    question: "Hva er en hypotese? (Påbygg)",
    answers: ["Et endelig svar", "En testbar antakelse", "En teori", "En konklusjon"],
    correct: 1
  },
  {
    question: "Hva er et viktig element i reiselivsnæringen? (SSR)",
    answers: ["Opplevelser", "Fabrikker", "Jordbruk", "Industri"],
    correct: 0
  },
  {
    question: "Hva er sveising? (TIF)",
    answers: ["Kutte metall", "Smelte sammen materialer", " Male metall", "Polere metall"],
    correct: 1
  },
  {
    question: "Hva betyr begrepet “dugnad” i norsk kultur? (Kombinasjonsklasse)",
    answers: [" Frivillig arbeid for fellesskapet", " En type mat", "En skoleeksamen", "En sport"],
    correct: 0
  },
  {
    question: "Hva betyr demokrati? (Medborgerskap)",
    answers: ["At én person bestemmer alt", "At folket har makt til å påvirke beslutninger", "At lærere bestemmer alt", " At ingen bestemmer"],
    correct: 1
  }
];

let currentQuestion = 0;
let score = 0;
let wrong = 0;

function updateScoreDisplay() {
  let scoreStatus = document.getElementById("scorestatus");
  if (!scoreStatus) {
    scoreStatus = document.createElement("p");
    scoreStatus.id = "scorestatus";
    scoreStatus.style.fontWeight = "700";
    scoreStatus.style.margin = "10px 0";
    const quizBox = document.querySelector(".quiz-box");
    if (quizBox) {
      quizBox.insertBefore(scoreStatus, document.getElementById("question"));
    }
  }
  scoreStatus.textContent = `Riktige: ${score} | Uriktige: ${wrong}`;
}

function loadQuestion() {
  const q = quiz[currentQuestion];
  document.getElementById("question").textContent = q.question;

  const answersDiv = document.getElementById("answers");
  answersDiv.innerHTML = "";

  q.answers.forEach((answer, index) => {
    const btn = document.createElement("button");
    btn.textContent = answer;
    btn.onclick = () => selectAnswer(index, btn);
    answersDiv.appendChild(btn);
  });

  document.getElementById("result").textContent = "";
  updateScoreDisplay();
}

function selectAnswer(index, button) {
  const q = quiz[currentQuestion];
  const allButtons = document.querySelectorAll("#answers button");
  allButtons.forEach((btn) => (btn.disabled = true));

  if (index === q.correct) {
    score++;
    button.style.backgroundColor = "#4CAF50";
    document.getElementById("result").textContent = "Riktig! Bra jobba!";
  } else {
    wrong++;
    button.style.backgroundColor = "#f44336";
    document.getElementById("result").textContent = "Galt svar. Riktig svar er: " + q.answers[q.correct];
    allButtons[q.correct].style.backgroundColor = "#4CAF50";
  }

  updateScoreDisplay();
  setTimeout(nextQuestion, 900);
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < quiz.length) {
    loadQuestion();
  } else {
    const box = document.querySelector(".quiz-box");
    if (box) {
      box.innerHTML = `<h1>BleikerQuizzen</h1><p>Du fikk ${score} av ${quiz.length} riktige.</p><p>Uriktige: ${wrong}</p><p class='final'>Andel: ${Math.round((score / quiz.length) * 100)}%</p>`;
    }
  }
}

window.addEventListener("DOMContentLoaded", loadQuestion);
