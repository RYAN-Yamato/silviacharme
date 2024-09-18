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
        const fotoComprovante = document.getElementById('foto-comprovante').files[0];

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
                ],
                image: {
                    url: 'attachment://comprovante.jpg'
                }
            }]
        };

        const formData = new FormData();
        formData.append('file', fotoComprovante, 'comprovante.jpg');

        fetch('YOUR_DISCORD_WEBHOOK_URL', { // Substitua pelo URL do seu webhook
            method: 'POST',
            body: formData
        }).then(response => response.json())
        .then(data => {
            const imageUrl = data.attachments[0].url;
            dados.embeds[0].image.url = imageUrl;

            return fetch('https://discord.com/api/webhooks/1286002929551282278/AoD4vJN0j1kDvXfLJ1pBPVxgJjsleNpLbzkOhru9CxBEQDJWkGLS91wnpa5TGN5SUz5g', { // Substitua pelo URL do seu webhook
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dados)
            });
        }).then(response => {
            if (response.ok) {
                alert('Compra finalizada com sucesso!');
                localStorage.removeItem('carrinho');
                window.location.href = 'index.html';
            } else {
                alert('Erro ao finalizar compra!');
            }
        }).catch(error => {
            alert('Erro ao enviar a foto do comprovante!');
            console.error('Error:', error);
        });
    });
});
