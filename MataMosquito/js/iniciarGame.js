function iniciar() {
	var fase = document.getElementById('fase').value;
	
	if (fase === '') {
		alert('Selecione uma fase')
		return false;
	} 		

	window.location.href = 'jogo.html?' + fase;

}