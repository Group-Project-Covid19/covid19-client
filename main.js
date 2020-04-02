
let baseUrl = 'http://localhost:3000'


$( document ).ready(function () {
    $('.dashboard').show()
    
    // authentication();

    $('#regisbtn').click(function() {
        $('.register-warp').show()
        $('.login-warp').hide()
    });

    $('#loginbtn').click(function() {
        $('.register-warp').hide()
        $('.login-warp').show()
    });
    
    $('#logout').click(function () {
        localStorage.clear();
        sessionStorage.clear();
        authentication();
    })
       
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

function register(event) {
    event.preventDefault();
    
    let email = $('#title').val();
    let password = $('#description').val();

    $.ajax({
        method : 'POST',
        url : baseUrl + '/todos',
        data : {
            email,
            password
        },
        headers : {
            access_token : localStorage.access_token
        },
       
    })
    .done(result => {
        getTodos()
    })
    .fail(err => {
        console.log(err);
    })
}

function authentication() {

    if(localStorage.access_token){
        $('.login-warp').hide()
        $('.login-regis-wrapped').hide()
    } else {
        $('.login-regis-wrapped').show()
        $('.login-warp').show();
        $('.register-warp').hide()
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