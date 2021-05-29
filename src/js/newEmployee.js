$(document).ready(function(){
    $("form").submit(function(event){
        password= $('#inputPassword').val();
        password2= $('#inputPassword2').val();
        console.log(password)
        console.log(password2)
        if(password == password2){
            var formData = JSON.stringify({
                name: $("#inputName").val(),
                lastName: $("#inputLastName").val(),
                dni: $('#inputDni').val(),
                email: $('#inputEmail').val(),
                phoneNumber: $('#inputTel').val(),
                rol: $('#inputRol').val(),
                password: $('#inputPassword').val()
            });
        
            $.ajax({
                type:"POST",
                url: "http://localhost:8080/employees",
                data: formData,
                contentType: "application/json"
            }).done(function(data){
                alert("El empleado ha sido creado correctamente.");
                clean();
            }).fail(function(error){
                alert("Error al crear el empleado.")
            })
        }else{
            alert("Las contraseñas no coindicen.");
        }
        
        event.preventDefault();
    });

    function clean(){
        $("#inputName").val("");
        $("#inputLastName").val("");
        $('#inputDni').val("");
        $('#inputEmail').val("");
        $('#inputTel').val("");
        $('#inputRol').val("");
        $('#inputPassword').val("");
        $('#inputPassword2').val("");
    }

});
    
function help(){
    var x = document.getElementById("passwordHelp");
    if(x.innerHTML === ""){
        x.innerHTML = "La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula. Puede tener otros símbolos.";
    } else {
        x.innerHTML = "";
    }
}

$("#show_hide_password a").on('click', function(event) {
    event.preventDefault();
    if($('#show_hide_password input').attr("type") == "text"){
        $('#show_hide_password input').attr('type', 'password');
        $('#show_hide_password img').attr( 'src', '../../node_modules/bootstrap-icons/icons/eye-fill.svg' );

    }else if($('#show_hide_password input').attr("type") == "password"){
        $('#show_hide_password input').attr('type', 'text');
        $('#show_hide_password img').attr( 'src', '../../node_modules/bootstrap-icons/icons/eye-slash-fill.svg' );
    }
});

