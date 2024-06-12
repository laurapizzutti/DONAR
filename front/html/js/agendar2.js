let button = document.getElementById("handleSubmit")

button.onclick = async function(e) {
    e.preventDefault();
    // let item = document.getElementById("item").value;
    let date = document.getElementById("data").value;
    let hora = document.getElementById("hora").value;
    let qnt = document.getElementById("quant").value;
    // let data = {item,date,hora,qnt}
    let data = {date,hora,qnt}

    const response = await fetch('http://localhost:3001/api/store/task', {
        // ERRO NA LINHA 12, TIRAR DÚVIDAS
        method: "post",
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