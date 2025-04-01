document.addEventListener("DOMContentLoaded", () => {
    const button = document.querySelector(".greeting-button");
    const game = document.querySelector(".game");
    const greetingContainer = document.querySelector(".greeting-container");
    const winnerDiv = document.querySelector(".modal-overlay");

    button.addEventListener("click", () => {
        if (game && greetingContainer) {
            game.style.display = "none";
            greetingContainer.style.display = "none";
        }

        if (winnerDiv) {
            winnerDiv.style.display = "block";
        }
    });
});
