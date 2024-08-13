async function getTask() {
        Tipo_User = localStorage.getItem('tipo_user');
            if (Tipo_User == 'Colaborador') {
                Id_User = localStorage.getItem('id');
                console.log(`ID do usuário: ${Id_User}`);

                const response = await fetch('http://localhost:3005/api/itens/' + Id_User, {
                    method: "GET",
                    headers: {
                        "Content-Type":"application/json"
                    }
                })

                const results = await response.json();
                console.log('ID do usuário: ', Id_User)
                console.log(results)
            }

//     if(results.success) {
//         let itens = results.data;

//         let tabela = document.getElementById('tabela');

//         itens.map(item => {
//             let htmlItem = document.createElement('div');
//             htmlItem.classList.add('opcao');
    
//             const quantidadeSpan = document.createElement('span');
//             quantidadeSpan.classList.add('quantidade');
//             quantidadeSpan.textContent = `${item.qnt_itens}x`;
    
//             const nomeSpan = document.createElement('span');
//             nomeSpan.classList.add('item');
//             nomeSpan.textContent = item.item;
    
//             htmlItem.appendChild(quantidadeSpan);
//             htmlItem.appendChild(nomeSpan); 

//             tabela.appendChild(htmlItem);
//         });
//         if (adicionarItem.style.display === 'block') {
//             Excluir(true);
//         }
//     }
}

getTask();
