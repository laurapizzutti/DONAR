function selecionar(elemento_clicado) {
    // pega a div que está selecionada
    const selecionado = document.querySelector('.selecionado');
    
    // se houver uma div que foi selecionada antes, altera classe  para 'op'
    if (selecionado) {
        selecionado.className = 'op';
    }

    // Altere a classe da div clicada para 'selecionado'
    elemento_clicado.className = 'selecionado';

    // Mostra o conteúdo do span com a classe 'item' dentro da div selecionada
    console.log(elemento_clicado.querySelector('.item').textContent);
}

let opcoes = document.querySelector(".opcoes").querySelectorAll('div.op');
console.log(`Opções encontradas: ${opcoes.length}`);

// Adiciona um evento de click para cada opção
for (let opcao of opcoes) {
    opcao.addEventListener('click', function () {
        selecionar(this);
    });
}


let button = document.getElementById("handleSubmit");

button.onclick = async function(e) {
    e.preventDefault(); 

    // pega os valores do html e amrmazena dentro dessas váriaveis
    let item = document.querySelector('.selecionado .item').textContent;
    let date = document.getElementById("data").value; 
    let hora = document.getElementById("hora").value; 
    let qnt = document.getElementById("quant").value; 

    
    let data = { item, date, hora, qnt }; 

    console.log("Dados a serem enviados:", data); 

    try {
        // envia a requisição fetch
        const response = await fetch('http://localhost:3001/api/store/task', {
            method: "post", 
            headers: { "Content-Type": "application/json;charset=UTF-8" }, 
            body: JSON.stringify(data) 
        });

       
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.statusText}`); 
        }

        let content = await response.json(); 

        if (content.success) {
            alert("Sucesso"); 
            window.location.href = "/front/html/agendamento.html";
        } else {
            alert("Não"); 
        }

    } catch (error) {
        console.error("Erro ao enviar a requisição:", error); 
        alert("Erro ao enviar a requisição. Verifique o console para mais detalhes."); 
    }
};
