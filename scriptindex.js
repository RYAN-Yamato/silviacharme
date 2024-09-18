// scriptindex.js

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM carregado, scriptindex.js executando');

    // Função para adicionar um item ao carrinho
    function adicionarAoCarrinho(event) {
        const botao = event.target;
        const preco = botao.getAttribute('data-preco');
        const nome = botao.getAttribute('data-nome');

        if (!preco || !nome) {
            console.error('Dados de preço ou nome ausentes!');
            return;
        }

        // Obter itens do carrinho do localStorage
        let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

        // Adicionar item ao carrinho
        carrinho.push({ nome, preco: parseFloat(preco) });

        // Salvar carrinho atualizado no localStorage
        localStorage.setItem('carrinho', JSON.stringify(carrinho));

        // Exibir mensagem de confirmação
        alert(`"${nome}" adicionado ao carrinho!`);
    }

    // Adicionar evento de clique a todos os botões "Adicionar"
    document.querySelectorAll('.btn-adicionar').forEach(botao => {
        botao.addEventListener('click', adicionarAoCarrinho);
    });
});
