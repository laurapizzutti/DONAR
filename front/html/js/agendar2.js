let button = document.getElementById("handleSubmit")

button.onclick = async function(e) {
    e.preventDefault();
    let date = document.getElementById("data").value;
    let hora = document.getElementById("hora").value;
    let data = {date,hora}

    const response = await fetch('http://localhost:3001/api/store/task', {
        method: "post",
        headers: {"content-type": "application/json;charset=UTF-8"},
        body: JSON.stringify(data)
    });

    let content = await response.json();

    if(content.success){
        alert("Sucesso");
    }else{
        alert("Não");
    }

}