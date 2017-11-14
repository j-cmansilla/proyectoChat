var users = [];
$( document ).ready(function() {
    $.ajax({
        url: "/users",
        method: 'GET',
        type: 'json',
        success: function(res){
            users = res;
            let userlog = document.getElementById('userName');
            for(var i = 0; i < users.length;i++){
                console.log(userlog.innerHTML.toString()+"="+users[i].userName);
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

function cargarChat(fromUser, toUser){
    console.log("F: "+fromUser+" T:"+toUser);
}