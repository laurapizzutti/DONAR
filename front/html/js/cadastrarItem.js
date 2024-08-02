const tabela = document.getElementById('tabela');
    const atualizarButton = document.getElementById('atualizar');
    const adicionarItemButton = document.getElementById('adicionarItem');
    const popup = document.getElementById('popup');
    const fecharPopup = document.getElementById('fecharPopup');
    const salvarItemButton = document.getElementById('salvarItem');
    const quantidadeInput = document.getElementById('quantidade');
    const nomeItemInput = document.getElementById('nomeItem');

async function cadastrarItem(event) {
    event.preventDefault();

    const quantidade = document.getElementById("quantidade").value;
    const nomeItem = document.getElementById("nomeItem").value;
    const idUsuario = 9

    const data = {quantidade, nomeItem, idUsuario};

    console.log(data);

    const response = await fetch('http://localhost:3001/api/store/item', {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(data)
    });
}

async function getItens() {
    const idUsuario = 9;

    const response = await fetch('http://localhost:3001/api/itens/'+ idUsuario, {
        method: "GET",
        headers: {
            "Content-Type":"application/json"
        }
    })

    const results = await response.json();
    console.log(results)
    if(results.success) {
        let itens = results.data;

        let tabela = document.getElementById('tabela');

        itens.map(item => {
            let htmlItem = "<div>" + item.item + "</div> <button>Editar" +  item.id_item + "</button>"
            tabela.innerHTML = htmlItem;
        })

    }
}
getItens();