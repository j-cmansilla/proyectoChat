var users = [];
var chats = [];
var fromUser; 
var toUser;
var fileToDownloadFromServer;
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
                    $(usersList).append(`<li onclick="cargarChat('${userlog.innerHTML}','${users[i].userName}')" class="list-group-item liSelected">${users[i].userName}</li>`);
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
        }
    });
});


$("div").click(function(){
    alert("The paragraph was clicked.");
});

function searchText(textToSearch){
    var userMessages = document.getElementById('usersMessages');
    while( userMessages.firstChild ){
        userMessages.removeChild( userMessages.firstChild );
    }
    $.ajax({
        url: "/chats",
        method: 'GET',
        type: 'json',
        success: function(res){
            chats = res;
        }
    });
    for(var i = 0;i<chats.length;i++){
        console.log(chats[i].message);
        if(chats[i].message.includes(textToSearch)){
            if(chats[i].fromUser == fromUser && chats[i].toUser == toUser ){
                $(usersMessages).append(`<li class="list-group-item list-group-item-warning">${'From: '+chats[i].fromUser+' To: '+chats[i].toUser+" MESSAGE: "+chats[i].message}</li>`);
            }
            if(chats[i].fromUser == toUser && chats[i].toUser == fromUser ){
                $(usersMessages).append(`<li class="list-group-item list-group-item-success">${'From: '+chats[i].fromUser+' To: '+chats[i].toUser+" MESSAGE: "+chats[i].message}</li>`);
            }
        }
    }
}

$(document).keypress(function(e) {
    let search = document.getElementById('search');
    console.log($(":focus"));
    if(e.which == 13) {
        if($(search).is(':focus')){
            if(!search.value) return;
            searchText(search.value);
            return;
        }
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
    var archivo = `<button type="button" class="btn btn-warning">Warning</button>`;
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
                    $(usersMessages).append(`<li class="list-group-item list-group-item-success mensajesEnviados">${chats[i].message}</li>`);
                }
                if(chats[i].fromUser == toUser && chats[i].toUser == fromUser ){
                    $(usersMessages).append(`<li class="list-group-item list-group-item-info">${chats[i].message}</li>`);
                }
            }
        }
    });
    //$('#messages').animate({scrollTop:10000000000000000000000000000000}, 'slow');
    $(usersMessages).animate({scrollTop:10000000000000000000000000000000}, 'slow');
}

function scroll(){
    $(usersMessages).animate({scrollTop:10000000000000000000000000000000}, 'slow');
}

function downloadFile(fileToDownload){
    fileToDownloadFromServer = fileToDownload;
    var file = {
        "fileToDownload":fileToDownloadFromServer
    }
    console.log("THIS IS THE FILE: "+file.fileToDownload);
    $.ajax({
        type: "GET",
        url: "/profile/descargarArchivo",
       //data: {"id":file.fileToDownload.toString()},
       success: function(res){
        
        }
    });
    /*$.ajax({
        url: "/profile/download",
        type: 'POST',
        data:file,
        success: function(res){
           
        }
    });*/
}

function enviarDatos(){
    if(!fromUser)return;
    var documentUploaded = document.getElementById('upload');
    var form = $('#fileUploadForm')[0];
    var data = new FormData(form);
    $( "#fileNameUploaded" ).innerHTML = documentUploaded.files[0].name.toString();
    //let defaultRoute = "uploads";
    var archivo = `${documentUploaded.files[0].name+" "}<a href="/profile/download/${documentUploaded.files[0].name}"><button class="btn btn-primary">Download</button></a>`;
    $.ajax({
        type: "POST",
        enctype: 'multipart/form-data',
        url: "/profile/upload",
        data: data,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 600000,
        success: function (data) {
        },
        error: function (e) {
        }
    });
    var message = {
        "fromUser": fromUser,
        "toUser":toUser,
        "message":archivo.toString()
    }
    $.ajax({
        url: "/chats",
        method: 'POST',
        data: message,
        type: 'json',
        success: function(res){
           //messageToSend.value = ""; 
        }
    });
    cargarChatCliente(fromUser,toUser);
}

function uploadFile(){
    var documentUploaded = document.getElementById('upload');
    if(!fromUser)return;
    var archivo = `<a  href="${'/upload/'+documentUploaded.files[0].name}"><button class="btn info">Download</button></a>`;
    alert(archivo);
    //console.log(documentUploaded.files.length == 1);
    if(documentUploaded.files.length == 1){
        var message = {
            "fromUser": fromUser,
            "toUser":toUser,
            "message":archivo
        }
        alert(message.fromUser+"-"+message.toUser+"-"+message.message);
        return;
    }
    console.log('esta vacio');
}

function sendFile(thismessage){
    var message = {
        "fromUser": fromUser,
        "toUser":toUser,
        "message":thismessage
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

function cargarChatCliente(fromThisUser, toThisUser){
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
    var archivo = `<button type="button" class="btn btn-warning">Warning</button>`;
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
                    $(usersMessages).append(`<li class="list-group-item list-group-item-success mensajesEnviados">${chats[i].message}</li>`);
                }
            }
        }
    });
    //$('#messages').animate({scrollTop:10000000000000000000000000000000}, 'slow');
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
    //scroll();
    cargarChatCliente(fromUser,toUser);
}