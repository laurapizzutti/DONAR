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
            method: "post", 
            headers: { "Content-Type": "application/json;charset=UTF-8" }, 
            body: JSON.stringify(data) 
        });

       
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.statusText}`); 
        }

        let content = await response.json(); 

        if (content.success) {
            alert("Sucesso"); 
            window.location.href = "/front/html/login.html";
        } else {
            alert("Não"); 
        }

    } catch (error) {
        console.error("Erro ao enviar a requisição:", error); 
        alert("Erro ao enviar a requisição. Verifique o console para mais detalhes."); 
    }
}; 