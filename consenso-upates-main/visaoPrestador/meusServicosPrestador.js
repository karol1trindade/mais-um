// //referenciar os elementos html
if (!localStorage.getItem("idUsuario")) {
    window.location.replace("../login/login.html");
  }
  document.addEventListener("DOMContentLoaded", () => {
    const divContainer = document.getElementById("meus-servicos-nome");
    window.addEventListener("load", async (e) => {
      e.preventDefault();
      await fetch(
        "http://localhost:8080/servicos/p/" + localStorage.getItem("idUsuario")
      )
        .then(async (res) => {
          const servicos = await res.json();
          console.log(servicos.mensagem);
          if (servicos.mensagem.length == 0) {
            return (divContainer.innerHTML = `<div class="alert alert-danger" role="alert" style = "text-align: center">
                                        Sem servicos
                                       </div>`);
          } else {
            servicos.mensagem.forEach((res) => {
              let div = document.createElement("div");
  
              const id = res.idServico;
              const nome = res.nome;
  
              div.innerHTML = `
                   <center>
                    <div class=" bordaa1" style="border: 2px solid black;">
                        <label class=""><strong>${nome}</strong> </label> 
                        <div class="div-imagem">
                            <button onclick="editar(${id})"><img src="img/edit.png" alt="" width="15px" height="15px"></a></button> 
                            <button id="exclui" onclick = "apagar(${id})"><img src="img/delete.png" alt=""></button>
                        </div>
                    </div>
                   </center>`;
  
              divContainer.appendChild(div);
            });
          }
        })
        .catch((erro) => {
          console.error(erro);
        });
    });
  });
  
  
  function editar(id){
    localStorage.setItem("idServico", id);
    window.location.href = "editarServico.html"
  }
  
  function apagar(id) {
    let apagarBotao = document.getElementById("çixo-icon");
    apagarBotao.parentElement.parentElement.remove();
    fetch("http://localhost:8080/servicos/" + id, {
      method: "DELETE",
    })
      .then(
        location.reload()
        )
      .catch((erro) => {
        console.error(erro);
      });
  }