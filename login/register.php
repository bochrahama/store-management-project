<?php
// If already logged in, skip registration
session_start();
if (!empty($_SESSION['logged_in'])) {
    header('Location: index.html'); exit;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="login.css">
    <title>Register – Bakery Café</title>
</head>
<body>
    <h1>Create Account</h1>
    <p>Welcome to our little shop</p>

    <form class="table" action="register_process.php" method="POST">
        Full Name<br>
        <input type="text" name="full_name" placeholder="Your Name" required><br><br>

        Email<br>
        <input type="email" name="email" placeholder="email@example.com"><br><br>

        Username<br>
        <input type="text" name="username" placeholder="Choose a username" required><br><br>

        Password<br>
        <input type="password" name="password" placeholder="Choose a password" required><br><br>

        <button type="submit">Sign Up &amp; Enter</button>
    </form>

    <p style="text-align:center;">
        Already have an account? <a href="login.php">Login here</a>
    </p>
</body>
</html>