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
            // console.log('Processando agendamento:', agendamento);

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
                            // console.log('Nome encontrado:', nomeItem);

                            let h4 = document.createElement('h4');
                            h4.textContent = nomeItem.nome;
                            cabecalho.appendChild(h4);

                            const enderecoInsti = document.createElement('span');
                            enderecoInsti.textContent = nomeItem.endereco;

                            // buttom.setAttribute('endereco', nomeItem.endereco);
                            // console.log(endereco)
                        
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
                        status_status.classList.add('agendada')
                        status_status.textContent = agendamento._status;

                        if (agendamento._status.trim() === "Agendada") {
                            status_status.classList.add('agendada');
                        } else if (agendamento._status.trim() === "Realizada") {
                            status_status.classList.add('realizada');
                        }

                        status.appendChild(status_status);

                        doacao_dois.appendChild(status);
                        doacao.appendChild(doacao_dois);

                        let button = document.createElement('button');
                        button.classList.add('ver-mais');
                        button.textContent = 'Ver mais';

                        let button2 = document.createElement('button');
                        button2.classList.add('buttom_realizada');
                        button2.textContent = 'Realizada';

                        let buttom_div = document.createElement('div');
                        buttom_div.classList.add('buttom_div');

                        buttom_div.appendChild(button);
                        // buttom_div.appendChild(button2);

                        doacao.appendChild(buttom_div);

                        div.appendChild(doacao);

                        button.addEventListener('click', function () {
                            let item = agendamento.item;
                            let quantidade = agendamento.qnt;
                            let ID = agendamento.id_insti

                            let popup_itens = document.getElementById('popup-itens');

                            let op = document.createElement('div');
                            op.classList.add('op');

                            let qnt = document.createElement('span');
                            qnt.classList.add('qnt2');
                            qnt.textContent = `${quantidade}x`;

                            let itemdiv = document.createElement('span');
                            itemdiv.classList.add('item');
                            itemdiv.textContent = item;

                            op.appendChild(qnt);
                            op.appendChild(itemdiv);

                            let popup_div = document.createElement('popup-div');

                            popup_div.innerHTML = '<p class="endereco-popup"> Endereço:  </p> <p p class="hora-popup"> Horário:     </p>';
                            
                            popup_itens.appendChild(popup_div)

                            let divishora = document.querySelector('.hora-popup');
                            
                            let hora = document.createElement('span');
                            hora.classList.add('item-dados-popup');
                            hora.textContent = agendamento.hora_entrega;

                            divishora.appendChild(hora);

                            async function getUser() {
                               
                            
                                const response = await fetch(`http://localhost:3001/api/get/userdata/${ID}` , 
                                {
                                    method: "GET",
                                    headers: {
                                        "Content-Type": "application/json"
                                    }
                                });
                            
                                const results = await response.json();
                                console.log(results)
                            
                                if (results.success) {

                                    console.log(results.data.endereco)

                                    let divis = document.querySelector('.endereco-popup');
                            
                                    let ende = document.createElement('span');
                                    ende.classList.add('item-dados-popup');
                                    ende.textContent = results.data.endereco;

                                    divis.appendChild(ende);


                                } else {
                                    console.log('Nenhum item encontrado para esta instituição');
                                }
                            }
                            
                            getUser()

                            popup_itens.appendChild(op);

                            document.getElementById('popup').style.display = 'block';
                        });

                        button2.addEventListener('click', async function () {
                            let id_agendamento = agendamento.id;
                            console.log("ID do agendamento:", id_agendamento)
                            let data = { _status: 'Realizada' };
                        
                            try {
                                const response = await fetch(`http://localhost:3001/api/update/task/${id_agendamento}`, {
                                    method: "POST",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify(data) 
                                });
                        
                                const results = await response.json();
                        
                                if (results.success) {
                                    console.log('Status atualizado com sucesso!');
                                    status_status.classList.remove('agendada');
                                    status_status.classList.add('realizada');
                                    status_status.textContent = 'Realizada';
                                    
                                } else {
                                    console.log('Erro:', results.message);
                                }
                        
                            } catch (error) {
                                console.error('Erro na requisição:', error);
                            }
                        });
                        
                                           

                    } else {
                        console.log('Nenhum item encontrado para esta instituição');
                    }
            }
            getInstiName();
        });

        window.addEventListener('click', function (event) {
            if (event.target === document.getElementById('popup')) {
                document.getElementById('popup').style.display = 'none';
            }
        });

    } else {
        console.error('Nenhum agendamento encontrado para este colaborador:', results.message);
    }
}

getTask();

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

        let nome = document.querySelector('.usuario-nome');
        nome.textContent = results.data.nome;
        let desc = document.querySelector('.intro-intro');
        desc.textContent = results.data.descricao;
      
    } else {
        console.log('Nenhum item encontrado para esta instituição');
    }
}

getUser()