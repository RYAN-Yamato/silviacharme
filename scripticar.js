document.addEventListener('DOMContentLoaded', function() {
    const carrinhoItens = document.getElementById('carrinho-itens');
    const totalElement = document.getElementById('total');

    if (!carrinhoItens || !totalElement) {
        console.error('Alguns elementos do DOM não foram encontrados.');
        return;
    }

    function atualizarCarrinho() {
        const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
        carrinhoItens.innerHTML = '';
        let total = 0;

        carrinho.forEach((item, index) => {
            total += item.preco;
            const itemElement = document.createElement('div');
            itemElement.classList.add('item');
            itemElement.innerHTML = `
                <img src="exemplo${item.preco}.png" alt="${item.nome}">
                <div class="item-info">
                    <p>${item.nome}</p>
                    <p>R$${item.preco.toFixed(2)}</p>
                    <button data-index="${index}" class="btn-remover">Remover</button>
                </div>
            `;
            carrinhoItens.appendChild(itemElement);
        });

        totalElement.textContent = `R$${total.toFixed(2)}`;
    }

    carrinhoItens.addEventListener('click', event => {
        if (event.target.classList.contains('btn-remover')) {
            const index = event.target.getAttribute('data-index');
            const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
            carrinho.splice(index, 1);
            localStorage.setItem('carrinho', JSON.stringify(carrinho));
            atualizarCarrinho();
        }
    });

    atualizarCarrinho();
});
