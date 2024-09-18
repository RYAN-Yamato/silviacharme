document.addEventListener('DOMContentLoaded', () => {
    // Definindo o webhook do Discord
    const webhookUrl = 'SUA_URL_DO_WEBHOOK';

    // Função para habilitar/desabilitar o botão de finalizar compra
    const form = document.getElementById('form-compra');
    const finalizarButton = document.getElementById('btn-finalizar');

    form.addEventListener('input', () => {
        const inputsValidos = form.checkValidity();
        finalizarButton.disabled = !inputsValidos; // Habilita/desabilita o botão conforme a validade do formulário
    });

    // Evento de envio do formulário
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        // Coletar os dados do formulário
        const formData = new FormData(form);

        // Obter itens do carrinho do localStorage
        let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

        // Verificar se o carrinho está vazio
        if (carrinho.length === 0) {
            alert('Seu carrinho está vazio.');
            return;
        }

        // Calcular o valor total da compra
        let total = 0;
        carrinho.forEach(item => {
            total += item.preco;
        });

        // Criar a lista de acessórios comprados
        const itemsComprados = carrinho.map(item => `**${item.nome}** - R$ ${item.preco.toFixed(2)}`).join('\n');

        // Verificar se uma imagem de comprovante foi anexada
        const comprovante = formData.get('foto-comprovante');
        if (!comprovante) {
            alert('Por favor, anexe o comprovante de pagamento.');
            return;
        }

        // Criar uma nova requisição multipart para enviar o comprovante como attachment
        const requestFormData = new FormData();
        requestFormData.append('file', comprovante); // Adiciona o comprovante

        // Adiciona a mensagem ao webhook
        requestFormData.append('payload_json', JSON.stringify({
            username: "Nova Compra",
            embeds: [{
                title: "Detalhes da Compra",
                fields: [
                    {
                        name: "País",
                        value: formData.get('pais'),
                        inline: true
                    },
                    {
                        name: "Estado",
                        value: formData.get('estado'),
                        inline: true
                    },
                    {
                        name: "Cidade",
                        value: formData.get('cidade'),
                        inline: true
                    },
                    {
                        name: "Bairro e Rua",
                        value: formData.get('bairro'),
                        inline: true
                    },
                    {
                        name: "Número da Casa",
                        value: formData.get('numero'),
                        inline: true
                    },
                    {
                        name: "Telefone",
                        value: formData.get('telefone'),
                        inline: true
                    },
                    {
                        name: "Itens Comprados",
                        value: itemsComprados,
                        inline: false
                    },
                    {
                        name: "Valor Total",
                        value: `R$ ${total.toFixed(2)}`,
                        inline: true
                    }
                ],
                image: {
                    url: "attachment://"+comprovante.name // Nome do arquivo para exibir como imagem no embed
                }
            }]
        }));

        // Enviar os dados para o webhook
        fetch(webhookUrl, {
            method: 'POST',
            body: requestFormData
        })
        .then(response => {
            if (response.ok) {
                alert('Compra finalizada com sucesso!');
                localStorage.removeItem('carrinho'); // Limpa o carrinho
                form.reset(); // Limpa o formulário
                window.location.href = 'index.html'; // Redireciona para a página inicial
            } else {
                alert('Erro ao finalizar a compra. Por favor, tente novamente.');
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Erro ao enviar a compra. Verifique sua conexão e tente novamente.');
        });
    });
});
