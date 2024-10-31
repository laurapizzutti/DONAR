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
        console.log(results)
        
        let nome = document.querySelector('.nome').value = results.data.nome
        document.getElementsByClassName('nome') = nome
        let email = document.querySelector('.email').value = results.data.email
        document.getElementsByClassName('email') = email
        let senha = document.querySelector('.senha').value = results.data.senha
        document.getElementsByClassName('senha') = senha
        let endereco = document.querySelector('.endereco').value = results.data.endereco
        document.getElementsByClassName('endereco') = endereco

    } else {
        console.log('Nenhum item encontrado para esta instituição');
    }
}

getUser()
