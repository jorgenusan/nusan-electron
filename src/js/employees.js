
window.onload = employees();

function employees(){

    var getEmp = JSON.stringify({
        "numPage": 0,
        "sizePage": 20,
        "sortBy": "id",
        "ascending": true
    });

    $.ajax({
        type:"POST",
        url: "http://localhost:8080/allEmployees",
        dataType: "json",
        data: getEmp,
        contentType: "application/json"   
    }).done(function(data){
        card(data);
    }).fail(function(error){
        alert("Error al obtener los datos de la tabla.", error);
    })

}


function card(data){
    contenido.innerHTML='';
    for(let valor of data){
        contenido.innerHTML += ` 
        <div class="col-sm-4 mb-4">
            <div class="card">
                <div class="card-header">
                    <img src="../../node_modules/bootstrap-icons/icons/person-fill.svg">
                    ${valor.name} ${valor.lastName}
                </div>
                <div class="card-body">
                    <p class="card-text">
                        <img src="../../node_modules/bootstrap-icons/icons/telephone-fill.svg">
                        ${valor.phoneNumber}
                    </p>
                    <p class="card-text">
                        <img src="../../node_modules/bootstrap-icons/icons/envelope-open-fill.svg">
                        ${valor.email}
                    </p>
                    <p class="card-text">
                        <img src="../../node_modules/bootstrap-icons/icons/credit-card-2-back-fill.svg">
                        ${valor.dni}
                    </p>
                    <p class="card-text">
                        <img src="../../node_modules/bootstrap-icons/icons/people-fill.svg">
                        ${valor.rol}
                    </p>
                </div>
                <div class="card-footer text-muted">
                    <button type="button" class="btn btn-primary" id="btnEditModal">
                        Editar
                    </button>
                    <button type="button" class="btn btn-primary" id="btnDeleteModal">
                        Eliminar
                    </button>
                </div>
            </div>
        </div>`
    } 
}

$("#contenido").on("click", function(evt) {
    var btn = evt.target;

    //si pulsa eliminar
    if(btn.tagName==="BUTTON" && btn.id === "btnEditModal"){
        var card = btn.parentNode.parentNode;
        var container = card.getElementsByTagName("div"); //cells
        var div = container[1].getElementsByTagName("p");
        var dni = div[2].textContent;
        getCardDni(dni.trim());
        
    }

    //Si se pulsa eliminar
    if(btn.tagName==="BUTTON" && btn.id === "btnDeleteModal"){
        var card = btn.parentNode.parentNode;
        var container = card.getElementsByTagName("div"); //cells
        var div = container[1].getElementsByTagName("p");
        var dni = div[2].textContent;
        btnDeleteEmployeeModal(dni.trim());
    }

});

//crear botones modal
function btnDeleteEmployeeModal(data){
    var dni = data;
    btnDeleteEmp.innerHTML=''; //limpiamos los botones del modal

    //creamos los botones del modal pasando el id que se quiere eliminar.
    btnDeleteEmp.innerHTML +=
    `
    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
    <button type="button" class="btn btn-primary" onclick=\"deleteEmp('${dni}')\">Sí</button>
    `
    //mostramos modal
    $('#deleteEmpModal').modal('show');
}

function deleteEmp(dni){
    var deleteDni = dni;

    $.ajax({
        type:"DELETE",
        url: "http://localhost:8080/employeesDni/"+deleteDni,
    }).done(function(data){
        $('#deleteEmpModal').modal('hide');
        alert("Empleado eliminado correctamente");
        location.reload();
    }).fail(function(error){
        alert("Error al eliminar el empleado.", error);
    })

}


//coge el DNI de la fila y carga los datos en el modal
function getCardDni(data){
    var dni = data;

    $.ajax({
        type:"GET",
        url: "http://localhost:8080/employeesDni/"+dni,
    }).done(function(data){
        openEditEmpModal(data);
    }).fail(function(error){
        alert("Error al obtener los datos del empleado.", error);
    })
}


function openEditEmpModal(data){
    $('#editEmployeeModal').modal('show');
    $('#idEdit').val(data.id);
    $('#inputName').val(data.name);
    $('#inputLastName').val(data.lastName);
    $('#inputEmail').val(data.email);
    $('#inputDni').val(data.dni);
    $('#inputTel').val(data.phoneNumber);

   selectRol(data);
}

function selectRol(data){
    inputRol.innerHTML =``;
    if(data.rol == "Empleado"){
        inputRol.innerHTML +=
        `
        <option>${data.rol}</option>
        <option>Admin</option>
        `
    }else{
        inputRol.innerHTML +=
        `
        <option>${data.rol}</option>
        <option>Empleado</option>
        `
    }
}

function saveChanges(){
    var id = $("#idEdit").val();

    var password = $('#inputPassword').val();
    var password2 = $('#inputPassword2').val();
    if(password == password2){

        var formData = JSON.stringify([
        {
            "op":"replace",
            "path":"/name",
            "value": $("#inputName").val()
        },
        {
            "op":"replace",
            "path":"/lastName",
            "value":  $("#inputLastName").val()
        },
        {
            "op":"replace",
            "path":"/dni",
            "value": $('#inputDni').val()
        },
        {
            "op":"replace",
            "path":"/email",
            "value": $('#inputEmail').val()
        },
        {
            "op":"replace",
            "path":"/phoneNumber",
            "value": $('#inputTel').val()
        },
        {
            "op":"replace",
            "path":"/rol",
            "value": $('#inputRol').val()
        }]);

        console.log(formData);
        $.ajax({
            type:"PATCH",
            url: "http://localhost:8080/employees/"+id,
            data: formData,
            contentType: "application/json-patch+json"
        }).done(function(data){
            location.reload();
            $('#editEmployeeModal').modal('hide');
            alert("El cliente ha sido modificado correctamente.");
        }).fail(function(error){
            alert("Error al modificar el cliente.")
        })  
    }else{
        alert("Las contraseás no existen");
    }  
}
