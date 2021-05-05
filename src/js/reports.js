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
    let x=1;
    for(let valor of data){
        //Guardo el id del parte a crear
        var datosRep = valor.id;

        //creo la tabla
        contenido.innerHTML += ` 
        <tr>
            <td scope="row" class="text-center">${ valor.id }</td>
            <td class="text-center">${ valor.endingDate }</td>
            <td class="text-center">${ valor.startDate }</td>
            <td class="text-center">${ valor.dateApointment }</td>
            <td class="text-center">${ valor.priority }</td>
            <td class="text-center">${ valor.state }</td>
            <td class="text-center">${ valor.machine }</td>
            <td class="text-center">${ valor.brand }</td>
            <td class="text-center">${ valor.idCli }</td>
            <td class="text-center">${ valor.idEmp }</td>
            <td class="text-center">
                <button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#editReport" id="modalEdit${x}" onclick="${datosModal(datosRep)}">
                    <img src="../../node_modules/bootstrap-icons/icons/pencil.svg" alt="edit pencil">
                </button>
            </td>
            <td class="text-center">
                <button class="btn btn-danger">
                <img src="../../node_modules/bootstrap-icons/icons/x.svg" alt="delete">
                </button>
            </td>
        </tr>`
        x= x + 1;
    }
}
//recibe el id del parte y carga los datos en el modal
function datosModal(datos){
    let prueba =$(event.currentTarget).id;
    console.log(prueba);

    $('#idEdit').val(datos);
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

