async function getInstiData() {
    // const Id_User = localStorage.getItem('id');

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

        let home = document.getElementById('home');

        itens.map(item => {
            let card_div = document.createElement('div');
            card_div.classList.add('card-home');

                // let img = document.createElement('img')

                let cabecalho = document.createElement('div');
                cabecalho.classList.add('cabecalho');

                let h2 = document.createElement('h2');
                h2.textContent = item.nome

                cabecalho.appendChild(h2)

            card_div.appendChild(cabecalho)

            const ID_insti = item.id
            console.log(ID_insti)

            localStorage.setItem("ID_insti", ID_insti)


            // const quantidadeSpan = document.createElement('span');
            // quantidadeSpan.classList.add('quantidade');
            // quantidadeSpan.textContent = `${item.qnt_itens}x`;
    
            // const nomeSpan = document.createElement('span');
            // nomeSpan.classList.add('item');
            // nomeSpan.textContent = item.item;
    
            // cabecalho.appendChild(quantidadeSpan);
            // card_div.appendChild(nomeSpan); 

        });
    }else{
        console.log('deu errado')
    }
}

getInstiData();

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

        itens.map(item => {
            let htmlItem = document.createElement('div');
            htmlItem.classList.add('opcao');
    
            const quantidadeSpan = document.createElement('span');
            quantidadeSpan.classList.add('quantidade');
            quantidadeSpan.textContent = `${item.qnt_itens[0]}x`;
    
            const nomeSpan = document.createElement('span');
            nomeSpan.classList.add('item');
            nomeSpan.textContent = item.item[0];
    
            htmlItem.appendChild(quantidadeSpan);
            htmlItem.appendChild(nomeSpan); 

            home.appendChild(card_div);
        });
    }

}

getItems()
