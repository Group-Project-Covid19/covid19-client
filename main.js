
let baseUrl = 'http://localhost:3000'


$( document ).ready(function () {
    authentication();

})

function login(event) {
    event.preventDefault()

    let email = $('#user').val();
    let password = $('#pass').val();

    $.ajax({

        method : 'POST',
        url : baseUrl + '/user/login',
        data : {
            email,
            password
        }
    
    })
    .done(result => {
        localStorage.setItem('access_token', result.access_token)
        authentication()
    })
    .fail(err => {
        console.log(err);
        
    })
}

function authentication() {

    if(localStorage.access_token){

        $('.login-warp').hide()

    } else {
        $('.login-warp').show();
    }

}

function onSignIn(googleUser) {

    var id_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        method : 'POST',
        url : baseUrl + '/user/googleSign',
        data : {
            id_token
        }
    })
    .done(result => {
        localStorage.setItem('access_token', result.access_token)
        authentication()
    })

    .fail(err => {
        console.log(err);
        
    })
}