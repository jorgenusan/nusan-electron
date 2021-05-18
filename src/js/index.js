window.onload = openReports()

function openReports(){
    $.ajax({
        type:"GET",
        url: "http://localhost:8080/reportFilter/Abierto"
    }).done(function(data){
        tableReportOpen(data, 0) ;
    }).fail(function(error){
        alert("Error al obtener los partes abiertos.", error);
    })
}

$(function(){

    $('#today-tab').on('click', function(e){
        
        const date = new Date();
        var today = date.toISOString();
        var dateFormat = today.match(/^\d{4}\-\d{2}\-\d{2}/)
        todayReports(dateFormat[0]);
        
    });

    $('#week-tab').on('click', function(e){
         
        
    });
    
})

function todayReports(formatDate){
    var today = formatDate

    $.ajax({
        type:"GET",
        url: "http://localhost:8080/reportFilter/"+today
    }).done(function(data){
        tableReportOpen(data, 1)
        
    }).fail(function(error){
        alert("Error al obtener los partes de hoy.", error);
    })
}


function tableReportOpen(data, x){
    //TODO no funciona
    let open;

    if(x == 0 ){
        open = myTabContent.getElementsByTagName("div")
    }
    if(x==1){
        open = myTabContent2.getElementsByTagName("div")
    }
    

    if(data.length == 0){
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
        console.log(open)
        console.log(open[x])
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
                    <div class="col-md-2 col-lg-1 row text-center">
                        <button type="button" class="btn btn-primary" id="btnEditModal">Editar</button>
                    </div>
                </div>
            </div>`
        }
    } 
}  






