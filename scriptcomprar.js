// scriptcomprar.js

document.addEventListener('DOMContentLoaded', () => {
    const botaoFinalizar = document.getElementById('btn-finalizar');

    // Função para verificar se todos os campos estão preenchidos
    function verificarCampos() {
        const campos = document.querySelectorAll('#form-compra input[required]');
        const todosPreenchidos = Array.from(campos).every(campo => campo.value.trim() !== '');
        botaoFinalizar.disabled = !todosPreenchidos;
    }

    // Função para enviar dados ao webhook
    function finalizarCompra(event) {
        event.preventDefault();

        const formData = new FormData(document.getElementById('form-compra'));
        const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
        const total = carrinho.reduce((acc, item) => acc + item.preco, 0).toFixed(2);

        if (carrinho.length === 0) {
            alert('O carrinho está vazio.');
            return;
        }

        const compra = {
            endereco: {
                pais: formData.get('pais'),
                estado: formData.get('estado'),
                cidade: formData.get('cidade'),
                bairro: formData.get('bairro'),
                numero: formData.get('numero'),
            },
            telefone: formData.get('telefone'),
            comprovante: formData.get('foto-comprovante').name,
            total: `R$ ${total}`,
            itens: carrinho.map(item => `${item.nome} - R$${item.preco.toFixed(2)}`)
        };

        fetch('https://discord.com/api/webhooks/1286048644096856126/ql0fwTxPxJYqXdMKe3rQXEgBtpkKR4t4rqtHjjcH2BvQaeLRFW9pWc3GmA8VY8klqeW7', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(compra),
        })
        .then(response => {
            if (!response.ok) throw new Error('Erro ao enviar dados para o webhook');
            return response.json();
        })
        .then(data => {
            alert('Compra finalizada com sucesso!');
            localStorage.removeItem('carrinho');
        })
        .catch(error => {
            console.error('Erro ao finalizar compra:', error);
            alert('Erro ao finalizar a compra. Tente novamente.');
        });
    }

    // Adicionar eventos
    document.getElementById('form-compra').addEventListener('input', verificarCampos);
    document.getElementById('form-compra').addEventListener('submit', finalizarCompra);
});
