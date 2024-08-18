async function getItens() {
    const Insti = localStorage.getItem('ID_insti');
    console.log(Insti)
    const User = localStorage.getItem('id');

    const response = await fetch('http://localhost:3005/api/itens/' + Insti, {
        method: "GET",
        headers: {
            "Content-Type":"application/json"
        }
    });

    const results = await response.json();
    console.log('ID do usuário: ', User)
    
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

            htmlItem.onclick = function () {
                selecionar(this);
            };

            tabela.appendChild(htmlItem);
        });

        function selecionar(elemento_clicado) {
            const selecionado = document.querySelector('.selecionado');
            
            if (selecionado) {
                selecionado.classList.remove('selecionado');
                selecionado.classList.add('op');
            }
        
            elemento_clicado.classList.remove('op');
            elemento_clicado.classList.add('selecionado');
        
            console.log(elemento_clicado.querySelector('.item').textContent);
        
            let button = document.getElementById("handleSubmit");
        
        button.onclick = async function(e) {
            e.preventDefault(); 
            
            let item = results.data.item;
            console.log(item)
            let date = document.getElementById("data").value; 
            let hora = document.getElementById("hora").value; 
            let qnt = results.data.qnt_itens
            console.log(qnt)
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
        
        }
    }
}



getItens();


// async function selecionar(elemento_clicado) {
//     const selecionado = document.querySelector('.selecionado');
//     if (selecionado) {
//         selecionado.classList.remove('selecionado');
//     }
//     elemento_clicado.classList.add('selecionado');
//     console.log(elemento_clicado.querySelector('.item').textContent);
// }

// // Corrigindo a seleção dos elementos .op
// let opcoes = document.querySelectorAll(".op");

// for (let opcao of opcoes) {
//     opcao.addEventListener('click', function () {
//         selecionar(this);
//     });
// }

