async function login(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const senha = document.getElementById('password').value;

    const data = {email, senha};
    console.log(data);

    const response = await fetch('http://localhost:3001/api/login', {
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
            Id_User = localStorage.getItem('id');
            console.log(`ID do usuário: ${Id_User}`);
            // window.location.href = "/front/html/home.html";
    } else {
        alert(results.message);
    }
}
