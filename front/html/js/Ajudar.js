let opcoes = document.querySelector(".opcoes").querySelectorAll("div");
console.log(`Opções encontradas: ${opcoes.length}`);
for(let opcao of opcoes) {
    opcao.addEventListener('click', function () {
        selecionar(elemento_clicado)
        selecionar(item_clicado)
    });
}

function selecionar(elemento_clicado, item_clicado) {
    // Removendo a seleção do elemento atualmente selecionado
    document.querySelector('.selecionado').className = 'op';

    // Adicionando classe CSS de seleção na opção clicada
    elemento_clicado.className = 'selecionado';
    document.querySelector('.item').className = 'item2';
    console.log('classe trocada')
    
}

let button = document.getElementById("handleSubmit")

button.onclick = async function(e) {
    e.preventDefault();
    let item = document.getElementById(".item2").value;
    let date = document.getElementById("#data").value;
    let hora = document.getElementById("#hora").value;
    let qnt = document.getElementById("#quant").value;
    let data = {item,date,hora,qnt}

    const response = await fetch('http://localhost:3001/api/store/task', {
        // ERRO NA LINHA 12, TIRAR DÚVIDAS
        method: "POST",
        headers: {"content-type": "application/json;charset=UTF-8"},
        body: JSON.stringify(data)
        // posso adicionar quantos dados eu quiser de cada página na variável 
        // data pra depois enviar tudo pro banco de uma vez?
    });

    let content = await response.json();

    if(content.success){
        alert("Sucesso");
    }else{
        alert("Não");
    }

}
