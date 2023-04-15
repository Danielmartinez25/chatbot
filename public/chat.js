const socket = io();
const message = document.getElementById("message");
const username = document.getElementById("username");
const btn = document.getElementById("send");
const output = document.getElementById("output");
const actions = document.getElementById("actions");

btn.addEventListener('click', function(){
    socket.emit('chat:message',{
        message: message.value,
        username: username.value
    })
})
message.addEventListener('keypress', function () {
    socket.emit('chat:typing', username.value)
})
socket.on('chat:message',function(data){
    
    actions.innerHTML = '';
    output.innerHTML += `<p>
    <strong>${data.username}</strong>: ${data.message}
    </p>`
})
socket.on('chat:typing', function(data){
    actions.innerHTML = `<p><em>${data} is a typing a message</em></p>`
})