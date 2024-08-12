const tabela = document.getElementById('tabela');
const atualizarButton = document.getElementById('atualizar');
const adicionarItemButton = document.getElementById('adicionarItem');
const salvarButton = document.getElementById('salvar');
const popup = document.getElementById('popup');
const fecharPopup = document.getElementById('fecharPopup');
const salvarItemButton = document.getElementById('salvarItem');
const quantidadeInput = document.getElementById('quantidade');
const nomeItemInput = document.getElementById('nomeItem');

// Evento onclick para o botão Atualizar
atualizarButton.onclick = function(event) {
    if (tabela.innerHTML.trim() === "") {
        // Se a tabela estiver vazia, abrir o popup
        popup.style.display = 'block';
    } else {
        // Se a tabela já tiver itens, exibir os botões Adicionar Item e Salvar
        adicionarItemButton.style.display = 'block';
        salvarButton.style.display = 'block';
        Excluir(true);
    }
}

// Evento onclick para o botão Adicionar Item
adicionarItemButton.onclick = function(event) {
    popup.style.display = 'block';
}

// Evento onclick para o botão Salvar
salvarButton.onclick = function(event) {
    adicionarItemButton.style.display = 'none';
    salvarButton.style.display = 'none';
    Excluir(false);
}

// Função para controlar a exibição dos ícones de lixeira ao lado dos itens
function Excluir(exibir) {
    const itens = document.querySelectorAll('.opcao .item');
    itens.forEach(item => {
        if (exibir) {
            const Lixeira = document.createElement('span');
            Lixeira.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5V6h-5v-.5zM2 6h12v8.5a1.5 1.5 0 0 1-1.5 1.5H3.5A1.5 1.5 0 0 1 2 14.5V6zM7 1a1 1 0 0 1 1-1h.5a1 1 0 0 1 1 1H12a2 2 0 0 1 2 2H2a2 2 0 0 1 2-2h3z"/>
                </svg>
            `;
            Lixeira.classList.add('lixeira-icon');
            item.parentNode.appendChild(Lixeira);
        } else {
            const Lixeira = item.parentNode.querySelector('.lixeira-icon');
            if (Lixeira) {
                Lixeira.remove();
            }
        }
    });
}

// Fechar o popup ao clicar no "x"
fecharPopup.onclick = function() {
    popup.style.display = 'none';
}

// Função para salvar um item no banco de dados
async function SalvarItemDB(event) {
    event.preventDefault();

    const quantidade = document.getElementById("quantidade").value;
    const nomeItem = document.getElementById("nomeItem").value;
    const Id_User = localStorage.getItem('id');

    const data = {quantidade, nomeItem, Id_User};

    console.log(data);

    const response = await fetch('http://localhost:3001/api/store/item', {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(data)
    });

    // Após salvar o item, fechar o popup e atualizar a tabela
    if (response.ok) {
        popup.style.display = 'none';
        tabela.innerHTML = '';  // Limpar a tabela antes de atualizar
        await getItens();  // Atualizar os itens da tabela
        adicionarItemButton.style.display = 'block';
        salvarButton.style.display = 'block';
    }
}

// Função para buscar itens do banco de dados e exibi-los na tabela
async function getItens() {
    const Id_User = localStorage.getItem('id');

    const response = await fetch('http://localhost:3001/api/itens/'+ Id_User, {
        method: "GET",
        headers: {
            "Content-Type":"application/json"
        }
    })

    const results = await response.json();
    console.log('ID do usuário: ', Id_User)
    console.log(results)
    if(results.success) {
        let itens = results.data;

        let tabela = document.getElementById('tabela');

        itens.map(item => {
            let htmlItem = document.createElement('div');
            htmlItem.classList.add('opcao');
    
            const quantidadeSpan = document.createElement('span');
            quantidadeSpan.classList.add('quantidade');
            quantidadeSpan.textContent = `${item.qnt_itens}x`;
    
            const nomeSpan = document.createElement('span');
            nomeSpan.classList.add('item');
            nomeSpan.textContent = item.item;
    
            htmlItem.appendChild(quantidadeSpan);
            htmlItem.appendChild(nomeSpan); 

            tabela.appendChild(htmlItem);
        })
    }
}

// Carregar os itens na tabela ao abrir a página
getItens();
