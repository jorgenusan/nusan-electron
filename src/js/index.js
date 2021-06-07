window.onload = userReports()

function userReports(){

    let userS = sessionStorage.getItem('user');
    let user = JSON.parse(userS);
    let id = user.id;

    let userContent = myTabContent.getElementsByTagName("div");

    $.ajax({
        type:"GET",
        url: "https://nusan-api.herokuapp.com/reportFilter/"+id+"/field/3"
    }).done(function(data){
        tableReportOpen(data, userContent[0]) ;
    }).fail(function(error){
        contenido.innerHTML=`Error al obtener los partes.`
    })
}

$(function(){

    $('#today-tab').on('click', function(e){
        
        const date = new Date();
        let today = date.toISOString();
        let dateFormat = today.match(/^\d{4}\-\d{2}\-\d{2}/)
        
        todayReports(dateFormat[0]);
        
    });

    $('#open-tab').on('click', function(e){
        let openContent = document.getElementById("open");

        $.ajax({
            type:"GET",
            url: "https://nusan-api.herokuapp.com/reportFilter/Abierto/field/1"
        }).done(function(data){
            tableReportOpen(data, openContent)
            
        }).fail(function(error){
            contenido.innerHTML=`Error al obtener los partes.`
        })
        
    });
    
})

function todayReports(formatDate){
    let today = formatDate

    let todayContent = document.getElementById("today");

    $.ajax({
        type:"GET",
        url: "https://nusan-api.herokuapp.com/reportFilter/"+today+"/field/2"
    }).done(function(data){
        tableReportOpen(data, todayContent)
        
    }).fail(function(error){
        contenido.innerHTML=`Error al obtener los partes.`
    })

}


function tableReportOpen(data, content){
    //TODO no funciona
    
    let contenido = content;

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
                            Aparato: ${valor.machine}
                            <br>
                            <img src="../../node_modules/bootstrap-icons/icons/badge-tm.svg" alt="">
                            Marca: ${valor.brand}
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
        url: "https://nusan-api.herokuapp.com/report/"+idreport,
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
        url: "https://nusan-api.herokuapp.com/allEmployees",
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
        url: "https://nusan-api.herokuapp.com/report/"+id,
        data: formData,
        contentType: "application/json-patch+json"
    }).done(function(data){
        $('#editReport').modal('hide');
        $('#successToast').toast('show');
        userReports();
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
        url: "https://nusan-api.herokuapp.com/report/"+deleteId,
    }).done(function(data){
        $('#deleteModal').modal('hide');
        $('#editReport').modal('hide');
        $('#deleteSuccessToast').toast('show');
        userReports();
    }).fail(function(error){
        $('#deleteDangerToast').toast('show');
    })
}