<?php 
  
  session_start();

  if (!isset($_SESSION['autenticado']) || $_SESSION['autenticado'] == 'NAO') {
    header('location: index.php?login=erro2');
  }

?>