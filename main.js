
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
<<<<<<< HEAD
        localStorage.setItem('accessToken', result.accessToken)  
=======
        localStorage.setItem('accessToken', result.accessToken)
        console.log(result)
>>>>>>> fc980bf643bd26603c724e3cc58abfe6353fb3fd
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
    })
    .fail(err => {
        console.log(err);
    })
}

function getGeoip(){

    $.ajax({
        method:'GET',
        url: baseUrl + '/geoip'
    })
<<<<<<< HEAD
    .done(result =>{
        console.log(result[0]);
        
        $(".board-inform").empty();
        $(".board-inform").append(`

           <table id ="table_inform"> 
            <th width = 10%></th>
            <th></th>
            <tr>
                <td>Total Kasus</td>
                <td>${result[0].TotalConfirmed}</td>
            </tr>
            <tr>
                <td>Meninggal</td>
                <td>${result[0].TotalDeaths}</td>
            </tr>
            <tr>
                <td>Sembuh</td>
                <td>${result[0].TotalRecovered}</td>
            </tr>
            </table>
        `)

=======
    .done(result => {
        swal("Register Success!", "Next Proceed to Login!", "success");
        $('#newemail').val('')
        $('#newpassword').val('')
        $('.register-warp').hide()
        $('.login-warp').show()
>>>>>>> fc980bf643bd26603c724e3cc58abfe6353fb3fd
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
        getGeoip()
        // getDataByCountry()
    } else {
        $('.dashboard').hide()
        $('.login-regis-wrapped').show()
        $('.register-warp').hide()
    }
}

