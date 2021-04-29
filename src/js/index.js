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
            contentType: "application/json"
        }).done(function(data){
            console.log("done");
            window.location.replace("./index.html");
        }).fail(function(error){
            console.log("error");
            alert("Email o contraseña incorrecto.")
        })
      event.preventDefault();
    });
});
