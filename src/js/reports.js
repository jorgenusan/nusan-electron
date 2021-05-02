window.onload = traer();
function traer(){
        
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
    console.log(data);
    contenido.innerHTML='';
    for(let valor of data){
        var datosRep = [valor.id, valor.startDate, valor.endingDate, valor.dateApointment, valor.priority, valor.state, valor.machine, valor.brand, valor.observations, valor.payment,valor.paymentMethod, valor.idCli, valor.idEmp];

        contenido.innerHTML += ` 
        <tr>
            <td>${ valor.id }</td>
            <td>${ valor.startDate }</td>
            <td>${ valor.endingDate }</td>
            <td>${ valor.dateApointment }</td>
            <td>${ valor.priority }</td>
            <td>${ valor.state }</td>
            <td>${ valor.machine }</td>
            <td>${ valor.brand }</td>
            <td>${ valor.idCli }</td>
            <td>${ valor.idEmp }</td>
            <td>
                <button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#editReport" onclick="${datosModal(datosRep)}">
                    <img src="../../node_modules/bootstrap-icons/icons/pencil.svg" alt="edit pencil">
                </button>
            </td>
            <td>
                <button class="btn btn-danger">
                <img src="../../node_modules/bootstrap-icons/icons/x.svg" alt="delete">
                </button>
            </td>
        </tr>`
    }
}

function datosModal(datos){

    $('#idEdit').val(datos[0]);
    $('#dateStartEdit').val(datos[1]);
    $('#dateEndEdit').val(datos[2]);
    $('#dateApointmentEdit').val(datos[3]);
    $('#priorityEdit').val(datos[4]);
    $('#stateEdit').val(datos[5]);
    $('#machineEdit').val(datos[6]);
    $('#brandEdit').val(datos[7]);
    $('#textareaEdit').val(datos[8]);
    $('#paymentEdit').val(datos[9]);
    $('#paymentMethodEdit').val(datos[10]);
    $('#selectClientsEdit').val(datos[11]);
    $('#selectEmployeesEdit').val(datos[12]);

}

