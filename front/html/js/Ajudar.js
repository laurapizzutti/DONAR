function selecionar(elemento_clicado) {
    const selecionado = document.querySelector('.selecionado');
    if (selecionado) {
        selecionado.className = 'op';
    }
    elemento_clicado.className = 'selecionado';
    console.log(elemento_clicado.querySelector('.item').textContent);
}

let opcoes = document.querySelector(".opcoes").querySelectorAll('div.op');
console.log(`Opções encontradas: ${opcoes.length}`);


for (let opcao of opcoes) {
    opcao.addEventListener('click', function () {
        selecionar(this);
    });
}


let button = document.getElementById("handleSubmit");

button.onclick = async function(e) {
    e.preventDefault(); 

    
    let item = document.querySelector('.selecionado .item').textContent;
    let date = document.getElementById("data").value; 
    let hora = document.getElementById("hora").value; 
    let qnt = document.getElementById("quant").value; 

    
    let data = { item, date, hora, qnt }; 

    console.log("Dados que serão enviados:", data); 

    try {
        
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
