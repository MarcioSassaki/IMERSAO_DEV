// Seleciona o elemento HTML onde os cartões de aplicativos serão exibidos.
const cardContainer = document.querySelector('.card-container');
// Seleciona o campo de entrada de texto usado para a busca.
const searchInput = document.querySelector('input[type="text"]');
// Inicializa um array vazio que irá armazenar os dados carregados do arquivo data.json.
let allData = [];

/**
 * Carrega os dados do arquivo data.json e os armazena na variável allData.
 * Também exibe todos os cartões inicialmente.
 */
async function carregarDados() {
    try {
        const response = await fetch('data.json');
        // Converte a resposta da requisição para o formato JSON.
        allData = await response.json();
        // Chama a função para exibir os cartões com todos os dados carregados.
        exibirCartoes(allData);
    } catch (error) {
        // Exibe uma mensagem de erro no console se a requisição falhar.
        console.error('Erro ao carregar os dados:', error);
        // Mostra uma mensagem de erro na página para o usuário.
        cardContainer.innerHTML = '<p>Erro ao carregar os aplicativos.</p>';
    }
}

/**
 * Renderiza os cartões de aplicativos na tela.
 * @param {Array} itens - A lista de aplicativos a serem exibidos.
 */
function exibirCartoes(itens) {
    cardContainer.innerHTML = ''; // Limpa os resultados anteriores

    // Verifica se a lista de itens está vazia.
    if (itens.length === 0) {
        // Se estiver vazia, exibe uma mensagem informando que nenhum aplicativo foi encontrado.
        cardContainer.innerHTML = '<p>Nenhum aplicativo encontrado.</p>';
        return;
    }

    // Itera sobre cada item da lista para criar e exibir um cartão.
    itens.forEach(item => {
        // Cria um novo elemento <article> para representar o cartão.
        const card = document.createElement('article');
        // Define o conteúdo HTML do cartão com os dados do item (nome, descrição e link).
        card.innerHTML = `
            <img src="${item.imagem}" alt="${item.nome}">
            <h2>${item.nome}</h2>
            <p>${item.descrição}</p>
            <a href="${item.link}" target="_blank">Acessar Aplicativo</a>
        `;
        // Adiciona o cartão recém-criado ao contêiner de cartões na página.
        cardContainer.appendChild(card);
    });
}

/**
 * Filtra os aplicativos com base no termo de busca e os exibe.
 */
function iniciarBusca() {
    // Pega o valor digitado no campo de busca e converte para letras minúsculas.
    const termoBusca = searchInput.value.toLowerCase();
    // Filtra a lista de todos os aplicativos, mantendo apenas aqueles cujo nome inclui o termo de busca.
    const dadosFiltrados = allData.filter(item => item.nome.toLowerCase().includes(termoBusca));
    // Chama a função para exibir os cartões com os dados filtrados.
    exibirCartoes(dadosFiltrados);
}

// Carrega os dados assim que a página é carregada.
// Adiciona um "ouvinte de eventos" que espera o conteúdo da página ser totalmente carregado para então chamar a função carregarDados.
document.addEventListener('DOMContentLoaded', carregarDados);