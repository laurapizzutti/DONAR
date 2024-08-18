async function getTask() {
    Id_User = localStorage.getItem('id');
    console.log('ID do usuário: ', Id_User)
    Tipo_User = localStorage.getItem('tipo_user');
    console.log('ID do usuário: ', Tipo_User)
    if (Tipo_User = 'Colaborador') {
        Id_User = localStorage.getItem('id');

        const response = await fetch('http://localhost:3005/api/itens/' + Id_User, {
            method: "GET",
            headers: {
                "Content-Type":"application/json"
            }
        })

        const results = await response.json();
           
            console.log(results)
            id_agendamento = results.data.id
            console.log('ID do agendamento:', id_agendamento)

            if(results.success) {
                let doacoes = results.data;
            
                let div = document.querySelector('doações');

                // item, data_entrega, hora_entrega, qnt, id_doador
            
                    doacoes.map(doacoes => {
                        let htmlItem = document.createElement('div');
                        htmlItem.classList.add('doação');
                
                        const quantidadeSpan = document.createElement('span');
                        quantidadeSpan.classList.add('quantidade');
                        quantidadeSpan.textContent = `${doacoes.qnt}x`;
                
                        const nomeSpan = document.createElement('span');
                        nomeSpan.classList.add('item');
                        nomeSpan.textContent = doacoes.item;
                
                        htmlItem.appendChild(quantidadeSpan);
                        htmlItem.appendChild(nomeSpan); 

                        console.log(htmlItem)
            
                        div.appendChild(htmlItem);
                    });
            }
    }
}

getTask();
