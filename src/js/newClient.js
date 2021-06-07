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
            url: "https://nusan-api.herokuapp.com/client",
            data: formData,
            contentType: "application/json"
        }).done(function(data){
            $('#successToast').toast('show');
            clean();
        }).fail(function(error){
            $('#dangerToast').toast('show');
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