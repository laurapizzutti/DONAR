async function getTask() {
    let Id_User = localStorage.getItem('id');
    console.log('ID do colaborador:', Id_User);

    const response = await fetch(`http://localhost:3001/api/get/task/${Id_User}`, {
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
    const div = document.querySelector('.doações');

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
            cabecalho.appendChild(img);

            async function getInstiName() {
                const response = await fetch(`http://localhost:3001/api/get/InstiName/${agendamento.id_insti}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                const nome = await response.json();

                if (nome.success) {
                    nome.data.forEach(nomeItem => {
                        console.log('Nome encontrado:', nomeItem);

                        let h4 = document.createElement('h4');
                        h4.textContent = nomeItem.nome;
                        cabecalho.appendChild(h4);
                    });

                    doacao.appendChild(cabecalho);

                    let doacao_dois = document.createElement('div');
                    doacao_dois.classList.add('doacao-dois');

                    let data = new Date(agendamento.data_entrega).toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                    });

                    let dataElement = document.createElement('p');
                    dataElement.classList.add('data');
                    dataElement.textContent = data;
                    doacao_dois.appendChild(dataElement);

                    let status = document.createElement('div');
                    status.classList.add('status');

                    let status_desc = document.createElement('p');
                    status_desc.classList.add('status_desc');
                    status_desc.textContent = 'Status';
                    status.appendChild(status_desc);

                    let status_status = document.createElement('p');
                    status_status.id = 'status_status';
                    status_status.textContent = agendamento._status;

                    if (agendamento._status.trim().toLowerCase() === "agendada") {
                        status_status.classList.add('agendada');
                    } else if (agendamento._status.trim().toLowerCase() === "realizada") {
                        status_status.classList.add('realizada');
                    }

                    status.appendChild(status_status);

                    doacao_dois.appendChild(status);
                    doacao.appendChild(doacao_dois);

                    let button = document.createElement('button');
                    button.classList.add('ver-mais');
                    button.textContent = 'Ver mais';

                    // button.setAttribute('data-item', agendamento.item);
                    // button.setAttribute('data-quantidade', agendamento.qnt);

                    doacao.appendChild(button);

                    div.appendChild(doacao);
                } else {
                    console.log('Nenhum item encontrado para esta instituição');
                }
            }

            getInstiName();
        });

       buttom.querySelector('ver-mais') = document.addEventListener('click', function(event) {
            
                let item = agendamento.item;
                let quantidade = agendamento.qnt;

                let popup_itens = document.getElementById('popup-itens');
                popup_itens.innerHTML = '';

                let op = document.createElement('div');
                op.classList.add('op');

                let qnt = document.createElement('span');
                qnt.classList.add('qnt2');
                qnt.textContent = `${quantidade}x`;

                let itemSpan = document.createElement('span');
                itemSpan.classList.add('item');
                itemSpan.textContent = item;

                op.appendChild(qnt);
                op.appendChild(itemSpan);

                popup_itens.appendChild(op);

                document.getElementById('popup').style.display = 'block';
       });
        window.addEventListener('click', function(event) {
            document.getElementById('popup').style.display = 'none';
        });


getTask();
