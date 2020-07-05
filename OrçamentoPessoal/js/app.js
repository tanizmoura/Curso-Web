class Despesa {
	constructor(ano, mes, dia, tipo, descricao, valor) {
		this.ano = ano
		this.mes = mes
		this. dia = dia
		this.tipo = tipo
		this.descricao = descricao
		this.valor = valor
	}

	validarDados() {
		for (let i in this) {
			if (this[i] === null || this[i] === undefined || this[i] === '') {
				return false
			}
		}
		return true
	}
}

class Bd {
	constructor() {
		let id = localStorage.getItem('id')

		if (id === null) {
			localStorage.setItem('id', 0)
		}
	}

	getProximoId() {
		let id = localStorage.getItem('id')
		return parseInt(id) + 1
	}

	gravar(d) {
		let id = this.getProximoId()
		localStorage.setItem(id, JSON.stringify(d))
		localStorage.setItem('id', id)
	}

	listarDespesas() {
		let id = localStorage.getItem('id')
		let despesas = []

		for (var i = 0; i <= id; i++) {
			let despesa = JSON.parse(localStorage.getItem(i))

			if (despesa === null) {
				continue
			}

			despesas.push(despesa)
		}

		return despesas
	}
}

let bd = new Bd()

function atualizarModal(d) {
	let titulo = document.getElementById('tituloModal')
	let descricao = document.getElementById('descricaoModal')
	let botao = document.getElementById('btnModal')
	
	if(d === true) {
		titulo.innerHTML = 'Gravação concluída'
		titulo.className = 'modal-title text-success'
		descricao.innerHTML = 'Registro gravado com sucesso!'
		botao.innerHTML = 'Voltar'
		botao.className ='btn btn-success'
		
	} else {
		titulo.innerHTML = 'Erro de gravação'
		titulo.className = 'modal-title text-danger'
		descricao.innerHTML = 'Alguns campos não foram preenchidos corretamente.'
		botao.innerHTML = 'Voltar e corrigir'
		botao.className ='btn btn-danger'
	}
}

function cadastrarDespesa() {
	let ano = document.getElementById('ano')
	let mes = document.getElementById('mes')
	let dia = document.getElementById('dia')
	let tipo = document.getElementById('tipo')
	let descricao = document.getElementById('descricao')
	let valor = document.getElementById('valor')

	let despesa = new Despesa(ano.value, mes.value, dia.value, 
		tipo.value, descricao.value, valor.value)
	

	if(despesa.validarDados()) {
		bd.gravar(despesa)
		atualizarModal(true)
		$('#modalGravacao').modal('show')
	} else {
		atualizarModal(false)
		$('#modalGravacao').modal('show')
	}
	
}



function carregarDespesas() {
	let despesas = []
	despesas = bd.listarDespesas()
	
	console.log(despesas)

}
