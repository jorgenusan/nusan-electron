window.onload = clients();

function clients(){

    let orderBySelect = document.getElementById("orderBySelect");
    let orderSelected = orderBySelect.value
    let sortBy = "id";
    if(orderSelected == 1 || orderSelected == 0){
        sortBy = "id";
    }else if(orderSelected == 2){
        sortBy = "name";
    } else {
        sortBy = "lastName";
    }

    var getCli = JSON.stringify({
        "numPage": 0,
        "sizePage": 20,
        "sortBy": sortBy,
        "ascending": true
    });

    $.ajax({
        type:"POST",
        url: "https://nusan-api.herokuapp.com/allClients",
        dataType: "json",
        data: getCli,
        contentType: "application/json"   
    }).done(function(data){
        card(data);
    }).fail(function(error){
        contenido.innerHTML = `Error al cargar los clientes. `;
    })

}


function card(data){
    let x = 0;
    contenido.innerHTML='';
    for(let valor of data){

        contenido.innerHTML += ` 
        <div class="col-sm-4 mb-4" id="card${x}">
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
                    <button type="button" class="btn btn-outline-primary" id="btnEditModal">
                        Editar
                    </button>
                </div>
            </div>
        </div>`

        x = x+1;
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

});

//crear botones modal
function btnDeleteClientModal(){
    var id = $("#idEdit").val();

    deleteCliBtn.innerHTML=''; //limpiamos los botones del modal

    //creamos los botones del modal pasando el id que se quiere eliminar.
    deleteCliBtn.innerHTML +=
    `
    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
    <button type="button" class="btn btn-primary" onclick=\"deleteClient('${id}')\">S??</button>
    `
    //mostramos modal
    $('#deleteCliModal').modal('show');
}

//coge el DNI de la fila y carga los datos en el modal
function getCardDni(data){
    var dni = data;

    $.ajax({
        type:"GET",
        url: "https://nusan-api.herokuapp.com/clientDni/"+dni,
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
        url: "https://nusan-api.herokuapp.com/client/"+id,
        data: formData,
        contentType: "application/json-patch+json"
    }).done(function(data){
        $('#editClientModal').modal('hide');
        $('#successToast').toast('show');
        clients();
    }).fail(function(error){
        $('#dangerToast').toast('show');
    })    
}


function deleteClient(id){
    var deleteId = id;

    $.ajax({
        type:"DELETE",
        url: "https://nusan-api.herokuapp.com/client/"+deleteId,
    }).done(function(data){
        $('#deleteCliModal').modal('hide');
        $('#editClientModal').modal('hide');
        $('#deleteSuccessToast').toast('show');
        clients();
    }).fail(function(error){
        $('#deleteDangerToast').toast('show');
    })

}

function searchFunction1(){

    //variables
    let input = document.getElementById("search1");
    let filter = input.value.toUpperCase();
    let cards = $("#contenido div");
    let cardLength = (cards.length)/6
    
    for(let i = 0; i<cardLength;i++){

        let card = document.getElementById("card"+(i));
        let div = card.getElementsByTagName("div"); 
        let p = div[1].textContent;

        if(p.toUpperCase().includes(filter)==true){
            card.style.display = "";
        }else{
            card.style.display = "none";
            
        }
    }
}

function searchFunction2(){

    //variables
    let input = document.getElementById("search2");
    let filter = input.value.toUpperCase();
    let cards = $("#contenido div");
    let cardLength = (cards.length)/6
    
    for(let i = 0; i<cardLength;i++){

        let card = document.getElementById("card"+(i));
        let div = card.getElementsByTagName("div"); 
        let p = div[0].getElementsByTagName("p");
        let pText = p[2].textContent;

        if(pText.toUpperCase().includes(filter)==true){
            card.style.display = "";
        }else{
            card.style.display = "none";
            
        }
    }
}