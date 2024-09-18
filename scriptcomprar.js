document.addEventListener('DOMContentLoaded', function() {
    const formCompra = document.getElementById('form-compra');
    const btnFinalizar = document.getElementById('btn-finalizar');

    if (!formCompra || !btnFinalizar) {
        console.error('Alguns elementos do DOM não foram encontrados.');
        return;
    }

    function atualizarBotaoFinalizar() {
        const estado = document.getElementById('estado').value;
        const cidade = document.getElementById('cidade').value;
        const bairro = document.getElementById('bairro').value;
        const numero = document.getElementById('numero').value;
        const telefone = document.getElementById('telefone').value;
        const fotoComprovante = document.getElementById('foto-comprovante').files.length > 0;

        btnFinalizar.disabled = !(estado && cidade && bairro && numero && telefone && fotoComprovante);
    }

    formCompra.addEventListener('input', atualizarBotaoFinalizar);

    formCompra.addEventListener('submit', function(event) {
        event.preventDefault();

        const pais = document.getElementById('pais').value;
        const estado = document.getElementById('estado').value;
        const cidade = document.getElementById('cidade').value;
        const bairro = document.getElementById('bairro').value;
        const numero = document.getElementById('numero').value;
        const telefone = document.getElementById('telefone').value;

        let total = 0;
        const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
        carrinho.forEach(item => total += item.preco);

        const dados = {
            content: 'Nova compra!',
            embeds: [{
                title: 'Detalhes da Compra',
                fields: [
                    { name: 'País', value: pais, inline: true },
                    { name: 'Estado', value: estado, inline: true },
                    { name: 'Cidade', value: cidade, inline: true },
                    { name: 'Bairro e Rua', value: bairro, inline: true },
                    { name: 'Número da Casa', value: numero, inline: true },
                    { name: 'Telefone', value: telefone, inline: true },
                    { name: 'Total', value: `R$${total.toFixed(2)}`, inline: true }
                ]
            }]
        };

        fetch('https://discord.com/api/webhooks/1286002915995029515/mDXF-1pZZ1ecJXPJNmSW9Wcqh8YB6zfecWAZGllnS3EorKYb1x3TuPmsqH3MtrTCQg_Y', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        }).then(response => {
            if (response.ok) {
                return response.json(); // Tenta converter a resposta em JSON
            } else {
                throw new Error('Erro na resposta da API: ' + response.statusText);
            }
        }).then(data => {
            // Processa a resposta JSON se disponível
            alert('Compra finalizada com sucesso!');
            localStorage.removeItem('carrinho');
            window.location.href = 'index.html';
        }).catch(error => {
            // Lida com qualquer erro ocorrido
            alert('Erro ao enviar os dados!');
            console.error('Error:', error);
        });
    });
});
