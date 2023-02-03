//referenciar os elementos html
if(!localStorage.getItem("idUsuario")){
    window.location.replace("Login.html")
}
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById("forms");
    const nome = document.getElementById("nomeinput")
    const descricao = document.getElementById("descricaotextarea")

    form.addEventListener("submit", async(e) => {
        e.preventDefault();
        await fetch("http://localhost:8080/servicos", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
               nome: nomeinput.value,
               descricao: descricaotextarea.value,
               usuario: {
                idUsuario: localStorage.getItem("idUsuario")
            } 
                }
               
            )
        })
        .then(res => {
            alert("Servico cadastrado com sucesso")
            window.location.replace("MeusServicos.html")
            console.log(res)
        }).catch((erro) => { console.error(erro) })

        })

})