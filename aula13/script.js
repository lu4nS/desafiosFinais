let randomNumber = Math.floor(Math.random() * 10) + 1;

function guessNumber() {
    const input = document.getElementById("guessInput").value;

    try {
        const guess = parseInt(input);

        if (isNaN(guess)) {
            throw new Error("Por favor, insira um número válido.");
        }

        if (guess < 1 || guess > 10) {
            alert("O número deve estar entre 1 e 10.");
        } else if (guess === randomNumber) {
            alert("Parabéns! Você adivinhou o número.");
            resetGame();
        } else if (guess < randomNumber) {
            alert("O número correto é maior.");
        } else {
            alert("O número correto é menor.");
        }
    } catch (error) {
        alert(error.message);
    }
}

function resetGame() {
    randomNumber = Math.floor(Math.random() * 10) + 1;
    document.getElementById("guessInput").value = "";
}
