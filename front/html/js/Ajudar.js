function selecionar(elemento_clicado) {
    // Removendo a seleção do elemento atualmente selecionado
    document.querySelector('.selecionado').className = 'op';

    // Adicionando classe CSS de seleção na opção clicada
    elemento_clicado.className = 'selecionado';
}

let opcoes = document.querySelector(".opcoes").querySelectorAll('div');
console.log(`Opções encontradas: ${opcoes.length}`);
for(let opcao of opcoes) {
    opcao.addEventListener('click', function () {
        selecionar(this)
    });
}

