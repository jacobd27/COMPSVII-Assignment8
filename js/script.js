console.log("script.js connected!");

// This will store the users answers 
let userAnswers = {};

const questionBlocks = document.querySelectorAll(".question-block");

questionBlocks.forEach((block, index) => {
  const buttons = block.querySelectorAll(".answer-btn");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // This removes the coloring for all buttons
      buttons.forEach((b) => b.classList.remove("selected", "btn-primary"));
      buttons.forEach((b) => b.classList.add("btn-outline-primary"));

      // This adds highlight to only the clicked button
      btn.classList.add("selected", "btn-primary");
      btn.classList.remove("btn-outline-primary");

      // This saves the users answer
      const player = btn.getAttribute("data-player");
      const questionNumber = block.getAttribute("data-question");
      userAnswers[questionNumber] = player;

      console.log(userAnswers); 
    });
  });
});
