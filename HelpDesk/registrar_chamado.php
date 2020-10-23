<?php 
	session_start();

	print_r($_POST);

	$_POST['titulo'] = str_replace('#', '-', $_POST['titulo']);
	$_POST['categoria'] = str_replace('#', '-', $_POST['categoria']);
	$_POST['descricao'] = str_replace('#', '-', $_POST['descricao']);

	$texto = $_SESSION['id'] . '#' . implode('#', $_POST) . PHP_EOL;

	$arquivo = fopen('../../app_help_desk/arquivo.txt', 'a');

	fwrite($arquivo, $texto);

	fclose($arquivo);

	header('Location: abrir_chamado.php');

?>