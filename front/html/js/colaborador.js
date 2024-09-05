document.addEventListener('DOMContentLoaded', function () {
    const nomeUsuario = localStorage.getItem('nome') || 'Usuário';
    const descricaoUsuario = localStorage.getItem('descricao') || '';
    const fotoUsuario = localStorage.getItem('fotoPerfil') || '/front/img/foto-perfil-colab.png';

    // Elementos do DOM
    const fotoPerfil = document.getElementById('fotoPerfil');
    const inputFotoPerfil = document.getElementById('inputFotoPerfil');
    const editarPerfilBtn = document.getElementById('editarPerfilBtn');
    const botaoEditarFoto = document.getElementById('botaoEditarFoto');
    const nomeUsuarioSpan = document.getElementById('nomeUsuario');
    const descricaoIntro = document.getElementById('descricaoUsuario');
    const botaoEditarDescricao = document.getElementById('botaoEditarDescricao');
    const salvarDescricaoBtn = document.getElementById('salvarDescricaoBtn');

    // Setar informações iniciais
    nomeUsuarioSpan.textContent = nomeUsuario;
    descricaoIntro.textContent = descricaoUsuario;
    fotoPerfil.src = fotoUsuario;

    // Mostrar botões de edição
    editarPerfilBtn.addEventListener('click', function () {
        botaoEditarFoto.style.display = 'block'; // Mostrar o botão de editar foto
        botaoEditarDescricao.style.display = 'block'; // Mostrar o botão de editar descrição
    });

    // Trocar a foto de perfil ao clicar no botão "+"
    botaoEditarFoto.addEventListener('click', function () {
        inputFotoPerfil.click();
    });

    inputFotoPerfil.addEventListener('change', function () {
        const file = inputFotoPerfil.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                fotoPerfil.src = e.target.result;
                localStorage.setItem('fotoPerfil', e.target.result); // Salvar no localStorage
            };
            reader.readAsDataURL(file);
        }
    });

    // Editar descrição
    botaoEditarDescricao.addEventListener('click', function () {
        descricaoIntro.innerHTML = `<input type="text" id="descricaoInput" value="${descricaoUsuario}" placeholder="Adicione ou edite sua introdução">`;
        salvarDescricaoBtn.style.display = 'block';
    });

    salvarDescricaoBtn.addEventListener('click', function () {
        const descricaoInput = document.getElementById('descricaoInput').value;
        descricaoIntro.textContent = descricaoInput;
        localStorage.setItem('descricao', descricaoInput); // Salvar no localStorage

        salvarDescricaoBtn.style.display = 'none'; // Esconder botão de salvar após a edição
        botaoEditarDescricao.style.display = 'block'; // Mostrar apenas o botão "+"
    });
});