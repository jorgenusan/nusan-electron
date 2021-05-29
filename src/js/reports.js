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
        contenido.innerHTML+=`
            <div class="card">
                <div class="row card-body">
                    <div class="col-md-4 col-lg mb-4">
                        <p class="card-text">
                            <img src="../../node_modules/bootstrap-icons/icons/clipboard.svg">
                            Nº: ${valor.id}
                            <br>
                            <img src="../../node_modules/bootstrap-icons/icons/list-ul.svg" alt="">
                            Estado: ${valor.state}
                            <br>
                            <img src="../../node_modules/bootstrap-icons/icons/bar-chart-fill.svg">
                            Prioridad: ${valor.priority}
                        </p>
                    </div>
                    <div class="col-md-4 col-lg mb-4">
                        <p class="card-text">
                            <img src="../../node_modules/bootstrap-icons/icons/tv-fill.svg" alt="">
                            ${valor.machine}
                            <br>
                            <img src="../../node_modules/bootstrap-icons/icons/badge-tm.svg" alt="">
                            ${valor.brand}
                            <br>
                            <img src="../../node_modules/bootstrap-icons/icons/calendar3.svg">
                            ${valor.dateApointment}
                        </p>
                    </div>
                    <div class="col-md-4 col-lg mb-4">
                        <p class="card-text">
                            <img src="../../node_modules/bootstrap-icons/icons/person-fill.svg" alt="">
                            ${valor.client.name} ${valor.client.lastName}
                            <br>
                            <img src="../../node_modules/bootstrap-icons/icons/telephone-fill.svg">
                            ${valor.client.phoneNumber}
                            <br>
                            <img src="../../node_modules/bootstrap-icons/icons/envelope-open-fill.svg" alt="">
                            ${valor.client.email}
                        </p>
                    </div>
                    <div class="col-md-4 col-lg mb-4">
                        <p class="card-text">
                            <img src="../../node_modules/bootstrap-icons/icons/people-fill.svg" alt="">  
                            ${valor.employees.name} ${valor.employees.lastName}
                            <br>
                            <img src="../../node_modules/bootstrap-icons/icons/calendar3-week.svg">
                            Inicio: ${valor.startDate}
                            <br>
                            <img src="../../node_modules/bootstrap-icons/icons/calendar3-week-fill.svg">
                            Fin: ${valor.endingDate}
                        </p>
                    </div>
                    <div class="col-md-2 col-lg-1 row text-center">
                        <button type="button" class="btn btn-primary" id="btnEditModal">Editar</button>
                    </div>
                </div>
            </div>`
    }
} 



