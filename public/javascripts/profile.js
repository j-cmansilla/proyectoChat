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
                /*if(userlog.innerHTML.toString() !== users[i].userName.toString()){
                    $(listaUsuarios).append(`<a onclick="cargarChat('${userlog.innerHTML}','${users[i].userName}')" class="list-group-item list-group-item-action flex-column align-items-start">
                    <div class="d-flex w-100 justify-content-between">
                      <h5 class="mb-1">${users[i].userName}</h5>
                    </div>
                  </a>`);
                }*/
                if(userlog.innerHTML.toString() !== users[i].userName.toString()){
                    $(usersList).append(`<li onclick="cargarChat('${userlog.innerHTML}','${users[i].userName}')" class="list-group-item">${users[i].userName}</li>`);
                }
            }
        }
    });
    $.ajax({
        url: "/chats",
        method: 'GET',
        type: 'json',
        success: function(res){
            chats = res;
            console.log(chats);
        }
    });
});


$("div").click(function(){
    alert("The paragraph was clicked.");
});

$(document).keypress(function(e) {
    if(e.which == 13) {
        sendMessage();
    }
});

function cargarChat(fromThisUser, toThisUser){
    var userNameToSend = document.getElementById('userToSend');
    var messageToSend = document.getElementById('messages');
    var userMessages = document.getElementById('usersMessages');
    //$(usersMessages).innerHTML = "";
    while( userMessages.firstChild ){
        userMessages.removeChild( userMessages.firstChild );
    }
    messageToSend.value = "";
    userNameToSend.innerHTML = toThisUser;
    fromUser = fromThisUser;
    toUser = toThisUser;
    $( "#userToSend" ).innerHTML = toThisUser.toString();
    $( "#messageToSend" ).focus();
    $('html, body').animate({scrollTop:$(document).height()}, 'slow');
    $.ajax({
        url: "/chats",
        method: 'GET',
        type: 'json',
        success: function(res){
            chats = res;
            for(var i = 0;i<chats.length;i++){
                if(chats[i].fromUser == fromUser && chats[i].toUser == toUser ){
                    messageToSend.value = messageToSend.value+"Yo: "+chats[i].message+"\n";
                }
                if(chats[i].fromUser == toUser && chats[i].toUser == fromUser ){
                    messageToSend.value = messageToSend.value+chats[i].fromUser+": "+chats[i].message+"\n";
                }
                if(chats[i].fromUser == fromUser && chats[i].toUser == toUser ){
                    $(usersMessages).append(`<li class="list-group-item">${"Yo: "+chats[i].message}</li>`);
                }
                if(chats[i].fromUser == toUser && chats[i].toUser == fromUser ){
                    $(usersMessages).append(`<li class="list-group-item">${messageToSend.value+chats[i].fromUser+": "+chats[i].message}</li>`);
                }
            }
        }
    });
    $('#messages').animate({scrollTop:10000000000000000000000000000000}, 'slow');
    $(usersMessages).animate({scrollTop:10000000000000000000000000000000}, 'slow');
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