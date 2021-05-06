$(document).ready(function(){
    $("form").submit(function(event){
        var formData = JSON.stringify({
            name: $("#inputName").val(),
            lastName: $("#inputLastName").val(),
            dni: $('#inputDni').val(),
            email: $('#inputEmail').val(),
            phoneNumber: $('#inputTel').val(),
            city: $('#inputCity').val(),
            address: $('#inputAddress').val()
        });
        
        $.ajax({
            type:"POST",
            url: "http://localhost:8080/client",
            data: formData,
            contentType: "application/json"
        }).done(function(data){
            alert("El cliente ha sido creado correctamente.");
            clean();
        }).fail(function(error){
            alert("Error al crear el cliente.")
        })
        
        event.preventDefault();
    });

    function clean(){
        $("#inputName").val("");
        $("#inputLastName").val("");
        $('#inputDni').val("");
        $('#inputEmail').val("");
        $('#inputTel').val("");
        $('#inputCity').val("");
        $('#inputAddress').val("");
    }

});