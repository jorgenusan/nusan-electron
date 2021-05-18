//comprueba en dónde se está pulsando
$("#contenido").on("click", function(evt) {
    //recogemos el botón pulsado
    var btn = evt.target;
    
    if(btn.tagName==="IMG" && btn.id === "imgEditModal"){
        var row = btn.parentNode.parentNode.parentNode;  //buton than td than tr
       getTdId(row);
    }
    if(btn.tagName==="BUTTON" && btn.id === "btnEditModal"){
        var row = btn.parentNode.parentNode;  //td than tr
        getTdId(row);
    }
});

//coge el ID de la fila y carga los datos en el modal
function getTdId(row){
    var div = row.getElementsByTagName("div");
    var p = div[0].getElementsByTagName("p"); 
    var id = p[0].textContent;
    var idreport = id.trim().match("[0-9]+")


    $.ajax({
        type:"GET",
        url: "http://localhost:8080/report/"+idreport,
    }).done(function(data){
        openEditModal(data);
    }).fail(function(error){
        alert("Error al obtener los datos del parte.", error);
    })
}

//crear botones modal
function createDeleteModal(){
    var idreport =  $("#idEdit").val()

    modalBtn.innerHTML=''; //limpiamos los botones del modal

    //creamos los botones del modal pasando el id que se quiere eliminar.
    modalBtn.innerHTML +=
    `
    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
    <button type="button" class="btn btn-primary" onclick="(${idreport})">Sí</button>
    `
    //mostramos modal
    $('#deleteModal').modal('show');
}

/*
Abrir Modal para editar los datos
*/
function openEditModal(data){
    $('#editReport').modal('show');
    $('#idEdit').val(data.id);
    $('#dateStartEdit').val(data.startDate);
    $('#dateEndEdit').val(data.endingDate);
    $('#dateApointmentEdit').val(data.dateApointment);
    $('#priorityEdit').val(data.priority);
    $('#stateEdit').val(data.state);
    $('#machineEdit').val(data.machine);
    $('#brandEdit').val(data.brand);
    $('#textareaEdit').val(data.observations);
    $('#paymentEdit').val(data.payment);
    $('#paymentMethodEdit').val(data.paymentMethod);
    $('#selectClientsEdit').val(data.client.name +" " + data.client.lastName);
    
    employees(data);
}
//recoger los empleados todos para mostrar en el desplegable
function employees(actualEmp){

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
        empOptions(data, actualEmp);
    }).fail(function(error){
        alert("Error al obtener los datos de la tabla.", error);
    })

}

//crea la select de los empleados.
function empOptions(data, actualEmp){
    selectEmployeesEdit.innerHTML=`<option>${actualEmp.employees.id} - ${actualEmp.employees.name} ${actualEmp.employees.lastName}</option>`;
    for(let valor of data){
        selectEmployeesEdit.innerHTML += `
        <option>${valor.id} - ${valor.name} ${valor.lastName}</option>
        `
        console.log(actualEmp.employees.id != data.id)
    }  
}

//recoge los datos del modal y actualiza los datos del repot.
function saveReportsChanges(){
    var id = $("#idEdit").val();

    let emp= $("#selectEmployeesEdit").val();
    let exp = new RegExp("[0-9]+");
    let result = emp.match(exp);
    let idEmployee = result[0];

    var formData = JSON.stringify([
        {
            "op":"replace",
            "path":"/startDate",
            "value": $("#dateStartEdit").val()
        },
        {
            "op":"replace",
            "path":"/endingDate",
            "value":  $("#dateEndEdit").val()
        },
        {
            "op":"replace",
            "path":"/dateApointment",
            "value": $('#dateApointmentEdit').val()
        },
        {
            "op":"replace",
            "path":"/priority",
            "value": $('#priorityEdit').val()
        },
        {
            "op":"replace",
            "path":"/state",
            "value": $('#stateEdit').val()
        },
        {
            "op":"replace",
            "path":"/machine",
            "value": $('#machineEdit').val()
        },
        {
            "op":"replace",
            "path":"/brand",
            "value": $('#brandEdit').val()
        },
        {
            "op":"replace",
            "path":"/observations",
            "value": $('#textareaEdit').val()
        },
        {
            "op":"replace",
            "path":"/payment",
            "value": $('#paymentEdit').val()
        },
        {
            "op":"replace",
            "path":"/paymentMethod",
            "value": $('#paymentMethodEdit').val()
        },
        {
            "op":"replace",
            "path":"/employees/id",
            "value": idEmployee
        }
    ]);

    console.log(formData);
    $.ajax({
        type:"PATCH",
        url: "http://localhost:8080/report/"+id,
        data: formData,
        contentType: "application/json-patch+json"
    }).done(function(data){
        location.reload();
        $('#editReport').modal('hide');
        alert("El parte ha sido modificado correctamente.");
    }).fail(function(error){
        alert("Error al modificar el parte.")
    })    
}



//Eliminar un parte
function deleteYes(id){
    var deleteId = id
console.log(deleteId)
    $.ajax({
        type:"DELETE",
        url: "http://localhost:8080/report/"+deleteId,
    }).done(function(data){
        $('#deleteModal').modal('hide');
        alert("Parte eliminado correctamente");
        location.reload();
    }).fail(function(error){
        alert("Error al eliminar el parte.", error);
    })
}