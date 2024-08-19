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

    if (results.success) {
        results.data.forEach(agendamento => {
            console.log(`Agendamento ID: ${agendamento.id}`);
            console.log(`Item: ${agendamento.item}`);
            console.log(`Data de Entrega: ${agendamento.data_entrega}`);
            console.log(`Hora de Entrega: ${agendamento.hora_entrega}`);
            console.log(`Quantidade: ${agendamento.qnt}`);
            console.log(`Status: ${agendamento._status}`);
            console.log('----------------------------');
        });
    } else {
        console.error('Nenhum agendamento encontrado para este colaborador:', results.message);
    }
}

getTask();
