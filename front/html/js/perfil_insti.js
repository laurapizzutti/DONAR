document.addEventListener('DOMContentLoaded', function () {
    const tabela = document.getElementById('tabela');
    const atualizarButton = document.getElementById('atualizar');
    const adicionarItemButton = document.getElementById('adicionarItem');
    const popup = document.getElementById('popup');
    const fecharPopup = document.getElementById('fecharPopup');
    const salvarItemButton = document.getElementById('salvarItem');
    const salvarTabelaButton = document.getElementById('SalvarTabela');
    const quantidadeInput = document.getElementById('quantidade');
    const nomeItemInput = document.getElementById('nomeItem');

    let quantidadeItem = [];
    let descItem = [];
    let indice = null;

    async function carregarItens() {
        try {
            const response = await fetch('http://localhost:3001/api/get/tabela');
            const data = await response.json();
            
            quantidadeItem = data.data.map(item => item.quantidade);
            descItem = data.data.map(item => item.nome);
            renderizarItens(true);
        } catch (error) {
            console.error('Erro ao carregar itens:', error);
        }
    }

    async function salvarTabela() {
        try {
            const items = quantidadeItem.map((quantidade, index) => ({
                quantidade: Number(quantidade),  // Assegure-se de que seja um número
                nome: descItem[index]  // Certifique-se de que seja uma string válida
            }));
            
    
            console.log('Dados que serão enviados:', items); // Adiciona este log
    
            const response = await fetch('http://localhost:3001/api/store/tabela', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(items)
            });
    
            if (!response.ok) {
                const errorDetails = await response.json(); // Ou response.text() se não for JSON
                throw new Error(`Erro na resposta da API: ${errorDetails.message || 'Erro desconhecido'}`);
            }
            
            
            console.log('Versão da tabela salva:', items);
        } catch (error) {
            console.error('Erro ao salvar itens:', error);
        }
    }
    

    async function removerItem(index) {
        try {
            const itemDeletar = {
                quantidade: quantidadeItem[index],
                nome: descItem[index]
            };

            const response = await fetch('http://localhost:3001/api/delete/tabela', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(itemDeletar)
            });
            if (!response.ok) {
                throw new Error('Erro na resposta da API');
            }
            console.log('Item removido:', itemDeletar);
        } catch (error) {
            console.error('Erro ao remover item:', error);
        }
    }

    function alternarPopup() {
        popup.style.display = popup.style.display === 'flex' ? 'none' : 'flex';
    }

    function adicionarItem(quantidade, nome, Rodando = false) {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('opcao');

        const quantidadeSpan = document.createElement('span');
        quantidadeSpan.classList.add('quantidade');
        quantidadeSpan.textContent = `${quantidade}x`;

        const nomeSpan = document.createElement('span');
        nomeSpan.classList.add('item');
        nomeSpan.textContent = nome;

        itemDiv.appendChild(quantidadeSpan);
        itemDiv.appendChild(nomeSpan);

        if (Rodando) {
            const editarButton = document.createElement('button');
            editarButton.classList.add('editar');
            editarButton.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                    <path d="M12.146.854a.5.5 0 0 1 .708 0l2.292 2.292a.5.5 0 0 1 0 .708l-9.6 9.6A.5.5 0 0 1 5.5 13H3.5a.5.5 0 0 1-.5-.5V10.5a.5.5 0 0 1 .146-.354l9.6-9.6zM11.5 2.5L3 11v2h2l8.5-8.5-2-2zM4.146 12H2.5v-1.646L11.5 3.5l1.646 1.646L4.146 12z"/>
                </svg>
            `;

            editarButton.addEventListener('click', function () {
                quantidadeInput.value = quantidade;
                nomeItemInput.value = nome;
                indice = [...tabela.children].indexOf(itemDiv);
                alternarPopup();
            });

            const excluirButton = document.createElement('button');
            excluirButton.classList.add('excluir');
            excluirButton.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5V6h-5v-.5zM2 6h12v8.5a1.5 1.5 0 0 1-1.5 1.5H3.5A1.5 1.5 0 0 1 2 14.5V6zM7 1a1 1 0 0 1 1-1h.5a1 1 0 0 1 1 1H12a2 2 0 0 1 2 2H2a2 2 0 0 1 2-2h3z"/>
                </svg>
            `;

            excluirButton.addEventListener('click', async function () {
                const index = [...tabela.children].indexOf(itemDiv);
                quantidadeItem.splice(index, 1);
                descItem.splice(index, 1);
                await removerItem(index);
                renderizarItens(true);
            });

            itemDiv.appendChild(editarButton);
            itemDiv.appendChild(excluirButton);
        }

        tabela.appendChild(itemDiv);
    }

    function adicionarSalvar() {
        const salvarButtonExistente = document.getElementById('salvar');
        if (salvarButtonExistente) {
            salvarButtonExistente.remove();
        }

        const salvarButton = document.createElement('button');
        salvarButton.type = 'button';
        salvarButton.classList.add('botao');
        salvarButton.id = 'salvar';
        salvarButton.textContent = 'Salvar';
        salvarButton.addEventListener('click', function () {
            salvarTabela();
            adicionarItemButton.style.display = 'none';
            salvarButton.remove();
            atualizarButton.style.display = 'block';
            renderizarItens(false);
        });
        tabela.parentNode.insertBefore(salvarButton, adicionarItemButton);
    }

    atualizarButton.addEventListener('click', function () {
        if (quantidadeItem.length === 0 && descItem.length === 0) {
            alternarPopup();
        } else {
            renderizarItens(true);
            adicionarItemButton.style.display = 'block';
            atualizarButton.style.display = 'none';
            adicionarSalvar();
        }
    });

    adicionarItemButton.addEventListener('click', function () {
        alternarPopup();
    });

    fecharPopup.addEventListener('click', function () {
        alternarPopup();
    });

    salvarItemButton.addEventListener('click', function () { // Remove o async aqui
        const quantidade = quantidadeInput.value;
        const nomeItem = nomeItemInput.value;

        if (quantidade && nomeItem) {
            if (indice !== null) {
                quantidadeItem[indice] = quantidade;
                descItem[indice] = nomeItem;
                indice = null;
            } else {
                quantidadeItem.push(quantidade);
                descItem.push(nomeItem);
            }

            // Não chamamos salvarTabela aqui
            renderizarItens(true);
            quantidadeInput.value = '';
            nomeItemInput.value = '';
            alternarPopup();

            if (quantidadeItem.length === 1 && descItem.length === 1) {
                adicionarItemButton.style.display = 'block';
                atualizarButton.style.display = 'none';
                adicionarSalvar();
            }
        }
    });

    function renderizarItens(Rodando = false) {
        tabela.innerHTML = '';
        for (let i = 0; i < quantidadeItem.length; i++) {
            adicionarItem(quantidadeItem[i], descItem[i], Rodando);
        }
    }

    carregarItens();
});
