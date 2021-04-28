$('#navbar').load('../components/navbar.html')


$(document).ready(function(){
    $("form").submit(function(event){
        
        var formData = JSON.stringify({
            email: $("#InputEmail").val(),
            password: $("#InputPassword").val()
        });
        console.log(formData);
        $.ajax({
            type:"POST",
            url: "http://localhost:8080/login",
            data: formData,
            dataType:"json",
            contentType: 'application/json; charset=utf-8'
        }).done(function(data){
            console.log(data);
            console.log("done");
        }).fail(function(error){
            console.log(error);
            console.log("error");
        })

    });
});
/*
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
  }*/
