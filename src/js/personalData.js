window.onload = personalData();

function personalData(){

    let userStr = sessionStorage.getItem('user');
    let user = JSON.parse(userStr);

    $("#inputEmail").val(user.email);
    $("#inputName").val(user.name);
    $("#inputLastName").val(user.lastName);
    $("#inputNumber").val(user.phoneNumber);
    $("#inputDni").val(user.dni);

    personalDataHeader(user);

}


function personalDataHeader(user){

    personalDataImg.innerHTML=`
        <div class="row text-center align-items-center" style="background-image: url('../img/degradado_fondo.jpg'); height: 30vh">
            <p class="text-white">
                <span class="fs-2">${user.name} ${user.lastName}</span><br>
                ${user.email}
            </p>
        </div>
    `;

}


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


function changeAccountData(){

    let loginStr = localStorage.getItem('login');
    let login = JSON.parse(loginStr);

    let userStr = sessionStorage.getItem('user');
    let user = JSON.parse(userStr);
    
    let email = $("#inputEmail").val();
    let oldPass = $("#inputOldPass").val();
    let newPass = $("#inputNewPass").val();
    let repeatPass = $("#inputRepeatPass").val();

    if(oldPass == login.password){
        if(newPass == repeatPass){
            let formData = JSON.stringify([
                {
                    "op":"replace",
                    "path":"/email",
                    "value": email
                },
                {
                    "op":"replace",
                    "path":"/password",
                    "value": newPass
                }
            ]);
        
            $.ajax({
                type:"PATCH",
                url: "https://nusan-api.herokuapp.com/employees/"+user.id,
                data: formData,
                contentType: "application/json-patch+json"
            }).done(function(data){
                login.password = newPass;
                localStorage.setItem('login',JSON.stringify(login));
                $('#successToast').toast('show');
                personalData();
            }).fail(function(error){
                $('#dangerToast').toast('show');
            }) 
        }else{
            alert("Las contraseñas no coinciden");
        }
        
    }else{
        alert("La contraseña del usuario no es correcta");
    }
}

function changePersonalData(){

    let userStr = sessionStorage.getItem('user');
    let user = JSON.parse(userStr);

    let name = $("#inputName").val();
    let lastName = $("#inputLastName").val();
    let number = $("#inputNumber").val();
    let dni = $("#inputDni").val();

    let formData = JSON.stringify([
        {
            "op":"replace",
            "path":"/name",
            "value": name
        },
        {
            "op":"replace",
            "path":"/lastName",
            "value": lastName
        },
        {
            "op":"replace",
            "path":"/phoneNumber",
            "value": number
        },
        {
            "op":"replace",
            "path":"/dni",
            "value": dni
        }
    ]);

    $.ajax({
        type:"PATCH",
        url: "https://nusan-api.herokuapp.com/employees/"+user.id,
        data: formData,
        contentType: "application/json-patch+json"
    }).done(function(data){
        user.name = name;
        user.lastName = lastName;
        user.phoneNumber = number;
        user.dni = dni;
        sessionStorage.setItem('user',JSON.stringify(user));
        $('#successToast').toast('show');
        personalData();
    }).fail(function(error){
        $('#dangerToast').toast('show');
    }) 
}

function disableAccount(){
    let btn = document.getElementById("editAccount");
    btn.innerHTML=`Editar`;
    btn.setAttribute("onclick","enableAccount()");

    document.getElementById("inputEmail").disabled = true;
    document.getElementById("inputOldPass").disabled = true;
    document.getElementById("inputNewPass").disabled = true;
    document.getElementById("inputRepeatPass").disabled = true;

    location.reload();
}
function disablePersonal(){
    let btn = document.getElementById("editpersonal");
    btn.innerHTML=`Editar`;
    btn.setAttribute("onclick","enablePersonal()");

    document.getElementById("inputName").disabled = true;
    document.getElementById("inputLastName").disabled = true;
    document.getElementById("inputNumber").disabled = true;
    document.getElementById("inputDni").disabled = true;

    location.reload();
}
function enableAccount(){
    let btn = document.getElementById("editAccount");
    btn.innerHTML=`Cancelar`;
    btn.setAttribute("onclick","disableAccount()");

    document.getElementById("inputEmail").disabled = false;
    document.getElementById("inputOldPass").disabled = false;
    document.getElementById("inputNewPass").disabled = false;
    document.getElementById("inputRepeatPass").disabled = false;
}
function enablePersonal(){
    let btn = document.getElementById("editpersonal");
    btn.innerHTML=`Cancelar`;
    btn.setAttribute("onclick","disablePersonal()");

    document.getElementById("inputName").disabled = false;
    document.getElementById("inputLastName").disabled = false;
    document.getElementById("inputNumber").disabled = false;
    document.getElementById("inputDni").disabled = false;
}

