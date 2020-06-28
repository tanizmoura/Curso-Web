var altura = 0;
var largura = 0;
var vida = 1;
var tempo = 15;

var criaMosquitoTempo = 1500;

var fase = window.location.search;
fase = fase.replace('?','');

if (fase === 'normal') {
	criaMosquitoTempo = 1500;
} else if (fase === 'dificil') {
	criaMosquitoTempo = 1000;
} else if (fase === 'expert') {
	criaMosquitoTempo = 750;
}

function limiteAlturaPalco() {
	altura = window.innerHeight;
	largura = window.innerWidth;
}

limiteAlturaPalco()

var cronometro = setInterval(function(){
	
	tempo-=1;

	if (tempo < 0 ) {
		clearInterval(cronometro);
		clearInterval(criarMosquito);
		window.location.href = "vitoria.html"
	}
	document.getElementById('cronometro').innerHTML = tempo;
}, 1000);

function criarElemento() {

	/** verifica se objeto já existe antes de deletar **/

	if(document.getElementById('mosquito')) {

		document.getElementById('mosquito').remove();

		if (vida > 3) {
			window.location.href ='gameover.html'
		}

		document.getElementById('v' + vida).src ='img/coracao_vazio.png'

		vida++;
	}

	/** randomizando posição **/

	var randomA = Math.floor(Math.random() * altura) - 90;
	var randomL = Math.floor(Math.random() * largura) - 90;

	randomA = randomA < 0 ? 0 : randomA; 
	randomL = randomL < 0 ? 0 : randomL; 


	/** criação de objeto **/

	var mosquito = document.createElement('img');
	mosquito.src = 'img/mosquito.png';
	mosquito.className = tamanhoRandomico() + ' ' + ladoRandomico();
	mosquito.style.top = randomA + 'px';
	mosquito.style.left = randomL + 'px';
	mosquito.style.position = 'absolute';
	mosquito.id ='mosquito';
	mosquito.onclick = function() {
		this.remove();
	}

	document.body.appendChild(mosquito);

}

/** randomizando tamanhos **/

function tamanhoRandomico() {
	var classe = Math.floor(Math.random() * 3);
	
	switch(classe) {
		case 0:
			return 'mosquito1'

		case 1:
			return 'mosquito2'
		case 2:
			return 'mosquito3'
	}
}

/** randomizando lados **/

function ladoRandomico() {
	var classe = Math.floor(Math.random() * 2);
	
	switch(classe) {
		case 0:
			return ''

		case 1:
			return 'ladoB'

	}
}



