<?php  

require '../../app_lista_tarefas/tarefa_model.php';
require '../../app_lista_tarefas/tarefa_service.php';
require '../../app_lista_tarefas/conexao.php';

$acao = isset($_GET['acao']) ? $_GET['acao'] : $acao;

if($acao == 'inserir') {

	if($_POST['tarefa'] != null) {
		$tarefa = new Tarefa();
		$tarefa->__set('tarefa', $_POST['tarefa']);

		$conexao = new Conexao();

		$tarefaService = new TarefaService($conexao, $tarefa);
		$tarefaService->inserir();

		header('location: nova_tarefa.php?inclusao=1');

	} else {
		header('location: nova_tarefa.php?inclusao=2');
	}

} else if($acao == 'recuperar') {

	$tarefa = new Tarefa();

	$conexao = new Conexao();

	$tarefaService = new TarefaService($conexao, $tarefa);

	$tarefas = $tarefaService->recuperar();

} else if ($acao == 'atualizar') {

	$tarefa = new Tarefa();
	$tarefa->__set('tarefa',$_POST['tarefa'])->__set('id',$_POST['id']);

	$conexao = new Conexao();

	$tarefaService = new TarefaService($conexao, $tarefa);

	$tarefaService->atualizar();

	header('location: todas_tarefas.php');

} else if($acao == 'remover') {
	$tarefa = new Tarefa();
	$tarefa->__set('id',$_GET['id']);
	
	$conexao = new Conexao();

	$tarefaService = new TarefaService($conexao, $tarefa);

	$tarefaService->remover();

	header('location: todas_tarefas.php');

} else if($acao == 'marcarRealizada') {
	$tarefa = new Tarefa();
	$tarefa->__set('id',$_GET['id'])->__set('id_status',2);

	$conexao = new Conexao();

	$tarefaService = new TarefaService($conexao, $tarefa);

	$tarefaService->marcarRealizada();

	header('location: todas_tarefas.php');

}  else if($acao == 'recuperarTarefasPendentes') {
	$tarefa = new Tarefa();
	$tarefa->__set('id_status', 1);
		
	$conexao = new Conexao();

	$tarefaService = new TarefaService($conexao, $tarefa);
	$tarefas = $tarefaService->recuperarTarefasPendentes();
}

?>