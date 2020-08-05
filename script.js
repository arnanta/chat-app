const socket=io('http://localhost:3000');

const messageContainer=document.getElementById('message-container');
const messageForm=document.getElementById('send-container');

const messageInput=document.getElementById('message-input');
const name=prompt('Please tell me your name');
appendMessage('You Joined, Welcome!!');
socket.emit('new-user',name);
socket.on('chat-message',data =>{
   // console.log(data)
   appendMessage(`${data.name}:${data.message}`);
});
socket.on('user-connected',name =>{
    // console.log(data)
    appendMessage(`${name} connected`);
 });
 messageForm.addEventListener('submit',e=>{
    e.preventDefault();
    const message= messageInput.value;
    appendMessage(`You:${message}`)
    socket.emit('send-chat-message',message);
    messageInput.value=''
})

 socket.on('user-disconnected',name =>{
    // console.log(data)
    appendMessage(`${name} disconnected`);
 });





function appendMessage(message)
{
    const messageElement=document.createElement('div');
    messageElement.innerText=message;
    messageContainer.append(messageElement);
}

