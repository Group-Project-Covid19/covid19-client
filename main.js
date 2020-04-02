$( document ).ready(function () {
    authentication();
    
})


function login(event) {
    let username = $('#username').value();
    let password = $('#password').value();

    console.log(username, password);
    
}

function authentication() {
    if(localStorage.access_token){
        $('.loginTitle').hide()
    } else {
        $('.loginTitle').show();
    }

}