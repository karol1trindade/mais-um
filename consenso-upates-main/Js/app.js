

var lixoIcons = document.querySelectorAll(".lixo-icon")

lixoIcons.forEach(function(lixoIcon){
    lixoIcon.addEventListener("click",deletarServico)
});

function deletarServico(e){
    e.target.parentElement.parentElement.parentElement.remove()
}
