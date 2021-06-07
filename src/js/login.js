$(document).ready(function(){

    if(localStorage.getItem('login')!=null){
        let loginString = localStorage.getItem('login');
        let login = JSON.parse(loginString);
        $("#InputEmail").val(login.email);
        $("#InputPassword").val(login.password);
        $("#exampleCheck1").prop('checked', true);
    }

    $("form").submit(function(event){

            var formData = JSON.stringify({
                email: $("#InputEmail").val(),
                password: $("#InputPassword").val()
            });
    
            $.ajax({
                type:"POST",
                url: "https://nusan-api.herokuapp.com/login",
                data: formData,
                contentType: "application/json"
            }).done(function(data){
                loadLocalStorage(data);
                loadUser(data);
            }).fail(function(error){
                alert("Email o contraseña incorrecto.")
            })
          event.preventDefault();

        function loadLocalStorage(data){
            var remember = document.getElementById("exampleCheck1").checked;
            if(remember){
                localStorage.setItem('login', JSON.stringify(data));
            }else{
                localStorage.removeItem('login');
            }
        }

        async function loadUser(data){
            let userEmail = data.email;

            await $.ajax({
                type:"GET",
                url: "https://nusan-api.herokuapp.com/employeesEmail/"+userEmail,
            }).done(function(data){
                sessionStorage.setItem('user', JSON.stringify(data));
                window.location.replace("./index.html");
            }).fail(function(error){
                alert(error)
            })

        }

    });

    $("#show_hide_password a").on('click', function(event) {
        event.preventDefault();
        if($('#show_hide_password input').attr("type") == "text"){
            $('#show_hide_password input').attr('type', 'password');
            $('#show_hide_password img').attr( 'src', '../../node_modules/bootstrap-icons/icons/eye-fill.svg' );

        }else if($('#show_hide_password input').attr("type") == "password"){
            $('#show_hide_password input').attr('type', 'text');
            $('#show_hide_password img').attr( 'src', '../../node_modules/bootstrap-icons/icons/eye-slash-fill.svg' );
        }
    });
});

