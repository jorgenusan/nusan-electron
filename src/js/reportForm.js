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
    console.log(data);
    selectClients.innerHTML='<option>Nuevo</option>';
    for(let valor of data){
        selectClients.innerHTML += `
        <option>${valor.name} ${valor.lastName}</option>
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
    console.log(data);
    selectEmployees.innerHTML='<option>Selecionar empleado</option>';
    for(let valor of data){
        selectEmployees.innerHTML += `
        <option>${valor.name} ${valor.lastName}</option>
        `
    }  
}


$("form").submit(function(event){

    let dateStart= $("#inputDateStart").val();
    let dateApointment= $("#inputDateApointment").val();
    let dateEnd= $("#inputDateEnd").val();
    let priority= $("#inputPriority").val();
    let state= $("#inputState").val();
    let machine= $("#inputMachine").val();
    let brand= $("#inputBrand").val();
    let controlTextarea= $("#FormControlTextarea").val();
    let dateStart= $("#inputDateStart").val();
    let dateStart= $("#inputDateStart").val();


    event.preventDefault();
});