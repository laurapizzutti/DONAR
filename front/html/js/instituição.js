const tabela = document.getElementById('tabela');
const atualizar = document.getElementById('atualizar');
const adicionarItem = document.getElementById('adicionarItem');
const salvar = document.getElementById('salvar');
const popup = document.getElementById('popup');
const fecharPopup = document.getElementById('fecharPopup');
const salvarItem = document.getElementById('salvarItem');
const quantidade = document.getElementById('quantidade');
const nomeItem = document.getElementById('nomeItem');


atualizar.onclick = function(event) {
    if (tabela.innerHTML.trim() === "") {
        popup.style.display = 'block';
    } else {
       
        adicionarItem.style.display = 'block';
        salvar.style.display = 'block';
        atualizar.style.display = 'none'; 
        Excluir(true);
    }
}

adicionarItem.onclick = function(event) {
    popup.style.display = 'block';
}

salvar.onclick = function(event) {
    adicionarItem.style.display = 'none';
    salvar.style.display = 'none';
    atualizar.style.display = 'block'; 
    Excluir(false); 
}


function Excluir(exibir) {
    const itens = document.querySelectorAll('.opcao');
    itens.forEach(item => {
        if (exibir) {
            let lixeira = item.querySelector('.lixeira-icon');
            if (!lixeira) {
                lixeira = document.createElement('span');
                lixeira.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5V6h-5v-.5zM2 6h12v8.5a1.5 1.5 0 0 1-1.5 1.5H3.5A1.5 1.5 0 0 1 2 14.5V6zM7 1a1 1 0 0 1 1-1h.5a1 1 0 0 1 1 1H12a2 2 0 0 1 2 2H2a2 2 0 0 1 2-2h3z"/>
                    </svg>
                `;
                lixeira.classList.add('lixeira-icon');
                item.appendChild(lixeira);

                // Capturar o id_item no clique do ícone de lixeira.
                lixeira.onclick = async function () {
                    const id_item = item.getAttribute('data-id'); // Captura do ID do item
                
                    if (id_item) {
                        try {
                            const response = await fetch(`http://localhost:3001/api/delete/item/${id_item}`, {
                                method: "DELETE",
                                headers: {
                                    "Content-Type": "application/json"
                                }
                            });
                
                            if (response.ok) {
                                item.remove();
                            } else {
                                const result = await response.json();
                                alert(`Erro ao remover item: ${result.message}`);
                            }
                        } catch (error) {
                            console.error("Erro na requisição DELETE:", error);
                            alert('Erro ao tentar remover o item.');
                        }
                    } else {
                        alert('ID do item não encontrado.');
                    }
                };                
                
            }
        } else {
            const lixeira = item.querySelector('.lixeira-icon');
            if (lixeira) {
                lixeira.remove();
            }
        }
    });
}


fecharPopup.onclick = function() {
    popup.style.display = 'none';
}

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

  
    if (response.ok) {
        popup.style.display = 'none';
        tabela.innerHTML = ''; 
        await getItens();  
        
        adicionarItem.style.display = 'block';
        salvar.style.display = 'block';
        atualizar.style.display = 'none';
        
        Excluir(true); 
    }
}

// Garantir que a função é assíncrona.
async function getItens() {
    const Id_User = localStorage.getItem('id');

    try {
        const response = await fetch(`http://localhost:3001/api/itens/${Id_User}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const results = await response.json();
        console.log('ID do usuário: ', Id_User);
        console.log(results);

        if (results.success) {
            const itens = results.data;
            tabela.innerHTML = ''; // Limpar tabela antes de renderizar novos itens.

            itens.forEach(item => {
                let htmlItem = document.createElement('div');
                htmlItem.classList.add('opcao');
                htmlItem.setAttribute('data-id', item.id_item); // Verifique se 'id_item' existe
                
                const quantidadeSpan = document.createElement('span');
                quantidadeSpan.classList.add('quantidade');
                quantidadeSpan.textContent = `${item.qnt_itens}x`;
                
                const nomeSpan = document.createElement('span');
                nomeSpan.classList.add('item');
                nomeSpan.textContent = item.item;
                
                htmlItem.appendChild(quantidadeSpan);
                htmlItem.appendChild(nomeSpan);
                tabela.appendChild(htmlItem);                
            });

            if (adicionarItem.style.display === 'block') {
                Excluir(true); // Mostrar ícones de exclusão.
            }
        }
    } catch (error) {
        console.error('Erro ao carregar itens:', error);
    }
}
// Chamar a função getItens corretamente.
getItens();

function Editar(event) {
    event.preventDefault();

    window.location.href = '/front/html/editar_perfil.html'
}

async function getUser() {
    let Id_User = localStorage.getItem('id');
    console.log(Id_User)

    const response = await fetch(`http://localhost:3001/api/get/userdata/${Id_User}` , 
    {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });

    const results = await response.json();
    console.log(results)

    if (results.success) {

        let nome = document.querySelector('#nomeUsuario');
        nome.textContent = results.data.nome;
        let desc = document.querySelector('.intro-intro');
        desc.textContent = results.data.descricao;
      
    } else {
        console.log('Nenhum item encontrado para esta instituição');
    }
}

getUser()
