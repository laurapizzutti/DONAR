async function getInstiData() {
    const response = await fetch('http://localhost:3001/api/get/insti', {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });

    const results = await response.json();

    if (results.success) {
        let resultados = results.data;

        resultados.forEach(async (dados) => {
            let card_div = document.createElement('div');
            card_div.classList.add('card-home');

            let img = document.createElement('img');
            img.classList.add('foto-perfil');
            img.src = '/front/img/perfil_insti.svg';

            let cabecalho = document.createElement('div');
            cabecalho.classList.add('cabecalho');

            let h2 = document.createElement('h2');
            h2.textContent = dados.nome;

            cabecalho.appendChild(img);
            cabecalho.appendChild(h2);

            card_div.appendChild(cabecalho);

            const itens = await fetch(`http://localhost:3001/api/itens/${dados.id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const Itens = await itens.json();

            if (Itens.success && Itens.data.length > 0) {
                
                let item = Itens.data[0];

                let htmlItem = document.createElement('div');
                htmlItem.classList.add('pedido-card-container');

                const quantidadeSpan = document.createElement('span');
                quantidadeSpan.classList.add('qnt');
                quantidadeSpan.textContent = `${item.qnt_itens}x`;

                const nomeSpan = document.createElement('span');
                nomeSpan.classList.add('item');
                nomeSpan.textContent = item.item;

                htmlItem.appendChild(quantidadeSpan);
                htmlItem.appendChild(nomeSpan);

                card_div.appendChild(htmlItem);
            } else {
                card_div.removeChild(htmlItem)
            }

            let button = document.createElement('button');
            button.classList.add('ajudar');
            button.textContent = 'Ajudar';

            button.onclick = function () {
                localStorage.setItem("ID_insti", dados.id);
                window.location.href = '/front/html/Ajudar.html';
            };

            card_div.appendChild(button);

            const home = document.getElementById('home');
            home.appendChild(card_div);
        });
    } else {
        console.log('Erro ao carregar dados das instituições');
    }
}

getInstiData();
