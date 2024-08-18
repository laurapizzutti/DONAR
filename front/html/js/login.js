async function login(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const senha = document.getElementById('password').value;

    const data = {email, senha};
    console.log(data);

    const response = await fetch('http://localhost:3005/api/login', {
        method: "POST",
        headers: {
            "Content-Type":"application/json;charset=UTF-8"
        },
        body: JSON.stringify(data)
    });

    const results = await response.json();
    console.log(results)
    if(results.success) {
        alert(results.message);
        localStorage.setItem('id', results.data.id)
        localStorage.setItem('tipo_user', results.data.tipo_usuario)
            Tipo_User = localStorage.getItem('tipo_user');
            Id_User = localStorage.getItem('id');
            console.log(`ID do usuário: ${Id_User} e Tipo do usuário: ${Tipo_User}`);
            
            window.location.href = "/front/html/intro.html";
            // if (Tipo_User == 'Instituição') {
            //     window.location.href = "/front/html/intro.html";
            // } else {
            //     window.location.href = "/front/html/intro.html";
            // }

    } else {
        alert(results.message);
    }
}
