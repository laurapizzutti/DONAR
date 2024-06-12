document.querySelector('.agendar').addEventListener('click', function() {
    let doacoes = JSON.parse(window.localStorage.getItem('doacoes'));
    if(doacoes === null) {
        doacoes = [];
    }

    let inputs = document.querySelector('.principal').querySelectorAll('input');
    let agendar = {};
    for(const input of inputs) {
        agendar[input.id] = input.value;
    }

    doacoes.push(agendar);

    window.localStorage.setItem('doacoes', JSON.stringify(doacoes));

    console.log(JSON.parse(window.localStorage.getItem('doacoes')));
});