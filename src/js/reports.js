window.onload = getData();


function getData(){

    let orderBySelect = document.getElementById("orderBySelect");
    let orderSelected = orderBySelect.value
    let sortBy = "id";
    if(orderSelected == 1){
        sortBy = "id";
    }else if(orderSelected == 2){
        sortBy = "state";
    } else if(orderSelected == 3){
        sortBy = "priority";
    }else if(orderSelected == 4){
        sortBy = "startDate";
    }else if(orderSelected == 5){
        sortBy = "endingDate";
    }else{
        sortBy = "dateApointment";
    }
        
    var getReports = JSON.stringify({
        "numPage": 0,
        "sizePage": 20,
        "sortBy": sortBy,
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
    let x = 0;
    for(let valor of data){
        if(valor.endingDate == null){
            valor.endingDate = "Sin fecha";
        }
        if(valor.dateApointment == null){
            valor.dateApointment = "Sin fecha";
        }
        contenido.innerHTML+=`
            <div class="card" id="card${x}">
                <div class="row card-body">
                    <div class="col-md-4 col-lg-3 col-xl mb-4">
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
                    <div class="col-md-4 col-lg-3 col-xl mb-4">
                        <p class="card-text">
                            <img src="../../node_modules/bootstrap-icons/icons/tv-fill.svg" alt="">
                            ${valor.machine}
                            <br>
                            <img src="../../node_modules/bootstrap-icons/icons/badge-tm.svg" alt="">
                            ${valor.brand}
                            <br>
                            <img src="../../node_modules/bootstrap-icons/icons/calendar3.svg">
                            Cita: ${valor.dateApointment}
                        </p>
                    </div>
                    <div class="col-md-4 col-lg-3 col-xl mb-4">
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
                    <div class="col-md-4 col-lg-3 col-xl mb-4">
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
                    <div class="col-md-2 col-lg-2 col-xl-1 row text-center">
                        <button type="button" class="btn btn-outline-primary" id="btnEditModal">Editar</button>
                    </div>
                </div>
            </div>`
            x=x+1;
    }
} 

function searchFunction1(){

    //variables
    let input = document.getElementById("search1");
    let filter = input.value.toUpperCase();
    let cards = $("#contenido div");
    let cardLength = (cards.length)/7
    
    for(let i = 0; i<cardLength;i++){

        let card = document.getElementById("card"+(i));
        let div = card.getElementsByTagName("div"); 
        let p = div[0].getElementsByTagName("p");
        let pText = p[0].textContent;

        if(pText.toUpperCase().includes(filter)==true){
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
    let cardLength = (cards.length)/7
    
    for(let i = 0; i<cardLength;i++){

        let card = document.getElementById("card"+(i));
        let div = card.getElementsByTagName("div"); 
        let p = div[0].getElementsByTagName("p");
        let pText = p[1].textContent;

        if(pText.toUpperCase().includes(filter)==true){
            card.style.display = "";
        }else{
            card.style.display = "none";
            
        }
    }
}

function searchFunction3(){

    //variables
    let input = document.getElementById("search3");
    let filter = input.value.toUpperCase();
    let cards = $("#contenido div");
    let cardLength = (cards.length)/7
    
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

function searchFunction4(){

    //variables
    let input = document.getElementById("search4");
    let filter = input.value.toUpperCase();
    let cards = $("#contenido div");
    let cardLength = (cards.length)/7
    
    for(let i = 0; i<cardLength;i++){

        let card = document.getElementById("card"+(i));
        let div = card.getElementsByTagName("div"); 
        let p = div[0].getElementsByTagName("p");
        let pText = p[3].textContent;

        if(pText.toUpperCase().includes(filter)==true){
            card.style.display = "";
        }else{
            card.style.display = "none";
            
        }
    }
}

