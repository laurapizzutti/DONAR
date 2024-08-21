async function getTask() {
    let Id_User = localStorage.getItem('id');
    console.log('ID do colaborador: ', Id_User);

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

    const div = document.querySelector('doações')

    if (results.success) {
        results.data.forEach(agendamento => {

            let doacao = document.createElement('div');
            doacao.classList.add('doação');

                let cabecalho = document.createElement('div');
                cabecalho.classList.add('cabecalho');

                let img = document.createElement('img');
                img.src = '/front/img/perfil_insti.svg'
                img.classList.add('img');

                async function getInstiName() { 
                    const response = await fetch(`http://localhost:3005/api/get/InstiName${agendamento.id_insti}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                
                const nome = await response.json();

                if (nome.success) {

                    nome.data.forEach(nome => { 
                            let h4 = document.createElement('div');
                            h4.classList.add('h4');
                            h4.textContent = nome.id

                        cabecalho.appendChild(h4)
                        cabecalho.appendChild(img)

                        let doacao_dois = document.createElement('div');
                        doacao_dois.classList.add('doacao-dois');
        
                            let data = document.createElement('p');
                            data.classList.add('data');
                            data.textContent = agendamento.data_entrega
        
                            let status = document.createElement('div');
                            status.classList.add('status');
        
                            let status_desc = document.createElement('p');
                            status_desc.classList.add('status_desc');
        
                            let status_status = document.createElement('p');
        
                            status_status.textContent = agendamento._status
        
                            if (agendamento._status == "Agendada") {
                                status_status.classList.add('agendada');
                            }else{
                                status_status.classList.add('realizada');
                            }

                                status.appendChild(status_desc)
                                status.appendChild(status_status)

                            doacao_dois.appendChild(data)
                            doacao_dois.appendChild(status)
                           
                            let button = document.createElement('button');
                            button.classList.add('.ver-mais');

                        doacao.appendChild(cabecalho)
                        doacao.appendChild(doacao_dois)
                        doacao.appendChild(button)

                    div.appendChild(doacao)
                    })

                } else {
                    console.log('Nenhum item encontrado para esta instituição');
                }
            }  // button e appends
        })
    } else {
        console.error('Nenhum agendamento encontrado para este colaborador:', results.message);
    }
}

getTask();
