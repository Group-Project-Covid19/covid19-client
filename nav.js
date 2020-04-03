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
        swal("Login Success!", `you are accessing from ${result.ip.ip}, Country ${result.ip.country_name}, ${result.covidCountry[0].TotalConfirmed} cases of Covid-19`, "success")
        localStorage.setItem('accessToken', result.accessToken)
        authentication()
    })

    .fail(err => {
        console.log(err);
        
    })
}