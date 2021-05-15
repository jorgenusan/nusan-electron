window.onload = clients();

function clients(){

    var getCli = JSON.stringify({
        "numPage": 0,
        "sizePage": 20,
        "sortBy": "id",
        "ascending": true
    });

    $.ajax({
        type:"POST",
        url: "http://localhost:8080/allClients",
        dataType: "json",
        data: getCli,
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
                        <img src="../../node_modules/bootstrap-icons/icons/credit-card-2-front-fill.svg">
                        ${valor.dni}
                    </p>
                    <p class="card-text">
                        <img src="../../node_modules/bootstrap-icons/icons/geo-alt-fill.svg">
                        ${valor.city}
                    </p>
                    <p class="card-text">
                        <img src="../../node_modules/bootstrap-icons/icons/house-fill.svg">
                        ${valor.address}
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
        btnDeleteClientModal(dni.trim());
    }

});

//crear botones modal
function btnDeleteClientModal(data){
    var dni = data;

    deleteCliBtn.innerHTML=''; //limpiamos los botones del modal

    //creamos los botones del modal pasando el id que se quiere eliminar.
    deleteCliBtn.innerHTML +=
    `
    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
    <button type="button" class="btn btn-primary" onclick=\"deleteClient('${dni}')\">Sí</button>
    `
    //mostramos modal
    $('#deleteCliModal').modal('show');
}

//coge el DNI de la fila y carga los datos en el modal
function getCardDni(data){
    var dni = data;

    $.ajax({
        type:"GET",
        url: "http://localhost:8080/clientDni/"+dni,
    }).done(function(data){
        openEditClientModal(data);
    }).fail(function(error){
        alert("Error al obtener los datos del parte.", error);
    })
}

function openEditClientModal(data){
    $('#editClientModal').modal('show');
    $('#idEdit').val(data.id);
    $('#inputName').val(data.name);
    $('#inputLastName').val(data.lastName);
    $('#inputEmail').val(data.email);
    $('#inputDni').val(data.dni);
    $('#inputTel').val(data.phoneNumber);
    $('#inputAddress').val(data.address);
    $('#inputCity').val(data.city);
}

function saveChanges(){
    var id = $("#idEdit").val();

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
		"path":"/city",
		"value": $('#inputCity').val()
	},
    {
		"op":"replace",
		"path":"/address",
		"value": $('#inputAddress').val()
	}]);

    console.log(formData);
    $.ajax({
        type:"PATCH",
        url: "http://localhost:8080/client/"+id,
        data: formData,
        contentType: "application/json-patch+json"
    }).done(function(data){
        location.reload();
        $('#editClientModal').modal('hide');
        alert("El cliente ha sido modificado correctamente.");
    }).fail(function(error){
        alert("Error al modificar el cliente.")
    })    
}




function deleteClient(dni){
    var deleteDni = dni;

    $.ajax({
        type:"DELETE",
        url: "http://localhost:8080/clientDni/"+deleteDni,
    }).done(function(data){
        $('#deleteClientModal').modal('hide');
        alert("Cliente eliminado correctamente");
        location.reload();
    }).fail(function(error){
        alert("Error al eliminar el cliente.", error);
    })

}