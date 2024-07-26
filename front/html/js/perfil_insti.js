document.addEventListener("DOMContentLoaded", () => {
    const tabela = document.getElementById('tabela');
    const mostrarPopupBotao = document.getElementById('mostrarPopup');
    const popup = document.getElementById('popup');
    const fecharPopupBotao = document.getElementById('fecharPopup');
    const salvarItemBotao = document.getElementById('salvarItem');
    const quantidadeInput = document.getElementById('quantidade');
    const nomeItemInput = document.getElementById('nomeItem');
    const tituloPopup = document.getElementById('tituloPopup');

    let itemEditando = null;

    function alternarPopup() {
        popup.style.display = popup.style.display === 'flex' ? 'none' : 'flex';
    }

    function limparInputs() {
        quantidadeInput.value = '';
        nomeItemInput.value = '';
        itemEditando = null;
    }

    function adicionarItem() {
        const quantidade = quantidadeInput.value;
        const nomeItem = nomeItemInput.value;

        if (quantidade && nomeItem) {
            const opcao = document.createElement('div');
            opcao.classList.add('opcao');

            opcao.innerHTML = `
                <span class="quantidade">${quantidade}x</span>
                <span class="item">${nomeItem}</span>
                <div>
                    <button class="editar">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zM13.752 4.396l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                        </svg>
                    </button>
                    <button class="excluir">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                        </svg>
                    </button>
                </div>
            `;

            const editarBotao = opcao.querySelector('.editar');
            const excluirBotao = opcao.querySelector('.excluir');

            editarBotao.addEventListener('click', () => editarItem(opcao, quantidade, nomeItem));
            excluirBotao.addEventListener('click', () => excluirItem(opcao));

            tabela.appendChild(opcao);
            alternarPopup();
            limparInputs();
        } else {
            alert("Por favor, preencha todos os campos.");
        }
    }

    function editarItem(opcao, quantidade, nomeItem) {
        itemEditando = opcao;
        quantidadeInput.value = quantidade;
        nomeItemInput.value = nomeItem;
        tituloPopup.textContent = "Editar Item";
        alternarPopup();
    }

    function excluirItem(opcao) {
        tabela.removeChild(opcao);
    }

    mostrarPopupBotao.addEventListener('click', () => {
        tituloPopup.textContent = "Adicionar Item";
        alternarPopup();
    });

    fecharPopupBotao.addEventListener('click', () => {
        alternarPopup();
        limparInputs();
    });

    salvarItemBotao.addEventListener('click', () => {
        if (itemEditando) {
            const quantidade = quantidadeInput.value;
            const nomeItem = nomeItemInput.value;

            if (quantidade && nomeItem) {
                itemEditando.querySelector('.quantidade').textContent = `${quantidade}x`;
                itemEditando.querySelector('.item').textContent = nomeItem;
                alternarPopup();
                limparInputs();
            } else {
                alert("Por favor, preencha todos os campos.");
            }
        } else {
            adicionarItem();
        }
    });
});


// let button = document.getElementById("handleSubmit");

// button.onclick = async function(e) {
//     e.preventDefault(); 

//     let nome = document.querySelector('.registro .nome').value;
//     let email = document.querySelector('.registro .email').value; 
//     let senha = document.querySelector('.registro .senha').value; 
//     let tipo_usuario = document.querySelector('.registro .tipo_usuario').value; 
//     let endereco = document.querySelector('.registro .endereco').value; 

    
//     let data = { item, qnt_itens }; 

//     console.log("Dados que serão enviados:", data); 

//     try {
        
//         const response = await fetch('http://localhost:3001/api/store/tabela', {
//             method: "post", 
//             headers: { "Content-Type": "application/json;charset=UTF-8" }, 
//             body: JSON.stringify(data) 
//         });

       
//         if (!response.ok) {
//             throw new Error(`Erro na requisição: ${response.statusText}`); 
//         }

//         let content = await response.json(); 

//         if (content.success) {
//             alert("Sucesso"); 
//             window.location.href = "/front/html/login.html";
//         } else {
//             alert("Não"); 
//         }

//     } catch (error) {
//         console.error("Erro ao enviar a requisição:", error); 
//         alert("Erro ao enviar a requisição. Verifique o console para mais detalhes."); 
//     }
// }; 