const button = document.querySelector('ajudar');

Tipo_User = localStorage.getItem('tipo_user');
Id_User = localStorage.getItem('id');

console.log(`ID do usuário: ${Id_User} e Tipo do usuário: ${Tipo_User}`);

function evento(event) {
    if (Tipo_User =='Instituição') {
        window.location.href = '/front/html/perfil_insti.html'

    }else{

         window.location.href = '/front/html/agendamento.html'

    }

}