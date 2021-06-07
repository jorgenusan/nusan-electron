window.onload = getData();


function getData(){

    let orderBySelect = document.getElementById("orderBySelect");
    let orderSelected = orderBySelect.value
    let sortBy = "id";
    if(orderSelected == 1 || orderBySelect == 0){
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
        contenido.innerHTML=`Error al obtener los partes.`;
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














//comprueba en dónde se está pulsando
$("#contenido").on("click", function(evt) {
    //recogemos el botón pulsado
    let btn = evt.target;
    
    if(btn.tagName==="IMG" && btn.id === "imgEditModal"){
        let row = btn.parentNode.parentNode.parentNode;  //buton than td than tr
       getTdId(row);
    }
    if(btn.tagName==="BUTTON" && btn.id === "btnEditModal"){
        let row = btn.parentNode.parentNode;  //td than tr
        getTdId(row);
    }
});

//coge el ID de la fila y carga los datos en el modal
function getTdId(row){
    let div = row.getElementsByTagName("div");
    let p = div[0].getElementsByTagName("p"); 
    let id = p[0].textContent;
    let idreport = id.trim().match("[0-9]+")


    $.ajax({
        type:"GET",
        url: "http://localhost:8080/report/"+idreport,
    }).done(function(data){
        openEditModal(data);
    }).fail(function(error){
        alert("Error al obtener los datos del parte.", error);
    })
}

//crear botones modal
function createDeleteModal(){
    let idreport =  $("#idEdit").val()

    modalBtn.innerHTML=''; //limpiamos los botones del modal

    //creamos los botones del modal pasando el id que se quiere eliminar.
    modalBtn.innerHTML +=
    `
    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
    <button type="button" class="btn btn-primary" onclick="deleteYes(${idreport})">Sí</button>
    `
    //mostramos modal
    $('#deleteModal').modal('show');
}

/*
Abrir Modal para editar los datos
*/
function openEditModal(data){
    $('#editReport').modal('show');
    $('#idEdit').val(data.id);
    $('#dateStartEdit').val(data.startDate);
    $('#dateEndEdit').val(data.endingDate);
    $('#dateApointmentEdit').val(data.dateApointment);
    $('#priorityEdit').val(data.priority);
    $('#stateEdit').val(data.state);
    $('#machineEdit').val(data.machine);
    $('#brandEdit').val(data.brand);
    $('#textareaEdit').val(data.observations);
    $('#paymentEdit').val(data.payment);
    $('#paymentMethodEdit').val(data.paymentMethod);
    $('#selectClientsEdit').val(data.client.name +" " + data.client.lastName);
    
    employees(data);
}
//recoger los empleados todos para mostrar en el desplegable
function employees(actualEmp){

    var getEmp = JSON.stringify({
        "numPage": 0,
        "sizePage": 20,
        "sortBy": "id",
        "ascending": true
    });

    $.ajax({
        type:"POST",
        url: "http://localhost:8080/allEmployees",
        dataType: "json",
        data: getEmp,
        contentType: "application/json"   
    }).done(function(data){
        empOptions(data, actualEmp);
    }).fail(function(error){
        selectEmployeesEdit.innerHTML=`Error al obtener los datos de la tabla.`;
    })

}

//crea la select de los empleados.
function empOptions(data, actualEmp){
    selectEmployeesEdit.innerHTML=`<option>${actualEmp.employees.id} - ${actualEmp.employees.name} ${actualEmp.employees.lastName}</option>`;
    for(let valor of data){
        selectEmployeesEdit.innerHTML += `
        <option>${valor.id} - ${valor.name} ${valor.lastName}</option>
        `
        console.log(actualEmp.employees.id != data.id)
    }  
}

//recoge los datos del modal y actualiza los datos del repot.
function saveReportsChanges(){
    let id = $("#idEdit").val();

    let emp= $("#selectEmployeesEdit").val();
    let exp = new RegExp("[0-9]+");
    let result = emp.match(exp);
    let idEmployee = result[0];

    let formData = JSON.stringify([
        {
            "op":"replace",
            "path":"/startDate",
            "value": $("#dateStartEdit").val()
        },
        {
            "op":"replace",
            "path":"/endingDate",
            "value":  $("#dateEndEdit").val()
        },
        {
            "op":"replace",
            "path":"/dateApointment",
            "value": $('#dateApointmentEdit').val()
        },
        {
            "op":"replace",
            "path":"/priority",
            "value": $('#priorityEdit').val()
        },
        {
            "op":"replace",
            "path":"/state",
            "value": $('#stateEdit').val()
        },
        {
            "op":"replace",
            "path":"/machine",
            "value": $('#machineEdit').val()
        },
        {
            "op":"replace",
            "path":"/brand",
            "value": $('#brandEdit').val()
        },
        {
            "op":"replace",
            "path":"/observations",
            "value": $('#textareaEdit').val()
        },
        {
            "op":"replace",
            "path":"/payment",
            "value": $('#paymentEdit').val()
        },
        {
            "op":"replace",
            "path":"/paymentMethod",
            "value": $('#paymentMethodEdit').val()
        },
        {
            "op":"replace",
            "path":"/employees/id",
            "value": idEmployee
        }
    ]);

    $.ajax({
        type:"PATCH",
        url: "http://localhost:8080/report/"+id,
        data: formData,
        contentType: "application/json-patch+json"
    }).done(function(data){
        $('#editReport').modal('hide');
        $('#successToast').toast('show');
        getData();
    }).fail(function(error){
        $('#dangerToast').toast('show');
    })    
}


//Eliminar un parte
function deleteYes(id){
    let deleteId = id
console.log(deleteId)
    $.ajax({
        type:"DELETE",
        url: "http://localhost:8080/report/"+deleteId,
    }).done(function(data){
        $('#deleteModal').modal('hide');
        $('#editReport').modal('hide');
        $('#deleteSuccessToast').toast('show');
        getData();
    }).fail(function(error){
        $('#deleteDangerToast').toast('show');
    })
}