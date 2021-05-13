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
        url: "http://localhost:8080/allClients",
        dataType: "json",
        data: getCli,
        contentType: "application/json"   
    }).done(function(data){
        cliOptions(data);
    }).fail(function(error){
        alert("Error al obtener los datos de la tabla.", error);
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
        url: "http://localhost:8080/allEmployees",
        dataType: "json",
        data: getEmp,
        contentType: "application/json"   
    }).done(function(data){
        empOptions(data);
    }).fail(function(error){
        alert("Error al obtener los datos de la tabla.", error);
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
        url: "http://localhost:8080/client",
        data: formData,
        contentType: "application/json"
    }).done(function(data){
        let idClient = data.id;
        createNewReport(idClient);
        console.log("cliente creado");
    }).fail(function(error){
        alert("Error al crear el cliente.")
    })

}

function createNewReport(idClient){
    let emp= $("#selectEmployees").val();
    let exp = new RegExp("[0-9]+");
    let result = emp.match(exp);
    let idEmployee;
    if(result == null){
        idEmployee = "";
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
        url: "http://localhost:8080/report",
        data: formData,
        contentType: "application/json"
    }).done(function(data){
        alert("El parte ha sido creado.");
        console.log("parte creado");
        clear();
    }).fail(function(error){
        alert("Error al crear el parte.")
    })


}
function clear(){
    $("#inputDateStart").val("");
    $("#inputDateApointment").val("");
    $("#inputPriority").val("");
    $("#inputState").val("");
    $("#inputMachine").val("");
    $("#inputBrand").val("");
    $("#FormControlTextarea").val("");
    $("#selectClients").val("");
    $("#inputName").val("");
    $("#inputLastName").val("");
    $("#inputEmail").val("");
    $("#inputDni").val("");
    $("#inputTel").val("");
    $("#inputAddress").val("");
    $("#inputCity").val("");
    $("#selectEmployees").val("");
    $("#inputDateEnd").val("");
    
}