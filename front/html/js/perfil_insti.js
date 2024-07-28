document.addEventListener('DOMContentLoaded', function () {
    const tabela = document.getElementById('tabela');
    const atualizarButton = document.getElementById('atualizar');
    const adicionarItemButton = document.getElementById('adicionarItem');
    const popup = document.getElementById('popup');
    const fecharPopup = document.getElementById('fecharPopup');
    const salvarItemButton = document.getElementById('salvarItem');
    const quantidadeInput = document.getElementById('quantidade');
    const nomeItemInput = document.getElementById('nomeItem');

    let quantidadeItem = [];
    let descItem = [];
    let editIndex = null; // Para rastrear o índice do item em edição

    async function carregarItens() {
        try {
            const response = await fetch('/api/tabela');
            const data = await response.json();
            quantidadeItem = data.map(item => item.quantidade);
            descItem = data.map(item => item.nome);
            renderizarItens(true);
        } catch (error) {
            console.error('Erro ao carregar itens:', error);
        }
    }

    async function salvarVersaoTabela() {
        try {
            const items = quantidadeItem.map((quantidade, index) => ({
                quantidade: quantidade,
                nome: descItem[index]
            }));

            await fetch('/api/tabela', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(items)
            });
            console.log('Versão da tabela salva:', items);
        } catch (error) {
            console.error('Erro ao salvar itens:', error);
        }
    }

    async function removerItem(index) {
        try {
            const itemToDelete = {
                quantidade: quantidadeItem[index],
                nome: descItem[index]
            };

            await fetch('/api/tabela', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(itemToDelete)
            });
            console.log('Item removido:', itemToDelete);
        } catch (error) {
            console.error('Erro ao remover item:', error);
        }
    }

    function alternarPopup() {
        popup.style.display = popup.style.display === 'flex' ? 'none' : 'flex';
    }

    function adicionarItem(quantidade, nome, comAcoes = false) {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('opcao');
    
        const quantidadeSpan = document.createElement('span');
        quantidadeSpan.classList.add('quantidade');
        quantidadeSpan.textContent = `${quantidade}x`; // Adiciona o 'x' ao lado da quantidade
    
        const nomeSpan = document.createElement('span');
        nomeSpan.classList.add('item');
        nomeSpan.textContent = nome;
    
        itemDiv.appendChild(quantidadeSpan);
        itemDiv.appendChild(nomeSpan);
    
        if (comAcoes) {
            const editarButton = document.createElement('button');
            editarButton.classList.add('editar');
            editarButton.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                    <path d="M12.146.854a.5.5 0 0 1 .708 0l2.292 2.292a.5.5 0 0 1 0 .708l-9.6 9.6A.5.5 0 0 1 5.5 13H3.5a.5.5 0 0 1-.5-.5V10.5a.5.5 0 0 1 .146-.354l9.6-9.6zM11.5 2.5L3 11v2h2l8.5-8.5-2-2zM4.146 12H2.5v-1.646L11.5 3.5l1.646 1.646L4.146 12z"/>
                </svg>
            `; // SVG de edição

            editarButton.addEventListener('click', function () {
                quantidadeInput.value = quantidade;
                nomeItemInput.value = nome;
                editIndex = [...tabela.children].indexOf(itemDiv);
                alternarPopup();
            });

            const excluirButton = document.createElement('button');
            excluirButton.classList.add('excluir');
            excluirButton.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5V6h-5v-.5zM2 6h12v8.5a1.5 1.5 0 0 1-1.5 1.5H3.5A1.5 1.5 0 0 1 2 14.5V6zM7 1a1 1 0 0 1 1-1h.5a1 1 0 0 1 1 1H12a2 2 0 0 1 2 2H2a2 2 0 0 1 2-2h3z"/>
                </svg>
            `; // SVG de exclusão

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

    function adicionarSalvarButton() {
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
            salvarVersaoTabela();
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
            adicionarSalvarButton();
        }
    });

    adicionarItemButton.addEventListener('click', function () {
        alternarPopup();
    });

    fecharPopup.addEventListener('click', function () {
        alternarPopup();
    });

    salvarItemButton.addEventListener('click', async function () {
        const quantidade = quantidadeInput.value;
        const nomeItem = nomeItemInput.value;

        if (quantidade && nomeItem) {
            if (editIndex !== null) {
                quantidadeItem[editIndex] = quantidade;
                descItem[editIndex] = nomeItem;
                editIndex = null;
            } else {
                quantidadeItem.push(quantidade);
                descItem.push(nomeItem);
            }

            await salvarVersaoTabela();
            renderizarItens(true);
            quantidadeInput.value = '';
            nomeItemInput.value = '';
            alternarPopup();

            if (quantidadeItem.length === 1 && descItem.length === 1) {
                adicionarItemButton.style.display = 'block';
                atualizarButton.style.display = 'none';
                adicionarSalvarButton();
            }
        }
    });

    function renderizarItens(comAcoes = false) {
        tabela.innerHTML = ''; // Limpa a tabela
        for (let i = 0; i < quantidadeItem.length; i++) {
            adicionarItem(quantidadeItem[i], descItem[i], comAcoes);
        }
    }

    carregarItens(); // Carrega itens ao carregar a página
});
