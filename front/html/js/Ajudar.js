async function getItems() {
    const Insti = localStorage.getItem('ID_insti');

    const response = await fetch('http://localhost:3005/api/itens/' + Insti, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });

    const results = await response.json();

    if (results.success) {
        let itens = results.data;
        let tabela = document.getElementById('opcoes');

        itens.forEach(item => {
            let htmlItem = document.createElement('div');
            htmlItem.classList.add('op');

            const quantidadeSpan = document.createElement('span');
            quantidadeSpan.classList.add('qnt2');
            quantidadeSpan.textContent = `${item.qnt_itens}x`;

            const nomeSpan = document.createElement('span');
            nomeSpan.classList.add('item');
            nomeSpan.textContent = item.item;

            htmlItem.appendChild(quantidadeSpan);
            htmlItem.appendChild(nomeSpan);

            // Armazena os dados do item no elemento
            htmlItem.data = item;

            // Adiciona o evento de clique para seleção
            htmlItem.onclick = function() {
                selecionar(this);
            };

            tabela.appendChild(htmlItem);
        });
    } else {
        console.log('Nenhum item encontrado para esta instituição');
    }
}

function selecionar(elemento_clicado) {
    const selecionado = document.querySelector('.selecionado');
    
    if (selecionado) {
        selecionado.classList.remove('selecionado');
        selecionado.classList.add('op');
    }

    elemento_clicado.classList.remove('op');
    elemento_clicado.classList.add('selecionado');
}

document.getElementById("handleSubmit").onclick = async function(e) {
    e.preventDefault();

    const selecionado = document.querySelector('.selecionado');

    if (!selecionado) {
        alert("Por favor, selecione um item antes de agendar sua doação");
        return;
    }

    let item = selecionado.data.item;
    let qnt = document.getElementById('quant').value;
    let date = document.getElementById("data").value; 
    let hora = document.getElementById("hora").value; 
    const Id_User = localStorage.getItem('id');
    const Insti = localStorage.getItem('ID_insti');

    let data = { item, date, hora, qnt, Id_User, Insti };

    try {
        const response = await fetch('http://localhost:3005/api/store/task', {
            method: "POST", 
            headers: { "Content-Type": "application/json;charset=UTF-8" }, 
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.statusText}`);
        }

        let results = await response.json();

        if (results.success) {
           window.location.href = '/front/html/agendamento.html';
        } else {
            alert("Não foi possível agendar a doação.");
        }

    } catch (error) {
        console.error("Erro ao enviar a requisição:", error);
        alert("Erro ao enviar a requisição. Verifique o console para mais detalhes.");
    }
};

getItems();
