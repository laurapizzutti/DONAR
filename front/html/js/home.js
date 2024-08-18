async function getInstiData() {


    const response = await fetch('http://localhost:3005/api/get/insti', {
        method: "GET",
        headers: {
            "Content-Type":"application/json"
        }
    })

    const results = await response.json();
    
    console.log(results)


    if(results.success) {
        let itens = results.data;

        itens.map(item => {
            let card_div = document.createElement('div');
            card_div.classList.add('card-home');

                let img = document.createElement('img');
                img.classList.add('foto-perfil')
                img.src = '/front/img/foto-perfil-insti.jpg'

                let cabecalho = document.createElement('div');
                cabecalho.classList.add('cabecalho');

                let h2 = document.createElement('h2');
                cabecalho.classList.add('cabecalho');
                h2.textContent = item.nome


                cabecalho.appendChild(img)
                cabecalho.appendChild(h2)
                

            card_div.appendChild(cabecalho)

            const ID_insti = item.id
            console.log(ID_insti)
            console.log(cabecalho)

            localStorage.setItem("ID_insti", ID_insti)

            async function getItems() {
                const Insti = localStorage.getItem("ID_insti");
            
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
                    let itens = results.data;
            
                    let home = document.getElementById('home');
            
                    itens.map(item => {
                        let htmlItem = document.createElement('div');
                        htmlItem.classList.add('pedido-card-container');
                
                        const quantidadeSpan = document.createElement('span');
                        quantidadeSpan.classList.add('qnt');
                        quantidadeSpan.textContent = `${item.qnt_itens}x`;
                
                        const nomeSpan = document.createElement('span');
                        nomeSpan.classList.add('item');
                        nomeSpan.textContent = item.item;

                        const button = document.createElement('button');
                        button.classList.add('ajudar');
                        button.textContent = 'Ajudar'

                        button.onclick = function(event) {

                            window.location.href = '/front/html/Ajudar.html'
                        }
                
                        htmlItem.appendChild(quantidadeSpan);
                        htmlItem.appendChild(nomeSpan); 

                        card_div.appendChild(htmlItem)
                        card_div.appendChild(button)
            
                        home.appendChild(card_div);
                    });
                }
            
            }
            


            // const quantidadeSpan = document.createElement('span');
            // quantidadeSpan.classList.add('quantidade');
            // quantidadeSpan.textContent = `${item.qnt_itens}x`;
    
            // const nomeSpan = document.createElement('span');
            // nomeSpan.classList.add('item');
            // nomeSpan.textContent = item.item;
    
            // cabecalho.appendChild(quantidadeSpan);
            // card_div.appendChild(nomeSpan); 

            getItems()

        });
    }else{
        console.log('deu errado')
    }
}

getInstiData();
