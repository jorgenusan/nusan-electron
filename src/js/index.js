window.onload = openReports()

$(function(){

    $('#open-tab').on('click', function(e){
        
        
    });

    $('#today-tab').on('click', function(e){
         
        
    });

    $('#week-tab').on('click', function(e){
         
        
    });
    
});

function openReports(){
    $.ajax({
        type:"GET",
        url: "http://localhost:8080/reportState/Abierto"
    }).done(function(data){
        tableReportOpen(data) ;
    }).fail(function(error){
        alert("Error al obtener los partes abiertos.", error);
    })
}

function tableReportOpen(data){

    if(data.length == 0){
        var open = myTabContent.getElementsByTagName("div")
        open[0].innerHTML=`
        <div class="card">
                <div class="row card-body">
                    <div class="text-center">
                        <p class="card-text">
                            <h3>No tienes partes abiertos</h3>
                        </p>
                    </div>
                </div>
            </div>
        `;
    }else{

        var open = myTabContent.getElementsByTagName("div")
        open[0].innerHTML='';
    
        for(let valor of data){
            if(valor.endingDate == null){
                valor.endingDate = "Sin fecha";
            }
            if(valor.dateApointment == null){
                valor.dateApointment = "Sin fecha";
            }
    
            open[0].innerHTML+=`
    
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
                </div>
            </div>`
        }
    }
    
}

//TODO encapsular la funcionalidad de editar parte. Dejar solo un botón de editar y eliminar dentro del modal
//TODO mirar como encapsular los modales
