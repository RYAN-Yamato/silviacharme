document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM carregado, scripticar.js executando');

    function atualizarCarrinho() {
        const carrinhoItens = document.getElementById('carrinho-itens');
        const totalElement = document.getElementById('total');

        // Obter itens do carrinho do localStorage
        let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
        let total = 0;

        // Limpar itens do carrinho
        carrinhoItens.innerHTML = '';

        // Adicionar itens ao carrinho na página
        carrinho.forEach((item, index) => {
            total += item.preco;

            const itemDiv = document.createElement('div');
            itemDiv.className = 'item';

            itemDiv.innerHTML = `
                <p>${item.nome}</p>
                <p>R$ ${item.preco.toFixed(2)}</p>
                <button class="btn-remover" data-index="${index}">Remover</button>
            `;

            carrinhoItens.appendChild(itemDiv);
        });

        // Exibir total
        totalElement.textContent = `R$ ${total.toFixed(2)}`;

        // Adiciona evento de clique para os botões "Remover"
        const removerBotoes = document.querySelectorAll('.btn-remover');
        removerBotoes.forEach(button => {
            button.addEventListener('click', removerItem);
        });
    }

    function removerItem(event) {
        // Pegar o índice do item a ser removido do atributo data-index
        const index = event.target.getAttribute('data-index');
        
        // Obter o carrinho do localStorage
        let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

        // Remover o item do array com base no índice
        carrinho.splice(index, 1);

        // Atualizar o localStorage com o novo array
        localStorage.setItem('carrinho', JSON.stringify(carrinho));

        // Atualizar a exibição do carrinho
        atualizarCarrinho();
    }

    atualizarCarrinho();
});
