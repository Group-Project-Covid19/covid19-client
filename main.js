
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
    
   $('#Filter').submit(function(e) {
       e.preventDefault()
       console.log($('#Province').val())
       $.ajax({
            method:'GET',
            url: baseUrl + '/data'
       })
       .done(function(result) {
           let data = $('#Province').val()
           console.log(data)
           console.log(result)
           for(let i = 0; i < result.length; i++) {
               if(result[i].attributes.Provinsi == $('#Province').val()) {
                swal("Search Success!", `${result[i].attributes.Provinsi} has ${result[i].attributes.Kasus_Posi} Case,${result[i].attributes.Kasus_Semb} Recover, And ${result[i].attributes.Kasus_Meni} Deaths`, "success")
               }
           }
       })
       .fail(function(err) {
           console.log(err)
       })
   })
       
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
        swal("Login Success!", `you are accessing from ${result.ip.ip}, Country ${result.ip.country_name}, ${result.covidCountry[0].TotalConfirmed} cases of Covid-19`, "success")
        $('#email').val('');
        $('#password').val('');
    })
    .fail(err => {
        swal("Login Fail!", `Wrong Email / Password`, "error")
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
        $('#newemail').val('')
        $('#newpassword').val('')
    })
    .fail(err => {
        swal("Register Fail!", `Email Already Existed!`, "error")
        console.log(err);
    })
}


function getData() {
    
    $.ajax({
        method:'GET',
        url: baseUrl + '/data'
    })
    .done(result=> {
        console.log(result)
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

        for(let i = 0; i < result.length; i++) {
            $('#Province').append(`
            <option value="${result[i].attributes.Provinsi}">${result[i].attributes.Provinsi}</option>
            `)
        }

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
        // getGeoip()
        // getDataByCountry()
    } else {
        $('.dashboard').hide()
        $('.login-regis-wrapped').show()
        $('.register-warp').hide()
    }
}

