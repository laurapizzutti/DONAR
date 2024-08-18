async function getItems() {

    const Insti = localStorage.getItem("ID_insti");
    console.log(ID_insti)
            
    const response = await fetch('http://localhost:3005/api/itens/'+ Insti, {
        method: "GET",
        headers: {
            "Content-Type":"application/json"
        }
    })

    const results = await response.json();
    console.log('ID da Instituição: ', Insti)
    console.log(results)

    if(results.success) {

        console.log('Sucesso')

    
        // let itens = results.data;

        async function selecionar(elemento_clicado) {
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
            const Id_User = localStorage.getItem('id');
            const Insti = localStorage.getItem("ID_insti");
            console.log(`ID do usuário: ${Id_User}`);
        
            
            let data = { item, date, hora, qnt, Id_User, Insti }; 
        
            console.log("Dados que serão enviados:", data); 
        
            try {
                
                const response = await fetch('http://localhost:3005/api/store/task' , {
                    method: "POST", 
                    headers: { "Content-Type": "application/json;charset=UTF-8" }, 
                    body: JSON.stringify(data) 
                });
        
               
                if (!response.ok) {
                    throw new Error(`Erro na requisição: ${response.statusText}`); 
                }
        
                let results = await response.json(); 
        
                if (results.success) {
                    alert("Sucesso"); 
                    // window.location.href = "/front/html/agendamento.html";
                    console.log(results)
        
                    localStorage.setItem('ID_item:', results.data.id)
                    Id_Item = localStorage.getItem('ID_item:');
                    console.log(`ID do agendamento: ${Id_Item}`);
        
                } else {
                    alert("Não"); 
                }
        
            } catch (error) {
                console.error("Erro ao enviar a requisição:", error); 
                alert("Erro ao enviar a requisição. Verifique o console para mais detalhes."); 
            }
        };
        

    }else{
        console.log('deu errado')
    }
}

