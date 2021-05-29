window.onload = nav();

// Botón scroll up
$(document).ready(function(){
	$(window).scroll(function () {
			if ($(this).scrollTop() > 50) {
				$('#back-to-top').fadeIn();
			} else {
				$('#back-to-top').fadeOut();
			}
		});
		// scroll body to 0px on click
		$('#back-to-top').click(function () {
			$('body,html').animate({
				scrollTop: 0
			}, 100);
			return false;
		});
});

//formato de fecha como lo acepta el backend
function convertDateFormat(string) {
    var info = string.split('/').reverse().join('-');
    return info;
}


function nav(){

	let userString = sessionStorage.getItem('user');
	let user = JSON.parse(userString);

	navUser.innerHTML += `
	<li class="nav-item" >
		<div class="btn-group">
			<button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
				${user.name} ${user.lastName}
			</button>
			<ul class="dropdown-menu dropdown-menu-end">
				<li><button class="dropdown-item" type="button">Perfil</button></li>
				<li><button class="dropdown-item" type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Cerrar sesión</button></li>
			</ul>
		</div>
	</li>
	`;
}


