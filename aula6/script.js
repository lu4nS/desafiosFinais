let ponto = null;

const numero1 = document.getElementById('numero1');
const numero2 = document.getElementById('numero2');
const pontoElement = document.getElementById('ponto');

document.addEventListener('click', jogar);

function jogar() {
    const numero1Aleatorio = Math.floor(Math.random() * 6) + 1;
    const numero2Aleatorio = Math.floor(Math.random() * 6) + 1;
    numero1.innerText = numero1Aleatorio;
    numero2.innerText = numero2Aleatorio;
    const soma = numero1Aleatorio + numero2Aleatorio;

    if (ponto === null) {
        if (soma === 7 || soma === 11) {
            setTimeout(() => {
                alert("Obteve 7 ou 11 de primeira. Ganhou com natural!");
                ponto = null;
            }, 500);
        } else if (soma === 2 || soma === 3 || soma === 12) {
            setTimeout(() => {
                alert("Obtede 2, 3 ou 12. Perdeu!");
                ponto = null;
            }, 500);
        } else {
            ponto = soma;
            pontoElement.innerText = `Ponto ${ponto}`;
        }
    } else {
        if (soma === ponto) {
            setTimeout(() => {
                alert("Venceu!");
                ponto = null;
                pontoElement.innerText = "";
                alert("Novo jogo!");
            }, 500);
        } else if (soma === 7) {
            setTimeout(() => {
                alert("Deu 7. Perdeu!");
                ponto = null;
                pontoElement.innerText = "";
            }, 500);
        }
    }
}