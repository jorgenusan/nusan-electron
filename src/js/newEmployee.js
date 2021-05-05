
function saveEmp(event){
    password= $('#inputPassword').val();
    password2= $('#inputPassword2').val();
    if(password == password2){
        var formData = JSON.stringify({
            name: $("#inputName").val(),
            lastName: $("#inputLastName").val(),
            dni: $('#inputDni').val(),
            email: $('#inputEmail').val(),
            phoneNumber: $('#inputTel').val(),
            password: $('#inputPassword').val()
        });
    
        $.ajax({
            type:"POST",
            url: "http://localhost:8080/employees",
            data: formData,
            contentType: "application/json"
        }).done(function(data){
            alert("El empleado ha sido creado correctamente.");
        }).fail(function(error){
            alert("Error al crear el empleado.")
        })
    }else{
        alert("Las contraseñas no coindicen.");
    }
       
    event.preventDefault();
}

function help(){
    var x = document.getElementById("passwordHelp");
    if(x.innerHTML === ""){
        x.innerHTML = "Debe contener una mayúscula, un número, un caracter especiál y ser mayor de 6 caracteres.";
    } else {
        x.innerHTML = "";
    }
};
    