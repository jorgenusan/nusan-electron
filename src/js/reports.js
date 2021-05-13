window.onload = getData();
function getData(){
        
    var getReports = JSON.stringify({
        "numPage": 0,
        "sizePage": 20,
        "sortBy": "id",
        "ascending": true
    });

    $.ajax({
        type:"POST",
        url: "http://localhost:8080/allReports",
        dataType: "json",
        data: getReports,
        contentType: "application/json"   
    }).done(function(data){
        tabla(data);
    }).fail(function(error){
        alert("Error al obtener los datos de la tabla.", error);
    })
}

function tabla(data){
    contenido.innerHTML='';
    for(let valor of data){
        if(valor.endingDate == null){
            valor.endingDate = "Sin fecha";
        }
        if(valor.dateApointment == null){
            valor.dateApointment = "Sin fecha";
        }
        contenido.innerHTML += ` 
        <tr>
            <td scope="row" class="text-center" id="idRep">${ valor.id }</td>
            <td class="text-center">${ valor.startDate }</td>
            <td class="text-center">${ valor.endingDate }</td>
            <td class="text-center">${ valor.dateApointment }</td>
            <td class="text-center">${ valor.priority }</td>
            <td class="text-center">${ valor.state }</td>
            <td class="text-center">${ valor.machine }</td>
            <td class="text-center">${ valor.brand }</td>
            <td class="text-center">${ valor.client.name } ${ valor.client.lastName }</td>
            <td class="text-center">${ valor.employees.name } ${ valor.employees.lastName }</td>
            <td class="text-center">
                <button type="button" class="btn btn-warning" id="btnEditModal">
                    <img src="../../node_modules/bootstrap-icons/icons/pencil.svg" alt="edit pencil" id="imgEditModal">
                </button>
            </td>
            <td class="text-center">
                <button class="btn btn-danger" id="btnDeleteModal">
                    <img src="../../node_modules/bootstrap-icons/icons/x.svg" alt="delete" id="imgDeleteModal">
                </button>
            </td>
        </tr>`
    }
}

//comprueba en dónde se está pulsando
$("table").on("click", function(evt) {
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

    //Si se pulsa eliminar
    if(btn.tagName==="IMG" && btn.id === "imgDeleteModal"){
        var row = btn.parentNode.parentNode.parentNode;  //buton than td than tr
        createDeleteModal(row);
    }
    if(btn.tagName==="BUTTON" && btn.id === "btnDeleteModal"){
        var row = btn.parentNode.parentNode;  //td than tr
        createDeleteModal(row);
    }
});

//coge el ID de la fila y carga los datos en el modal
function getTdId(row){
    var cells = row.getElementsByTagName("td"); //cells
    var id = cells[0].textContent;

    $.ajax({
        type:"GET",
        url: "http://localhost:8080/report/"+id,
    }).done(function(data){
        openEditModal(data);
    }).fail(function(error){
        alert("Error al obtener los datos del parte.", error);
    })
}

//crear botones modal
function createDeleteModal(row){
    var cells = row.getElementsByTagName("td"); //cells
    var id = cells[0].textContent;

    modalBtn.innerHTML=''; //limpiamos los botones del modal

    //creamos los botones del modal pasando el id que se quiere eliminar.
    modalBtn.innerHTML +=
    `
    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
    <button type="button" class="btn btn-primary" onclick="deleteYes(${id})">Sí</button>
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
    var deleteId = id;

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

   



