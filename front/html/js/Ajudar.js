// Função para selecionar a div clicada
function selecionar(elemento_clicado) {
    // Obtenha a div que atualmente está selecionada
    const selecionado = document.querySelector('.selecionado');
    
    // Se houver uma div previamente selecionada, altere sua classe para 'op'
    if (selecionado) {
        selecionado.className = 'op';
    }

    // Altere a classe da div clicada para 'selecionado'
    elemento_clicado.className = 'selecionado';

    // Exiba o conteúdo do span com a classe 'item' dentro da div selecionada
    console.log(elemento_clicado.querySelector('.item').textContent);
}

// Seleciona todas as opções dentro do elemento com a classe 'opcoes'
let opcoes = document.querySelector(".opcoes").querySelectorAll('div.op');
console.log(`Opções encontradas: ${opcoes.length}`);

// Adiciona um evento de clique a cada opção
for (let opcao of opcoes) {
    opcao.addEventListener('click', function () {
        selecionar(this);
    });
}


// Seleciona o botão de envio pelo ID
let button = document.getElementById("handleSubmit");

// Adiciona um evento de clique ao botão de envio
button.onclick = async function(e) {
    e.preventDefault(); // Previne o comportamento padrão do botão de envio

    // Obtenha os valores dos campos de entrada corretamente
    let item = document.querySelector('.selecionado .item').textContent;
    let date = document.getElementById("data").value; 
    let hora = document.getElementById("hora").value; 
    let qnt = document.getElementById("quant").value; 

    
    let data = { item, date, hora, qnt }; // Cria um objeto com os dados obtidos

    console.log("Dados a serem enviados:", data); 

// AQUI ESTÁ O PROBLEMA

    try {
        // Envie a requisição fetch
        const response = await fetch('http://localhost:3001/api/store/task', {
            method: "post", 
            headers: { "Content-Type": "application/json;charset=UTF-8" }, 
            body: JSON.stringify(data) // Converte o objeto de dados em JSON e o envia no corpo da requisição
        });

       
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.statusText}`); // mostra um erro na requisição
        }

        // Converta a resposta para JSON
        let content = await response.json(); // Converte a resposta para JSON

        // Trate a resposta do servidor
        if (content.success) {
            alert("Sucesso"); 
        } else {
            alert("Não"); 
        }
    } catch (error) {
        console.error("Erro ao enviar a requisição:", error); 
        alert("Erro ao enviar a requisição. Verifique o console para mais detalhes."); 
    }
};
