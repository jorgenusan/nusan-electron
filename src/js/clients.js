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
    console.log(data);
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
                    <p class="dni card-text">
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
        var row = btn.parentNode.parentNode;  //td than tr
        console.log("edit");
        var cells = row.getElementsByClassName("card-body"); //cells
        var dni = cells[0].textContent;
        console.log(dni);
    }

    //Si se pulsa eliminar
    if(btn.tagName==="BUTTON" && btn.id === "btnDeleteModal"){
        var row = btn.parentNode.parentNode;  //td than tr
        console.log("delete");
    }

});

//coge el ID de la fila y carga los datos en el modal
function getCardId(id){
 
    /*
    $.ajax({
        type:"GET",
        url: "http://localhost:8080/client/"+id,
    }).done(function(data){
        openEditModal(data);
    }).fail(function(error){
        alert("Error al obtener los datos del parte.", error);
    })*/
}