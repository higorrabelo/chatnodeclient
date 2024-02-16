const socket = io();

function quit(){
    window.actions.quit();
}
function maximize(){
    window.actions.maximize();
}
function minimize(){
    window.actions.minimize();
}

fetch('./views/menu.html').then((resposta)=>{
    if(!resposta.ok){
        console.log("Antes erro")
    }
    return resposta.text()
}).then(html=>{
    document.getElementById('menu').innerHTML = html;
})
.catch(err=>{
    console.log("Não rolou")
})

fetch('./views/chat.html').then((resposta)=>{
    if(!resposta.ok){
        console.log("Antes erro")
    }
    return resposta.text()
}).then(html=>{
    document.getElementById('chat').innerHTML = html;
})
.catch(err=>{
    console.log("Não rolou")
})

function enviarMensagem(){
    var mensagem = document.getElementById('mensagem').value;
    window.actions.msg(mensagem);
    mensagem.value = "";
}

socket.on("resposta",(receber)=>{
    //var papo = document.getElementById('papo').value;
    console.log(receber);
})
