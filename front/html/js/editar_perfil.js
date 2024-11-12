Tipo_User = localStorage.getItem('tipo_user');

document.querySelector('.botao-voltar').addEventListener('click', async () => { 

    if (Tipo_User == 'Colaborador') {
        window.location.href = "/front/html/agendamento.html"
    }else{
        window.location.href = "/front/html/perfil_insti.html"
    }  

});

async function getUser() {
    let Id_User = localStorage.getItem('id');
    console.log(Id_User)

    const response = await fetch(`http://localhost:3001/api/get/userdata/${Id_User}` , 
    {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });

    const results = await response.json();
    console.log(results)

    if (results.success) {

        document.querySelector('.nome').value = results.data.nome;
        document.querySelector('.email').value = results.data.email;
        document.querySelector('.senha').value = results.data.senha;
        document.querySelector('.endereco').value = results.data.endereco;
        document.querySelector('.apelido').value = results.data.nome_usuario;
        document.querySelector('.descricao').value = results.data.descricao;
      
    } else {
        console.log('Nenhum item encontrado para esta instituição');
    }
}

getUser()

document.querySelector('.salvar').addEventListener('click', async () => {

    let Id_User = localStorage.getItem('id');
    Tipo_User = localStorage.getItem('tipo_user');

    console.log(Id_User)

    const data = {
        nome: document.querySelector('.nome').value,
        email:  document.querySelector('.email').value,
        senha: document.querySelector('.senha').value,
        endereco: document.querySelector('.endereco').value,
        nome_usuario: document.querySelector('.apelido').value,
        descricao: document.querySelector('.descricao').value,
       
    };

    try {
        const response = await fetch("http://localhost:3001/api/update/user/" + Id_User, {
            method: "PUT",
            headers: { "Content-Type": "application/json;charset=UTF-8" },
            body: JSON.stringify(data)
        });

        const results = await response.json();

        if (results.success) {
            console.log("Dados atualizados com sucesso!");

        } else {
            console.error("Erro ao atualizar os dados");
        }
    } catch (error) {
        console.error("Erro na requisição", error);
    }
});