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

    let div = document.querySelector('.doações')

    if (results.success) {
        results.data.forEach(agendamento => {
            let doacao = document.createElement('div');
            doacao.classList.add('doação');

                let cabecalho = document.createElement('div');
                cabecalho.classList.add('cabecalho');

                let img = document.createElement('img');
                img.src = '/front/img/perfil_insti.svg'
                img.classList.add('img');


                let h4 = document.createElement('div');
                h4.classList.add('h4');
                // h4.value = agendamento.id

                    img.appendChild(h4)
                    cabecalho.appendChild(img)

                let doacao_dois = document.createElement('div');
                doacao_dois.classList.add('doacao-dois');

                    let data = document.createElement('p');
                    data.classList.add('data');

                    let status = document.createElement('div');
                    status.classList.add('status');

                    let status_desc = document.createElement('p');
                    status_desc.classList.add('status_desc');

                    let status_status = document.createElement('p');

                    status_status.textContent = agendamento.status

                    if (agendamento.status == "Agendada") {
                        status_status.classList.add('agendada');
                    }else{
                        status_status.classList.add('realizada');
                    }

                    // button e appends
                    








            
        });
    } else {
        console.error('Nenhum agendamento encontrado para este colaborador:', results.message);
    }
}

getTask();
