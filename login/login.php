<?php
session_start();
// Already logged in? Go straight to the main page
if (!empty($_SESSION['logged_in'])) {
    header('Location: index.html'); exit;
}
$error = $_GET['error'] ?? '';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="login.css">
    <title>Login – Bakery Café</title>
</head>
<body>
    <h1>Login</h1>
    <p>Welcome to our little shop</p>

    <?php if ($error === 'invalid'): ?>
        <p style="color:red;text-align:center">❌ Wrong username or password</p>
    <?php elseif ($error === 'empty'): ?>
        <p style="color:red;text-align:center">⚠️ Please fill in both fields</p>
    <?php endif; ?>

    <form class="table" action="process.php" method="POST">
        Username<br><br>
        <input type="text" name="username" placeholder="username" required><br><br>
        Password:<br><br>
        <input type="password" name="password" placeholder="password" required><br><br>
        <button type="submit">Log in</button>
    </form>

    <p style="text-align:center">
        Don't have an account? <a href="register.php">Register here</a>
    </p>
</body>
</html>