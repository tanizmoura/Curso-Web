var altura = 0;
var largura = 0;

function limiteAlturaPalco() {
	altura = window.innerHeight;
	largura = window.innerWidth;
}

limiteAlturaPalco()

/** randomizando posição **/

var randomA = Math.floor(Math.random() * altura) - 90;
var randomL = Math.floor(Math.random() * largura) - 90;
console.log(randomA,randomL);

randomA = randomA < 0 ? 0 : randomA; 
randomL = randomL < 0 ? 0 : randomL; 

/** criação de objeto **/

function criarElemento() {
	var mosca = document.createElement('img');
	mosca.src = 'img/mosca.png';
	mosca.className = 'mosca1';
	mosca.style.top = randomA + 'px';
	mosca.style.left = randomL + 'px';
	document.body.appendChild(mosca);

}



