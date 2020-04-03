
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
        authentication()
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
        
    })
    .fail(err => {
        console.log(err);
    })
}

function getData() {
    
    $.ajax({
        method:'GET',
        url: baseUrl + '/data'
    })
    .done(result=> {
        $('#data').empty();

        $('#data').append(`
        <th width = "63.9%">Lokasi</th>
        <th width = "13.7%">Dikonfirmasi</th>
        <th width = "11.2%">Sembuh</th>
        <th>Kematian</th>
    `)
        
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

function getDataByCountry() {
    
    $.ajax({
        method:'GET',
        url: baseUrl + '/dataByCountry'
    })
    .done(result=> {
        $('#dataCountry').empty();
        $('#dataCountry').append(`
            <th width = "63.9%">Lokasi</th>
            <th width = "13.7%">Dikonfirmasi</th>
            <th width = "11.2%">Sembuh</th>
            <th>Kematian</th>
        `)
        
        result.forEach(el => {
            $('#dataCountry').append(`
                <tr>
                    <td><img src="https://www.countryflags.io/${el.attributes.code}/shiny/24.png"> ${el.attributes.Country_Region}</td>
                    <td>${el.attributes.Confirmed}</td>
                    <td>${el.attributes.Recovered}</td>
                    <td>${el.attributes.Deaths}</td>
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
        getDataByCountry()
    } else {
        $('.dashboard').hide()
        $('.login-regis-wrapped').show()
        $('.register-warp').hide()
    }
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();

    auth2.signOut().then(function () {

      console.log('User signed out.');
    });
  }

function onSignIn(googleUser) {

    var id_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        method : 'POST',
        url : baseUrl + '/googleSignIn',
        data : {
            id_token
        }
    })
    .done(result => {
        console.log(result);
        
        localStorage.setItem('accessToken', result.accessToken)
        authentication()
    })

    .fail(err => {
        console.log(err);
        
    })
}