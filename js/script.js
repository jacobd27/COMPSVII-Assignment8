console.log("script.js connected!");

// Object to store user selections
let userAnswers = {};

// Select all question blocks
const questionBlocks = document.querySelectorAll(".question-block");

questionBlocks.forEach((block, index) => {
  const buttons = block.querySelectorAll(".answer-btn");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove highlight from all buttons in this block
      buttons.forEach((b) => {
        b.classList.remove("selected", "btn-primary");
        b.classList.add("btn-outline-primary");
      });

      // Highlight the clicked one
      btn.classList.add("selected", "btn-primary");
      btn.classList.remove("btn-outline-primary");

      // Save the user's choice
      const player = btn.getAttribute("data-player");
      const questionNumber = block.getAttribute("data-question");
      userAnswers[questionNumber] = player;
    });
  });
});

// ---- Show Result Logic ----
document.getElementById("show-result").addEventListener("click", () => {
  // Count how many times each player was chosen
  const scores = {};

  Object.values(userAnswers).forEach((player) => {
    scores[player] = (scores[player] || 0) + 1;
  });

  console.log(scores);

  // Find player with highest score
  let topPlayer = null;
  let maxScore = 0;

  for (const player in scores) {
    if (scores[player] > maxScore) {
      maxScore = scores[player];
      topPlayer = player;
    }
  }

  // Display the result
  const resultDiv = document.getElementById("result-container");

  if (topPlayer) {
    let playerName = "";
    let playerMessage = "";

    // Customize messages
    if (topPlayer === "lebron") {
      playerName = "LeBron James";
      playerMessage = "You're a leader and motivator! You elevate everyone around you.";
    } else if (topPlayer === "curry") {
      playerName = "Stephen Curry";
      playerMessage = "You're calm under pressure and always bring positive energy!";
    } else if (topPlayer === "harden") {
      playerName = "James Harden";
      playerMessage = "You're confident, creative, and love to put on a show.";
    } else if (topPlayer === "kawhi") {
      playerName = "Kawhi Leonard";
      playerMessage = "You're quiet but deadly — actions speak louder than words.";
    }

    resultDiv.innerHTML = `
      <h2 class="text-success">You’re most like <strong>${playerName}</strong>!</h2>
      <p>${playerMessage}</p>
    `;
  } else {
    resultDiv.innerHTML = `<p class="text-danger">Please answer all questions before viewing your result.</p>`;
  }
});
