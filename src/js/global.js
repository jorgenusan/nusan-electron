$('#navbar').load('../components/navbar.html')

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