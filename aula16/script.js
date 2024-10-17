const apiKey = '7a83cfeb59709d610c3a5947';

async function carregarMoedas() {
    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/codes`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Erro ao obter moedas: ${response.statusText}`);
        }

        const dados = await response.json();
        const moedas = dados.supported_codes;

        const moedaBaseSelect = document.getElementById('moedaBase');
        const moedaDestinoSelect = document.getElementById('moedaDestino');

        // Preencher os selects com as moedas disponíveis
        moedas.forEach(([codigo, nome]) => {
            const optionBase = document.createElement('option');
            optionBase.value = codigo;
            optionBase.textContent = `${codigo} - ${nome}`;
            moedaBaseSelect.appendChild(optionBase);

            const optionDestino = document.createElement('option');
            optionDestino.value = codigo;
            optionDestino.textContent = `${codigo} - ${nome}`;
            moedaDestinoSelect.appendChild(optionDestino);
        });
    } catch (erro) {
        alert(`Erro: ${erro.message}`);
    }
}

// Função para converter a moeda
async function converterMoeda(moedaBase, moedaDestino, valor) {
    if (isNaN(valor) || valor <= 0) {
        throw new Error("O valor deve ser um número válido maior que zero.");
    }

    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${moedaBase}/${moedaDestino}/${valor}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Erro ao obter conversão: ${response.statusText}`);
        }

        const dados = await response.json();

        if (!dados.conversion_result) {
            throw new Error("Erro ao converter: resultado não encontrado.");
        }

        return dados.conversion_result;
    } catch (erro) {
        console.error(erro.message);
        throw erro;
    }
}

async function exemploConversaoMoeda(event) {
    event.preventDefault();
    const moedaBase = document.getElementById('moedaBase').value;
    const moedaDestino = document.getElementById('moedaDestino').value;
    const valorParaConverter = parseFloat(document.getElementById('valor').value);

    if (isNaN(valorParaConverter) || valorParaConverter <= 0) {
        alert('Por favor, insira um valor válido maior que zero.');
        return;
    }

    try {
        const valorConvertido = await converterMoeda(moedaBase, moedaDestino, valorParaConverter);

        alert(`${valorParaConverter} ${moedaBase} = ${valorConvertido.toFixed(2)} ${moedaDestino}`);
    } catch (erro) {
        alert(`Erro: ${erro.message}`);
    }
}

document.addEventListener('DOMContentLoaded', carregarMoedas);

document.getElementById('formConversao').addEventListener('submit', exemploConversaoMoeda);
