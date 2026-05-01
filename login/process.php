<?php
session_start();
require 'db_config.php';
 
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: login.php'); exit;
}
 
$login    = trim($_POST['username'] ?? '');
$password = $_POST['password'] ?? '';
 
if (empty($login) || empty($password)) {
    header('Location: login.php?error=empty'); exit;
}
 
$db   = getDB();
$stmt = $db->prepare("
    SELECT a.account_id, a.login, a.password,
           c.customer_id, c.name, c.email
    FROM account a
    LEFT JOIN customer c ON c.account_id = a.account_id
    WHERE a.login = ? LIMIT 1
");
$stmt->execute([$login]);
$user = $stmt->fetch();
 
if ($user && password_verify($password, $user['password'])) {
    $_SESSION['logged_in']   = true;
    $_SESSION['username']    = $user['login'];
    $_SESSION['name']        = $user['name'];
    $_SESSION['customer_id'] = $user['customer_id'];
    header('Location: ../index.html');exit;
} else {
    header('Location: login.php?error=invalid'); exit;
}
?>