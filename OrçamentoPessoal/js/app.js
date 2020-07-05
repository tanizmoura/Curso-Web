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
			despesa.id = i
			despesas.push(despesa)
		}

		return despesas
	}

	pesquisar(despesa) {
		let despesasFiltradas = []
		despesasFiltradas = this.listarDespesas()

		//ano
		if (despesa.ano != '') {
			console.log('filtro ano')
			despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano)
		}
	
		//mes
		if (despesa.mes != '') {
			console.log('filtro mês')
			despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes)
		}

		//dia
		if (despesa.dia != '') {
			console.log('filtro dia')
			despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia)
		}

		//tipo
		if (despesa.tipo != '') {
			console.log('filtro tipo')
			despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo)
		}

		//descricao
		if (despesa.descricao != '') {
			console.log('filtro descricao')
			despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao)
		}

		//valor
		if (despesa.valor != '') {
			console.log('filtro valor')
			despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor)
		}

		return despesasFiltradas

	}

	deletar(id) {
		localStorage.removeItem(id)
	}
}

let bd = new Bd()

function atualizarModal(tipoModal) {
	let titulo = document.getElementById('tituloModal')
	let descricao = document.getElementById('descricaoModal')
	let botao = document.getElementById('btnModal')
	
	if(tipoModal === 'gracavaoConcluida') {
		titulo.innerHTML = 'Gravação concluída'
		titulo.className = 'modal-title text-success'
		descricao.innerHTML = 'Registro gravado com sucesso!'
		botao.innerHTML = 'Voltar'
		botao.className ='btn btn-success'

		
	} else if(tipoModal === 'gracavaoErro'){
		titulo.innerHTML = 'Erro de gravação'
		titulo.className = 'modal-title text-danger'
		descricao.innerHTML = 'Alguns campos não foram preenchidos corretamente.'
		botao.innerHTML = 'Voltar e corrigir'
		botao.className ='btn btn-danger'
	} else if(tipoModal === 'deletarGravacao'){
		titulo.innerHTML = 'Registro deletado'
		titulo.className = 'modal-title text-success'
		descricao.innerHTML = 'Registro deletado com sucesso!'
		botao.innerHTML = 'Voltar'
		botao.className ='btn btn-success'
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
		atualizarModal('gracavaoConcluida')
		$('#modalGravacao').modal('show')

		ano.value = ''
		mes.value = ''
		dia.value = ''
		tipo.value = ''
		descricao.value = ''
		valor.value = ''

	} else {
		atualizarModal('gracavaoErro')
		$('#modalGravacao').modal('show')
	}
	
}



function carregarDespesas(despesas = Array(), filtro = false) {
	
	if (despesas.length == 0 && filtro == false) {
		despesas = bd.listarDespesas()	
	}
	

	let listaDespesas = document.getElementById('listaDespesas')
	listaDespesas.innerHTML = ''
	
	despesas.forEach(function(d){

		let linha = listaDespesas.insertRow()

		linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`

		switch(d.tipo) {
			case '1': d.tipo = 'Alimentação'
				break
			case '2': d.tipo = 'Educação'
				break
			case '3': d.tipo = 'Lazer'
				break
			case '4': d.tipo = 'Saúde'
				break	
			case '5': d.tipo = 'Transporte'
				break			
		}

		linha.insertCell(1).innerHTML = d.tipo
		linha.insertCell(2).innerHTML = d.descricao
		linha.insertCell(3).innerHTML = d.valor

		let btn = document.createElement('button')
		btn.className = 'btn btn-danger'
		btn.innerHTML = '<i class="fas fa-times"></i>'
		btn.id = `id_despesa_${d.id}`
		btn.onclick = function(){
			let id = btn.id.replace('id_despesa_','')
			bd.deletar(id)
			atualizarModal('deletarGravacao')
			$('#modalGravacao').modal('show')
			
		}

		linha.insertCell(4).append(btn)

	})

}

function pesquisarDespesa() {
	let ano = document.getElementById('ano').value
	let mes = document.getElementById('mes').value
	let dia = document.getElementById('dia').value
	let tipo = document.getElementById('tipo').value
	let descricao = document.getElementById('descricao').value
	let valor = document.getElementById('valor').value

	let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)

	
	carregarDespesas(bd.pesquisar(despesa), true)
}

function totalDespesas(despesas = Array()) {
	
	let total = 0
	let valorTotal = document.getElementById('valorTotal')

	let listaDespesas = document.getElementById('listaDespesas')
	listaDespesas.innerHTML = ''

	despesas.forEach(function(d){
		let linha = listaDespesas.insertRow()

		linha.insertCell(0).innerHTML = d.descricao
		linha.insertCell(1).innerHTML = d.valor

		total += parseFloat(d.valor)
	})

	valorTotal.innerHTML = `R$${total}`
}

function filtrarTotalDespesas() {
	let ano = document.getElementById('ano').value
	let mes = document.getElementById('mes').value
	let tipo = document.getElementById('tipo').value

	let despesa = new Despesa(ano, mes, '', tipo, '', '')

	let despesasFiltradas = bd.pesquisar(despesa)

	totalDespesas(despesasFiltradas)

}
