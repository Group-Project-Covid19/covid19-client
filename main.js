
let baseUrl = 'http://localhost:3000'


$( document ).ready(function () {
    
    authentication();

    $('.logoutbtn').click(function () {
        localStorage.clear();
        sessionStorage.clear();
        authentication();
        signOut()

    })
        
    $('#regisbtn').click(function() {
        $('.register-warp').show()
        $('.login-warp').hide()
    });

    $('#loginbtn').click(function() {
        $('.register-warp').hide()
        $('.login-warp').show()
    });
    
   
       
})

function login(event) {
    event.preventDefault()
    
    let email = $('#email').val();
    let password = $('#password').val();

    $.ajax({

        method : 'POST',
        url : baseUrl + '/login',
        data : {
            email,
            password
        }
    })
    .done(result => {
        localStorage.setItem('accessToken', result.accessToken)
        console.log(result)
        authentication()
        swal("Login Success!", `you are accessing from ${result.ip.ip}, Country ${result.ip.country_name}, ${result.covidCountry[0].TotalConfirmed} cases of Covid-19`, "success")
    })
    .fail(err => {
        console.log(err);
    })
}

function register(event) {
    event.preventDefault();
    
    let email = $('#newemail').val();
    let password = $('#newpassword').val();

    $.ajax({
        method : 'POST',
        url : baseUrl + '/register',
        data : {
            email,
            password
        },
        headers : {
            accessToken : localStorage.accessToken
        },

    })
    .done(result => {
        swal("Register Success!", "Next Proceed to Login!", "success");
        $('#newemail').val('')
        $('#newpassword').val('')
        $('.register-warp').hide()
        $('.login-warp').show()
    })
    .fail(err => {
        swal("Register Failed!", "Username Already Exist!", "error");
        $('#newemail').val('')
        $('#newpassword').val('')
    })
}

function getData() {
    
    $.ajax({
        method:'GET',
        url: baseUrl + '/data'
    })
    .done(result=> {
        $('#data').empty();
        
        result.forEach(el => {
            $('#data').append(`
                <tr>
                    <td>${el.attributes.Provinsi}</td>
                    <td>${el.attributes.Kasus_Posi}</td>
                    <td>${el.attributes.Kasus_Semb}</td>
                    <td>${el.attributes.Kasus_Meni}</td>
                </tr>
            `)

        });

    })
    .fail(err => {
        console.log(err);
        
    })
}


function authentication() {

    if(localStorage.accessToken){
        $('.dashboard').show()
        $('.login-regis-wrapped').hide()
        getData()
    } else {
        $('.dashboard').hide()
        $('.login-regis-wrapped').show()
        $('.register-warp').hide()
    }
}

