async function getTask() {
    let Id_User = localStorage.getItem('id');
    console.log('ID do usuário: ', Id_User)
    let Tipo_User = localStorage.getItem('tipo_user');
    console.log('Tipo de usuário: ', Tipo_User)

    if (Tipo_User == 'Colaborador') {
        const response = await fetch(`http://localhost:3005/api/get/task/${Id_User}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            console.error(`Erro na requisição: ${response.statusText}`);
            return;
        }

        const results = await response.json();
        console.log(results);

        if (results.success) {
            let id_agendamento = results.data.id_doador;
            console.log('ID do agendamento:', id_agendamento);

            // Se quiser adicionar os resultados ao DOM:
            // let doacoes = results.data;
            // let div = document.querySelector('.doações');

            // doacoes.map(doacao => {
            //     let htmlItem = document.createElement('div');
            //     htmlItem.classList.add('doação');
            //     const quantidadeSpan = document.createElement('span');
            //     quantidadeSpan.classList.add('quantidade');
            //     quantidadeSpan.textContent = `${doacao.qnt}x`;
            //     const nomeSpan = document.createElement('span');
            //     nomeSpan.classList.add('item');
            //     nomeSpan.textContent = doacao.item;
            //     htmlItem.appendChild(quantidadeSpan);
            //     htmlItem.appendChild(nomeSpan);
            //     div.appendChild(htmlItem);
            // });
        } else {
            console.error('Erro ao recuperar os agendamentos:', results.message);
        }
    }
}

getTask();
