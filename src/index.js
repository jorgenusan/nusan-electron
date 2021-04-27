$('#navbar').load('../components/navbar.html')

function confirmLogin(){
    let urlString = 'http://localhost:8080/login';
    let email =$('#InputEmail').val();
    let password = $('#InputPassword').val()

    console.log(email);
    console.log(password);

    var datajson = JSON.stringify({
        "email":email,
        "password":password
    })

    console.log(datajson);

     $.ajax({ 
        type: "POST",
        url:urlString,
        crossDomain:true,
        contentType: 'application/json; charset=utf-8',
        data:datajson
    })
        .done(function(){
            console.log("success");
           // window.location.replace(index.html);
        })
        .fail(function() {
            console.log("Email o contraseña incorrecto.");
        })
  }
