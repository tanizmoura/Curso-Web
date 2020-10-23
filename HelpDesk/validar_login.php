<?php 
	session_start();


	$usuario_autenticado = false;
	$id_usuario = null;
	$perfil_usuario = null;
	$perfis = ['administrativo' => 1, 'usuario' => 2];

	$usuarios = array(
		['id' => 1 ,'email' => 'admin@teste.com.br' , 'senha' => '1234', 'perfil_id' => 1],
		['id' => 2 ,'email' => 'user@teste.com.br' , 'senha' => '1234', 'perfil_id' => 1],
		['id' => 3 ,'email' => 'maria@teste.com.br' , 'senha' => '1234', 'perfil_id' => 2],
		['id' => 4 ,'email' => 'joao@teste.com.br' , 'senha' => '1234', 'perfil_id' => 2]
	);
	
	foreach ($usuarios as $user) {

		if ($_POST['email'] == $user['email'] && $_POST['senha'] == $user['senha']) {
			$usuario_autenticado = true;
			$id_usuario = $user['id'];
			$perfil_usuario = $user['perfil_id'];
		}
	}

	if ($usuario_autenticado) {
		echo 'Usuário autenticado';
		header('location: home.php');
		$_SESSION['autenticado'] = 'SIM';
		$_SESSION['id'] = $id_usuario;
		$_SESSION['perfil_usuario'] = $perfil_usuario;
	} else {
		header('location: index.php?login=erro');
		$_SESSION['autenticado'] = 'NAO';
	}
?>