document.addEventListener('DOMContentLoaded', function() {
    const buttonsAdicionar = document.querySelectorAll('.btn-adicionar');

    buttonsAdicionar.forEach(button => {
        button.addEventListener('click', () => {
            const nome = button.getAttribute('data-nome');
            const preco = parseFloat(button.getAttribute('data-preco'));
            adicionarAoCarrinho(nome, preco);
        });
    });

    function adicionarAoCarrinho(nome, preco) {
        const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
        carrinho.push({ nome, preco });
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        alert('Item adicionado ao carrinho!');
    }
});
