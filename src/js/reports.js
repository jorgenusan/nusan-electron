

window.onload = traer();
    function traer(){
        
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
        console.log(data);
        contenido.innerHTML='';
        for(let valor of data){
            contenido.innerHTML += ` 
            <tr>
                <td>${ valor.id }</td>
                <td>${ valor.startDate }</td>
                <td>${ valor.endingDate }</td>
                <td>${ valor.dateApointment }</td>
                <td>${ valor.priority }</td>
                <td>${ valor.state }</td>
                <td>${ valor.machine }</td>
                <td>${ valor.brand }</td>
                <td>${ valor.idCli }</td>
                <td>${ valor.idEmp }</td>
                <td>
                <button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#editReport">
                    <img src="../../node_modules/bootstrap-icons/icons/pencil.svg" alt="edit pencil">
                </button>
                </td>
                <td>
                <button class="btn btn-danger"><img src="../../node_modules/bootstrap-icons/icons/x.svg" alt="delete"></button>
                </td>
             </tr>`
        }
           
        
    }

