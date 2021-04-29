$('#navbar').load('../components/navbar.html')

var contenido = document.querySelector('#contenido')

$('#obtener').on("click", traer);
    function traer(){
        
        var getReports = JSON.stringify({
            "numPage": 0,
            "sizePage": 20,
            "sortBy": "id",
            "ascending": true
        });
        
        //console.log(getReports);
        $.ajax({
            type:"POST",
            url: "http://localhost:8080/allReports",
            dataType: "json",
            data: getReports,
            contentType: "application/json"   
        }).done(function(data){
            console.log("done");
            console.log(data);
        }).fail(function(error){
            console.log("error");
            console.log(error);
        })
    }

