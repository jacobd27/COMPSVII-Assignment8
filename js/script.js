console.log("script.js connected!");

// Store user selections like { "1": "lebron", "2": "curry", ... }
let userAnswers = {};

// Map full names (and common variants) to stable keys
const NAME_TO_KEY = {
  "lebron james": "lebron",
  "lebron": "lebron",
  "stephen curry": "curry",
  "steph curry": "curry",
  "curry": "curry",
  "james harden": "harden",
  "harden": "harden",
  "kawhi leonard": "kawhi",
  "kawhi": "kawhi",
};

const PLAYER_INFO = {
  lebron: { name: "LeBron James", message: "You're a leader and motivator! You elevate everyone around you." },
  curry: { name: "Stephen Curry", message: "You're calm under pressure and always bring positive energy!" },
  harden: { name: "James Harden", message: "You're confident, creative, and love to put on a show." },
  kawhi: { name: "Kawhi Leonard", message: "You're quiet but deadly — actions speak louder than words." },
  other: { name: "Another Player", message: "You’ve got your own unique style — not easy to label!" },
};

// Select all question blocks
const questionBlocks = document.querySelectorAll(".question-block");

questionBlocks.forEach((block, blockIndex) => {
  const buttons = block.querySelectorAll(".answer-btn");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Visually de-select others
      buttons.forEach((b) => {
        b.classList.remove("selected", "btn-primary");
        b.classList.add("btn-outline-primary");
      });

      // Highlight clicked
      btn.classList.add("selected", "btn-primary");
      btn.classList.remove("btn-outline-primary");

      // Read from data-answer, normalize to a key
      const raw = (btn.getAttribute("data-answer") || "").toLowerCase().trim();
      const key = NAME_TO_KEY[raw] || NAME_TO_KEY[raw.replace(/\s+/g, "")] || "other";

      // Derive question number from loop index (1-based)
      const questionNumber = String(blockIndex + 1);
      userAnswers[questionNumber] = key;

      console.log("Saved:", questionNumber, "->", key, userAnswers);
    });
  });
});

// ---- Show Result Logic ----
document.getElementById("show-result").addEventListener("click", () => {
  const totalQuestions = questionBlocks.length;
  const answered = Object.keys(userAnswers).length;

  // Guard: require all answered (optional)
  if (answered < totalQuestions) {
    showResultMessage(
      `Please answer all ${totalQuestions} questions before viewing your result.`,
      true
    );
    return;
  }

  // Tally picks
  const scores = {};
  Object.values(userAnswers).forEach((key) => {
    scores[key] = (scores[key] || 0) + 1;
  });
  console.log("Scores:", scores);

  // Find winner
  let topKey = null;
  let max = 0;
  for (const k in scores) {
    if (scores[k] > max) {
      max = scores[k];
      topKey = k;
    }
  }

  const info = PLAYER_INFO[topKey] || PLAYER_INFO.other;
  showResultMessage(`You’re most like <strong>${info.name}</strong>!<br>${info.message}`);
});

// Utility: write into #result-text and unhide its card
function showResultMessage(html, isError = false) {
  const textEl = document.getElementById("result-text");
  if (!textEl) {
    console.warn("No #result-text element found.");
    return;
  }
  textEl.innerHTML = isError ? `<span class="text-danger">${html}</span>` : html;

  // Reveal the surrounding card even if it was display:none
  const card = textEl.closest(".card");
  if (card) card.style.display = "block";
}
