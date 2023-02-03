const form = document.getElementById("form-signin")
const email = document.getElementById("inputEmail")
const senha =  document.getElementById("inputSenha")


form.addEventListener("submit", (e) => {
    e.preventDefault()
    validarEntrada(email,senha)
})


function validarEntrada(e,s){
    
    const inputEmail = String(e.value)
    const inputSenha = String(s.value)

    
    if(inputEmail === "" || inputEmail === null){

    }else if(inputSenha === ""|| inputSenha === null){

    }else{
        
        fetch("http://localhost:8092/usuario", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((response) => response.json())
        .then((data) => {
            for (let i = 0; i < data.length; i++) {
                if(data[i].email === inputEmail){
                    if(data[i].senha === inputSenha){
  
                        
                        localStorage.setItem("nome", data[i].nome)
                        localStorage.setItem("email", data[i].email)
                        localStorage.setItem("id", data[i].idUsuario)

                        if(data[i].tipoUsuario.idTipoUsuario === 1){
                            console.log("cheguei")
                            window.location.replace("http://127.0.0.1:5501/visaoCliente/agendarServico.html")
                        }else if((data[i].tipoUsuario.idTipoUsuario === 2)){
                            window.location.replace("http://127.0.0.1:5501/visaoPrestador/meusServicosPrestador.html")
                        }                    
                    }else{
                        console.log("senha invalida")
                    }
                } else{
                    console.log("email invalido")
                }   
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });   
    }
}