//referenciar os elementos html
const form = document.getElementById("form-signin")
const nome = document.getElementById("inputNome")
const sobrenome = document.getElementById("inputSobreNome")
const email = document.getElementById("inputEmail")
const senha = document.getElementById("inputSenha")
const senha2 = document.getElementById("inputSenha2")
const divNome = document.getElementById("div-nome")
const divSobreNome = document.getElementById("div-sobrenome")
const divEmail = document.getElementById("div-email")
const divSenha = document.getElementById("div-senha")
const divSenha2 = document.getElementById("div-senha2")
const divBotao = document.getElementById("botao")

const itTipoUsuario = 2

form.addEventListener("submit", (e) => {
    e.preventDefault()
    validarEntradas(nome, sobrenome, email, senha, senha2)
})

//nome: teste
//email: teste@teste.com
//senha: Wabcde123#

function mandarServidor(n,sobre, e, s) {
    fetch("http://localhost:8092/usuario", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nome: n,
                sobrenome: sobre,
                email: e,
                senha: s,
                tipoUsuario:{
                    idTipoUsuario: 2
                } 
            }),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log("Success:", data);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}

function validarEntradas(n,sobre, e, s, s2) {
    const inputNome = String(n.value)
    const inputSobreNome = String(sobre.value)
    const inputEmail = String(e.value)
    const inputSenha = String(s.value)
    const inputSenha2 = String(s2.value)


    if (inputNome === "" || inputNome == null) {
        nome.className = "form-control is-invalid"
        var conteudoNovo = document.createTextNode("O nome é invalido!")
        divNome.appendChild(conteudoNovo)
        console.log("Nome é um campo obrigatório")


    }else if(inputSobreNome === "" || inputSobreNome == null){
        sobrenome.className = "form-control is-invalid"
        var conteudoNovo = document.createTextNode("O sobrenome é invalido!")
        divSobreNome.appendChild(conteudoNovo)
        console.log("Nome é um campo obrigatório")

    } else if (inputEmail === "" || inputEmail == null) {
        console.log("E-mail é um campo obrigatório")
        email.className = "form-control is-invalid"
        var conteudoNovo = document.createTextNode("E-mail vazio, escreva o seu e-mail!")
        divEmail.appendChild(conteudoNovo)


    } else if (validarEmail(inputEmail) === false) {
        console.log("Formato de email inválido")
        email.className = "form-control is-invalid"
        var conteudoNovo = document.createTextNode("E-mail invalido! EX: Exemplo@teste.com")
        divEmail.appendChild(conteudoNovo)

    } else if (inputSenha === "" || inputSenha == null) {
        console.log("Senha é um campo obrigatório")
        senha.className = "form-control is-invalid"
        var conteudoNovo = document.createTextNode("Senha vazia, escreva uma senha!")
        divSenha.appendChild(conteudoNovo)

    } else if (inputSenha.length < 8) {
        console.log("A senha deve ter no mínimo 6 caracteres.")
        senha.className = "form-control is-invalid"
        var conteudoNovo = document.createTextNode("A Senha tem que ter no mínimo 6 caracteres e no máximo 20")
        divSenha.appendChild(conteudoNovo)

    } else if (validarSenha(inputSenha) === false) {
        console.log("invalido")
        var conteudoNovo = document.createTextNode("senha invalida!" + "\n" + "1 Letra Maiúscula no mínimo" + "\n" + "1 Número no mínimo" + "\n" + "1 caracter especial")
        divSenha.appendChild(conteudoNovo)

    } else if (inputSenha != inputSenha2) {
        console.log("invalido 2")
        var conteudoNovo = document.createTextNode("As senhas não estão iguais!")
        divSenha2.appendChild(conteudoNovo)

    } else {
        console.log("Cadastro realizado com sucesso")
        const h = document.createElement("div")
        const p = document.createElement("p")
        var conteudoNovo = document.createTextNode("Cadastro realizado com sucesso")
        p.appendChild(conteudoNovo)
        h.className = "alert alert-success bordas"
        
        
        h.appendChild(p)
        divBotao.appendChild(h)

        mandarServidor(inputNome,inputSobreNome, inputEmail, inputSenha)
        window.location.replace("http://127.0.0.1:5501/login/login.html")
    }
}

function validarEmail(ev) {
    let re = /\S+@\S+\.\S+/
    return re.test(ev)
}

function validarSenha(es) {
    let rs = /(?=^.{8,}$)/

    return rs.test(es)

}