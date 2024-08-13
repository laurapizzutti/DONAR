async function getTask() {
    Tipo_User = localStorage.getItem('tipo_user');
    if (Tipo_User == 'Colaborador') {
        Id_User = localStorage.getItem('id');

        const response = await fetch('http://localhost:3005/api/itens/' + Id_User, {
            method: "GET",
            headers: {
                "Content-Type":"application/json"
            }
        })

        const results = await response.json();
            console.log('ID do usuário: ', Id_User)
            console.log(results)

            if(results.success) {
                let doacoes = results.data;
            
                let div = document.querySelector('doações');

                // item, data_entrega, hora_entrega, qnt, id_doador
            
                    doacoes.map(item => {
                        let htmlItem = document.createElement('div');
                        htmlItem.classList.add('doação');
                
                        // const quantidadeSpan = document.createElement('span');
                        // quantidadeSpan.classList.add('quantidade');
                        // quantidadeSpan.textContent = `${item.qnt_itens}x`;
                
                        // const nomeSpan = document.createElement('span');
                        // nomeSpan.classList.add('item');
                        // nomeSpan.textContent = item.item;
                
                        // htmlItem.appendChild(quantidadeSpan);
                        // htmlItem.appendChild(nomeSpan); 
            
                        div.appendChild(htmlItem);
                    });
            }
    }
}

getTask();
