// function selecionar(elemento_clicado) {
//     // Removendo a seleção do elemento atualmente selecionado
//     const selecionado = document.querySelector('.selecionado');
//     selecionado.className = 'op';
//     // const item2 = selecionado.querySelector('.item').textContent
//     console.log(selecionado.querySelector('.item').textContent)

//     // Adicionando classe CSS de seleção na opção clicada
//     elemento_clicado.className = 'selecionado';
// }

// let opcoes = document.querySelector(".opcoes").querySelectorAll('div');
// console.log(`Opções encontradas: ${opcoes.length}`);
// for(let opcao of opcoes) {
//     opcao.addEventListener('click', function () {
//         selecionar(this)
//     });
// }

// let button = document.getElementById("handleSubmit")

// button.onclick = async function(e) {
//     e.preventDefault();
//     let item = document.querySelector('.item').value;
//     console.log(item)
//     // arrumar urgente essa porra
//     let date = document.getElementById("data").value;
//     let hora = document.getElementById("hora").value;
//     let qnt = document.getElementById("quant").value;
//     let data = {item,date,hora,qnt}

//     const response = await fetch('http://localhost:3001/api/store/task', {
//         // ERRO NA LINHA 12, TIRAR DÚVIDAS
//         method: "POST",
//         headers: {"content-type": "application/json;charset=UTF-8"},
//         body: JSON.stringify(data)
//         // posso adicionar quantos dados eu quiser de cada página na variável 
//         // data pra depois enviar tudo pro banco de uma vez?
//     });

//     let content = await response.json();

//     if(content.success){
//         alert("Sucesso");
//     }else{
//         alert("Não");
//     }

// }

// Função para selecionar um elemento clicado
function selecionar(elemento_clicado) {
    // Removendo a seleção do elemento atualmente selecionado
    const selecionado = document.querySelector('.selecionado'); // Encontra o elemento com a classe 'selecionado'
    selecionado.className = 'op'; // Remove a classe 'selecionado' e redefine para 'op'
    
    // Debug: exibe o conteúdo do item do elemento previamente selecionado
    console.log(selecionado.querySelector('.item').textContent);

    // Adicionando classe CSS de seleção na opção clicada
    elemento_clicado.className = 'selecionado'; // Adiciona a classe 'selecionado' ao elemento clicado
}

// Seleciona todas as opções dentro do elemento com a classe 'opcoes'
let opcoes = document.querySelector(".opcoes").querySelectorAll('div');
console.log(`Opções encontradas: ${opcoes.length}`); // Debug: mostra o número de opções encontradas

// Adiciona um evento de clique para cada opção encontrada
for (let opcao of opcoes) {
    opcao.addEventListener('click', function () {
        selecionar(this); // Chama a função selecionar ao clicar na opção
    });
}

// Seleciona o botão de envio pelo ID
let button = document.getElementById("handleSubmit");

// Adiciona um evento de clique ao botão de envio
button.onclick = async function(e) {
    e.preventDefault(); // Previne o comportamento padrão do botão de envio

    // Obtenha os valores dos campos de entrada corretamente
    let item = document.querySelector('.item').value; // Obtém o valor do campo com a classe 'item'
    let date = document.getElementById("data").value; // Obtém o valor do campo com o ID 'data'
    let hora = document.getElementById("hora").value; // Obtém o valor do campo com o ID 'hora'
    let qnt = document.getElementById("quant").value; // Obtém o valor do campo com o ID 'quant'

    // Crie o objeto de dados
    let data = { item, date, hora, qnt }; // Cria um objeto com os dados obtidos

    console.log("Dados a serem enviados:", data); // Debug: exibe os dados a serem enviados

    try {
        // Envie a requisição fetch
        const response = await fetch('http://localhost:3001/api/store/task', {
            method: "post", // Define o método HTTP como POST
            headers: { "Content-Type": "application/json;charset=UTF-8" }, // Define o cabeçalho da requisição
            body: JSON.stringify(data) // Converte o objeto de dados em JSON e o envia no corpo da requisição
        });

        // Verifique se a resposta foi bem-sucedida
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.statusText}`); // Lança um erro se a resposta não for bem-sucedida
        }

        // Converta a resposta para JSON
        let content = await response.json(); // Converte a resposta para JSON

        // Trate a resposta do servidor
        if (content.success) {
            alert("Sucesso"); // Exibe um alerta de sucesso
        } else {
            alert("Não"); // Exibe um alerta de falha
        }
    } catch (error) {
        // Trate erros de rede ou de requisição
        console.error("Erro ao enviar a requisição:", error); // Exibe o erro no console
        alert("Erro ao enviar a requisição. Verifique o console para mais detalhes."); // Exibe um alerta de erro
    }
};
