$(document).ready(function(){
    $("form").submit(function(event){
        var formData = JSON.stringify({
            email: $("#InputEmail").val(),
            password: $("#InputPassword").val()
        });

        $.ajax({
            type:"POST",
            url: "http://localhost:8080/login",
            data: formData,
            contentType: "application/json"
        }).done(function(data){
            window.location.replace("./index.html");
        }).fail(function(error){
            alert("Email o contraseña incorrecto.")
        })
      event.preventDefault();
    });

    $("#show_hide_password a").on('click', function(event) {
        event.preventDefault();
        if($('#show_hide_password input').attr("type") == "text"){
            $('#show_hide_password input').attr('type', 'password');
            $('#show_hide_password img').attr( 'src', '../../node_modules/bootstrap-icons/icons/eye-slash-fill.svg' );

        }else if($('#show_hide_password input').attr("type") == "password"){
            $('#show_hide_password input').attr('type', 'text');
            $('#show_hide_password img').attr( 'src', '../../node_modules/bootstrap-icons/icons/eye-fill.svg' );
        }
    });


});

