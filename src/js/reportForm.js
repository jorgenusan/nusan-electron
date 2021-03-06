window.onload = clients(), employees();
function clients(){

    var getCli = JSON.stringify({
        "numPage": 0,
        "sizePage": 20,
        "sortBy": "id",
        "ascending": true
    });

    $.ajax({
        type:"POST",
        url: "https://nusan-api.herokuapp.com/allClients",
        dataType: "json",
        data: getCli,
        contentType: "application/json"   
    }).done(function(data){
        cliOptions(data);
    }).fail(function(error){
        selectClients.innerHTML += `<option>Error al obtener los clientes.</option>`;
    })

}

function cliOptions(data){
    selectClients.innerHTML='<option>Nuevo</option>';
    for(let valor of data){
        selectClients.innerHTML += `
        <option>${valor.id} - ${valor.name} ${valor.lastName}</option>
        `
    }  
}


function employees(){

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
        empOptions(data);
    }).fail(function(error){
        selectEmployees.innerHTML=`<option>Error al obtener los empleados.</option>`;
    })

}

function empOptions(data){
    selectEmployees.innerHTML='<option>Selecionar empleado</option>';
    for(let valor of data){
        selectEmployees.innerHTML += `
        <option>${valor.id} - ${valor.name} ${valor.lastName}</option>
        `
    }  
}


$("form").submit(function(event){

    var client = $("#selectClients").val();
    if(client === "Nuevo"){
        createNewClient();
    }else{

        let cli= $("#selectClients").val();
        let exp = new RegExp("[0-9]+");
        let result = cli.match(exp);

        createNewReport(result[0]);
    }

    event.preventDefault();
});

function createNewClient(){

    var formData = JSON.stringify({
        name: $("#inputName").val(),
        lastName: $("#inputLastName").val(),
        dni: $('#inputDni').val(),
        email: $('#inputEmail').val(),
        phoneNumber: $('#inputTel').val(),
        city: $('#inputCity').val(),
        address: $('#inputAddress').val()
    });
    
    $.ajax({
        type:"POST",
        url: "https://nusan-api.herokuapp.com/client",
        data: formData,
        contentType: "application/json"
    }).done(function(data){
        let idClient = data.id;
        createNewReport(idClient);
        $('#successToastCli').toast('show');
    }).fail(function(error){
        $('#dangerToastCli').toast('show');
    })

}

function createNewReport(idClient){
    let emp= $("#selectEmployees").val();
    let exp = new RegExp("[0-9]+");
    let result = emp.match(exp);
    console.log(result)
    let idEmployee;
    if(result == null){

    }else{
        idEmployee = result[0];
    }
    
    var formData = JSON.stringify({
        startDate: $("#inputDateStart").val(),
        endingDate: $("#inputDateEnd").val(),
        dateApointment: $("#inputDateApointment").val(),
        priority: $("#inputPriority").val(),
        state: $("#inputState").val(),
        machine: $("#inputMachine").val(),
        brand: $("#inputBrand").val(),
        observations: $("#FormControlTextarea").val(),
        client : { id: idClient},
        employees : {id : idEmployee}
    });

    console.log(formData);

    $.ajax({
        type:"POST",
        url: "https://nusan-api.herokuapp.com/report",
        data: formData,
        contentType: "application/json"
    }).done(function(data){
        $('#successToast').toast('show');
        clear();
    }).fail(function(error){
        $('#dangerToast').toast('show');
    })


}
function clear(){
    $("#inputDateStart").val("");
    $("#inputDateApointment").val("");
    $("#inputPriority").val("Sin definir");
    $("#inputState").val("Abierto");
    $("#inputMachine").val("");
    $("#inputBrand").val("");
    $("#FormControlTextarea").val("");
    $("#selectClients").val("Nuevo");
    $("#inputName").val("");
    $("#inputLastName").val("");
    $("#inputEmail").val("");
    $("#inputDni").val("");
    $("#inputTel").val("");
    $("#inputAddress").val("");
    $("#inputCity").val("");
    $("#selectEmployees").val("Seleccionar empleado");
    $("#inputDateEnd").val("");
    
}