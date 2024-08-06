let button = document.getElementById("handleSubmit");

button.onclick = async function(e) {
    e.preventDefault(); 

    let nome = document.querySelector('.registro .nome').value;
    let email = document.querySelector('.registro .email').value; 
    let senha = document.querySelector('.registro .senha').value; 
    let tipo_usuario = document.querySelector('.registro .tipo_usuario').value; 
    let endereco = document.querySelector('.registro .endereco').value; 

    let data = { nome, email, senha, tipo_usuario, endereco }; 

    console.log("Dados que serão enviados:", data); 

    try {
        const response = await fetch('http://localhost:3001/api/store/user', {
            method: "POST", 
            headers: { "Content-Type": "application/json;charset=UTF-8" }, 
            body: JSON.stringify(data) 
        });

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.statusText}`); 
        }

        let content = await response.json(); 

        if (content.success) {
            alert("Sucesso"); 
            
            localStorage.setItem('id_user', content.data.id_user);

            console.log(`ID do usuário armazenado: ${content.data.id_user}`);

            // if (tipo_usuario == 'Instituição') {
            //     window.location.href = "/front/html/perfil_insti.html";
            // }
        } else {
            alert("Erro ao cadastrar. Vefique os dados inseridos ou se você já possui uma conta."); 
        }

    } catch (error) {
        console.error("Erro ao enviar a requisição:", error); 
        alert("Erro ao enviar a requisição."); 
    }
};
