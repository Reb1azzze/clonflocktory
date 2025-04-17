document.addEventListener("DOMContentLoaded", () => {
    const button = document.querySelector(".greeting-button");
    const game = document.querySelector(".game");
    const greetingContainer = document.querySelector(".greeting-container");
    const winnerDiv = document.querySelector(".modal-overlay");
    const radioButtons = document.querySelectorAll("input[type='radio']");
    const greetingText = document.querySelector(".greeting-text");
    const winnerText = document.querySelector(".winner-text");

    const offers = {
        1: "1. Скидка 1500Р",
        2: "2. Сертификат 6000Р",
        3: "3. Скидка 1750Р",
        4: "4. Лазерный сертификат",
        5: "5. Сертификат 2500Р",
        6: "6. Скидка 8500Р",
        7: "7. Эндосфера сертификат",
        8: "8. Скидка 3500Р",
        9: "9. Сертификат 5500Р",
        10: "10. Гилиосфера сертификат",
        11: "11. Сертификат 4000Р",
        12: "12. Скидка 500Р",
        13: "13. Стратосфера сертификат",
        14: "14. Сертификат 7000Р",
        15: "15. Скидка 5000Р",
    };

    function updateGreeting(selectedValue) {

        greetingText.style.opacity = "0";
        setTimeout(() => {
            greetingText.textContent = offers[selectedValue];
            greetingText.offsetHeight;
            greetingText.style.opacity = "1";
        }, 1500);
    }

    if (button) {
        button.addEventListener("click", () => {
            if (game && greetingContainer) {
                game.style.display = "none";
                greetingContainer.style.display = "none";
            }
            if (winnerDiv) { winnerDiv.style.display = "block"; }
            winnerText.textContent = greetingText.textContent;
        });
    }

    radioButtons.forEach(radio => {
        radio.addEventListener("change", () => {
            if (offers[radio.value]) {
                updateGreeting(radio.value);
                button.disabled = false;
            }
        });
    });
});