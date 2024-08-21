async function getTask() {
    let Id_User = localStorage.getItem('id');
    console.log('ID do colaborador:', Id_User);

    const response = await fetch(`http://localhost:3005/api/get/task/${Id_User}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });

    console.log('Response status:', response.status);
    console.log('Response:', response);

    if (!response.ok) {
        console.error(`Erro na requisição: ${response.statusText}`);
        return;
    }

    const results = await response.json();
    console.log('Resultados obtidos:', results);

    const div = document.querySelector('.doações');
    if (!div) {
        console.error('Elemento div .doações não encontrado!');
        return;
    }

    if (results.success) {
        results.data.forEach(agendamento => {
            console.log('Processando agendamento:', agendamento);

            let doacao = document.createElement('div');
            doacao.classList.add('doação');

            let cabecalho = document.createElement('div');
            cabecalho.classList.add('cabecalho');

            let img = document.createElement('img');
            img.src = '/front/img/perfil_insti.svg';
            img.classList.add('img');

            // Obtendo o nome da instituição
            async function getInstiName() { 
                console.log('Buscando nome da instituição para o ID:', agendamento.id_insti);

                const response = await fetch(`http://localhost:3005/api/get/InstiName/${agendamento.id_insti}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                console.log('Response status (nome da instituição):', response.status);
                console.log('Response (nome da instituição):', response);

                const nome = await response.json();
                console.log('Nome da instituição:', nome);

                if (nome.success) {
                    nome.data.forEach(nome => {
                        console.log('Nome encontrado:', nome);

                        let h4 = document.createElement('div');
                        h4.classList.add('h4');
                        h4.textContent = nome.id;

                        cabecalho.appendChild(h4);
                        cabecalho.appendChild(img);

                        let doacao_dois = document.createElement('div');
                        doacao_dois.classList.add('doacao-dois');

                        let data = document.createElement('p');
                        data.classList.add('data');
                        data.textContent = agendamento.data_entrega;

                        let status = document.createElement('div');
                        status.classList.add('status');

                        let status_desc = document.createElement('p');
                        status_desc.classList.add('status_desc');

                        let status_status = document.createElement('p');
                        status_status.textContent = agendamento._status;

                        if (agendamento._status === "Agendada") {
                            status_status.classList.add('agendada');
                        } else {
                            status_status.classList.add('realizada');
                        }

                        status.appendChild(status_desc);
                        status.appendChild(status_status);

                        doacao_dois.appendChild(data);
                        doacao_dois.appendChild(status);

                        let button = document.createElement('button');
                        button.classList.add('ver-mais');
                        button.textContent = 'Ver mais';

                        doacao.appendChild(cabecalho);
                        doacao.appendChild(doacao_dois);
                        doacao.appendChild(button);

                        div.appendChild(doacao);
                    });
                } else {
                    console.log('Nenhum item encontrado para esta instituição');
                }
            }

            // Chamar a função para buscar o nome da instituição
            getInstiName().catch(err => console.error('Erro ao buscar o nome da instituição:', err));

        });
    } else {
        console.error('Nenhum agendamento encontrado para este colaborador:', results.message);
    }
}

// Chama a função getTask
getTask().catch(err => console.error('Erro ao buscar as tarefas:', err));
