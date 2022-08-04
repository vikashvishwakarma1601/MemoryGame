const score = document.querySelector(".score");
const resetBtn = document.querySelector(".reset");
const startBtn = document.querySelector(".start");
const boxes = Array.from(document.querySelectorAll(".box"));
const highestScore = document.querySelector(".highestScore");
const gameOverText = document.querySelector(".gameOverText");

let queue = [];
let level = 1;
let totalScore = 0;
let highScore = 0;
let flag = false;
let timeoutId = [];

function generateIdx(level) {
  if (level == 1) {
    queue[0] = (Math.random() * 5) | 0;
    queue[1] = (Math.random() * 5) | 0;
  } else if (level == 2) {
    queue[0] = (Math.random() * 5) | 0;
    queue[1] = (Math.random() * 5) | 0;
    queue[2] = (Math.random() * 5) | 0;
  } else {
    queue[0] = (Math.random() * 5) | 0;
    queue[1] = (Math.random() * 5) | 0;
    queue[2] = (Math.random() * 5) | 0;
    queue[3] = (Math.random() * 5) | 0;
    queue[4] = (Math.random() * 5) | 0;
  }
}

function resetAll() {
  queue = [];
  level = 1;
  totalScore = 0;
  flag = false;
  startBtn.style.display = "inline";
  gameOverText.style.visibility = "hidden";
  score.textContent = 0;
  boxes.forEach((box) => {
    box.style.backgroundColor = "#a9a9a9";
  });
  clearTimeoutAll();
}

function clearTimeoutAll() {
  for (const id of timeoutId) {
    clearTimeout(id);
  }
  timeoutId = [];
}

function animateBox(delay = 500) {
  let id;
  let level =
    totalScore <= 30 ? 1 : totalScore > 30 && totalScore <= 80 ? 2 : 3;
  clearTimeoutAll();
  generateIdx(level);
  queue.forEach((value, idx) => {
    id = setTimeout(() => {
      boxes[value].classList.add("active");
      flag = false;
      id = setTimeout(() => {
        boxes[value].classList.remove("active");
        flag = true;
      }, delay - 100);
      timeoutId.push(id);
    }, idx * delay);
    timeoutId.push(id);
  });
}

function validateBox(event) {
  if (flag) {
    let box = event.target;
    let id;
    if (queue.length && queue[0] == box.id) {
      queue.splice(0, 1);
      if (!queue.length) {
        totalScore += 10;
        score.textContent = totalScore;
        id = setTimeout(() => animateBox(500), 1000);
        timeoutId.push(id);
      }

      box.classList.add("active");
      id = setTimeout(() => {
        box.classList.remove("active");
      }, 200);
      timeoutId.push(id);
    } else {
      gameOver(box);
    }
  }
}

function gameOver(box) {
  box.style.backgroundColor = "#ff0c00bf";
  highScore = Math.max(highScore, totalScore);
  highestScore.textContent = highScore;
  gameOverText.style.visibility = "visible";
  flag = false;
}

boxes.forEach((box) => {
  box.addEventListener("click", validateBox);
});

resetBtn.addEventListener("click", resetAll);

startBtn.addEventListener("click", () => {
  startBtn.style.display = "none";
  animateBox(500);
});
