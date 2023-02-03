function ReceberServico(){
    
    let select = document.querySelector('#select-Servico');

    let optionvalue = select.options[select.selectedIndex];
    
    let value = optionvalue.value;
    console.log(value)
}
ReceberServico()

