document.addEventListener("DOMContentLoaded", () => {
    const clues = document.querySelectorAll(".clue");
    const surprise = document.getElementById("surprise");
    let foundCount = 0;

    clues.forEach((clue) => {
        clue.addEventListener("click", () => {
            if (!clue.classList.contains("found")) {
                clue.textContent = "✔️";
                clue.classList.add("found");
                foundCount++;

                if (foundCount === clues.length) {
                    surprise.classList.remove("hidden");
                }
            }
        });
    });
});
