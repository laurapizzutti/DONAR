async function getItems() {
    const Insti = localStorage.getItem('ID_insti');

    const response = await fetch('/api/itens/' + Insti, {
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
    console.log(item)
    let qnt = document.getElementById('quant').value;
    let date = document.getElementById("data").value; 
    let hora = document.getElementById("hora").value; 
    const Id_User = localStorage.getItem('id');
    console.log(Id_User)
    if (!Id_User) {
        alert("Faça login para agendar uma doação.");
        window.location.href = '/front/html/login.html';
        return;
    }
    const Insti = localStorage.getItem('ID_insti');

    if (!date || !hora || !qnt) {
        alert("Preencha a data, o horário e a quantidade de itens antes de agendar.");
        return;
    }

    let data = { item, date, hora, qnt, Id_User, Insti };

    try {
        const response = await fetch('/api/store/task', {
            method: "POST", 
            headers: { "Content-Type": "application/json;charset=UTF-8" }, 
            body: JSON.stringify(data)
        });

        let results = await response.json();

        if (!response.ok) {
            const motivo = results.data && results.data.sqlMessage ? `\n\nDetalhe: ${results.data.sqlMessage}` : '';
            alert(`Não foi possível agendar a doação.${motivo}`);
            return;
        }

        if (results.success) {
           window.location.href = '/front/html/agendada.html';
        } else {
            alert("Não foi possível agendar a doação.");
        }

    } catch (error) {
        console.error("Erro ao enviar a requisição:", error);
        alert("Erro ao enviar a requisição. Verifique o console para mais detalhes.");
    }
};

getItems();
