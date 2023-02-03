


//referenciar os elementos html


const form = document.getElementById("form-signin")
const nome = document.getElementById("inputNome")
const email = document.getElementById("inputEmail")
const senha = document.getElementById("inputSenha")
const tipoUsuario = document.getElementById("tipoUsuario")

const divNome = document.getElementById("div-nome")
const divEmail = document.getElementById("div-email")
const divSenha = document.getElementById("div-senha")
const divTipoUsuario = document.getElementById("div-Tipo-usuario")




form.addEventListener("submit", (e) => {
    e.preventDefault()
    validarEntradas(nome, email, senha)

   
})


var verificadorNome = 0
var verificadorEmail = 0
var verificadorSenha = 0


document.getElementById("inputNome").addEventListener("focus", function() {
    this.value = "";
    nome.classList.remove("is-invalid")
    divNome.removeChild(itemNome)
    verificadorNome = 0
    
});

document.getElementById("inputEmail").addEventListener("focus", function() {
    this.value = "";
    verificadorEmail = 0
    email.classList.remove("is-invalid")
    divEmail.removeChild(itemEmail)
});

document.getElementById("inputSenha").addEventListener("focus", function() {
    this.value = "";
    verificadorSenha = 0
    senha.classList.remove("is-invalid")
    divSenha.removeChild(itemSenha)
});


function validarEntradas(n, e, s) {
    const nomeValue = String(n.value)
    const emailValue = String(e.value)
    const senhaValue = String(s.value)


    if (nomeValue === "" || nomeValue == null) {
        if(verificadorNome == 0){
            nome.className = "form-control is-invalid"
            let itemNome = document.createElement("p")
            itemNome.id = "itemNome"
            divNome.appendChild(itemNome)
            itemNome.innerHTML="O campo Nome obrigatório"
            itemNome.style ="color:red; text-align:left;"
            verificadorNome = 1
            console.log(verificadorNome)
        }
            
    } else if (emailValue === "" || emailValue == null) {
        if (verificadorEmail == 0){
            email.className ="form-control is-invalid"
            let itemEmail = document.createElement("p")
            itemEmail.id ="itemEmail"
            divEmail.appendChild(itemEmail)
            itemEmail.innerHTML ="Email é um campo obrigatório"
            itemEmail.style ="text-align:left; color:red;"
            verificadorEmail = 1
            
        }
        

    } else if (validarEmail(emailValue) === false) {
        console.log("Formato de email inválido")
        if (verificadorEmail == 0){
            email.className ="form-control is-invalid"
            let itemEmail = document.createElement("p")
            itemEmail.id ="itemEmail"
            divEmail.appendChild(itemEmail)
            itemEmail.innerHTML ="Formato de Email inválido"
            itemEmail.style ="text-align:left; color:red;"
            verificadorEmail = 1
            
        }
        
        
    } else if (senhaValue === "" || senhaValue == null) {
        console.log("Senha é um campo obrigatório")

        if (verificadorSenha == 0){
            senha.className ="form-control is-invalid"
            var itemSenha = document.createElement("p")
            itemSenha.id ="itemSenha"
            divSenha.appendChild(itemSenha)
            itemSenha.innerHTML ="Senha é um campo obrigatório"
            itemSenha.style ="text-align:left; color:red;"
            verificadorSenha = 1
            
        }

    } else if (senhaValue.length < 6) {
        console.log("A senha deve ter no mínimo 6 caracteres.")

        if (verificadorSenha == 0){
            senha.className ="form-control is-invalid"
            var itemSenha = document.createElement("p")
            itemSenha.id ="itemSenha"
            divSenha.appendChild(itemSenha)
            itemSenha.innerHTML ="A senha deve ter no mínimo 6 caracteres."
            itemSenha.style ="text-align:left; color:red;"
            verificadorSenha = 1
            
        }
    } else {
        console.log(tipoUsuario.value)
        sendDataToAPI(nome.value, email.value, senha.value, tipoUsuario.value)
        window.alert("cadastro realizado com sucesso!")
    }

}

function validarEmail(ev) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(ev)
}



function sendDataToAPI(nome, email, senha, tipoUsuario) {
    (async () => {
        const rawResponse = await fetch('http://localhost:8080/usuario', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({nome: nome, email:email, senha:senha, tipoUsuario:{
            idTipoUsuario:tipoUsuario
          }})
        });
        const content = await rawResponse.json();
      
        console.log(content);
      })();
  }
  