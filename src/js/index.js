window.onload = userReports()

function userReports(){

    var userContent = myTabContent.getElementsByTagName("div");

    $.ajax({
        type:"GET",
        url: "http://localhost:8080//reportFilter/8/field/3"
    }).done(function(data){
        tableReportOpen(data, userContent[0]) ;
    }).fail(function(error){
        alert("Error al obtener los partes del usuario.", error);
    })
}

$(function(){

    $('#today-tab').on('click', function(e){
        
        const date = new Date();
        var today = date.toISOString();
        var dateFormat = today.match(/^\d{4}\-\d{2}\-\d{2}/)
        
        todayReports(dateFormat[0]);
        
    });

    $('#open-tab').on('click', function(e){
        var openContent = document.getElementById("open");

        $.ajax({
            type:"GET",
            url: "http://localhost:8080//reportFilter/Abierto/field/1"
        }).done(function(data){
            tableReportOpen(data, openContent)
            
        }).fail(function(error){
            alert("Error al obtener los partes de hoy.", error);
        })
        
    });
    
})

function todayReports(formatDate){
    var today = formatDate

    var todayContent = document.getElementById("today");

    $.ajax({
        type:"GET",
        url: "http://localhost:8080//reportFilter/"+today+"/field/2"
    }).done(function(data){
        tableReportOpen(data, todayContent)
        
    }).fail(function(error){
        alert("Error al obtener los partes abiertos.", error);
    })

}


function tableReportOpen(data, content){
    //TODO no funciona
    
    var contenido = content;

    if(data.length == 0){
        contenido.innerHTML=`
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
        console.log("donde va a crear las cosas: "+ contenido)
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
                            Aparato: ${valor.machine}
                            <br>
                            <img src="../../node_modules/bootstrap-icons/icons/badge-tm.svg" alt="">
                            Marca: ${valor.brand}
                            <br>
                            <img src="../../node_modules/bootstrap-icons/icons/calendar3.svg">
                            Cita: ${valor.dateApointment}
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
                        <button type="button" class="btn btn-outline-primary" id="btnEditModal">Editar</button>
                    </div>
                </div>
            </div>`
        }
    } 
}  






