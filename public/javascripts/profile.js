var users = [];
var chats = [];
var fromUser; 
var toUser;
$( document ).ready(function() {
    document.getElementById('messageToSend').value = "";
    $.ajax({
        url: "/users",
        method: 'GET',
        type: 'json',
        success: function(res){
            users = res;
            let userlog = document.getElementById('userName');
            for(var i = 0; i < users.length;i++){
                if(userlog.innerHTML.toString() !== users[i].userName.toString()){
                    $(listaUsuarios).append(`<a onclick="cargarChat('${userlog.innerHTML}','${users[i].userName}')" class="list-group-item list-group-item-action flex-column align-items-start">
                    <div class="d-flex w-100 justify-content-between">
                      <h5 class="mb-1">${users[i].userName}</h5>
                    </div>
                  </a>`);
                }
            }
        }
    });
});

function cargarChat(fromThisUser, toThisUser){
    var userNameToSend = document.getElementById('userToSend');
    var messageToSend = document.getElementById('messages');
    messageToSend.value = "";
    userNameToSend.innerHTML = toThisUser;
    fromUser = fromThisUser;
    toUser = toThisUser;
    $.ajax({
        url: "/chats",
        method: 'GET',
        type: 'json',
        success: function(res){
            chats = res;
            for(var i = 0;i<chats.length;i++){
                if(chats[i].fromUser == fromUser && chats[i].toUser == toUser ){
                    messageToSend.value = messageToSend.value+"Yo:"+chats[i].message+"\n";
                }
                if(chats[i].fromUser == toUser && chats[i].toUser == fromUser ){
                    messageToSend.value = messageToSend.value+chats[i].fromUser+":"+chats[i].message+"\n";
                }
            }
        }
    });
}

function sendMessage(){
    var messageToSend = document.getElementById('messageToSend');
    var messages = document.getElementById('messages');
    if(!messageToSend.value) return;
    if(!fromUser)return;
    var message = {
        "fromUser": fromUser,
        "toUser":toUser,
        "message":messageToSend.value
    }
    $.ajax({
        url: "/chats",
        method: 'POST',
        data: message,
        type: 'json',
        success: function(res){
           messageToSend.value = ""; 
        }
    });
    cargarChat(fromUser,toUser);
}