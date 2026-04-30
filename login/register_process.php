<?php
session_start();
require 'db_config.php';

// Only handle POST; if someone visits directly, send them to the form
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: register.php'); exit;
}

$login    = trim($_POST['username'] ?? '');
$password = $_POST['password'] ?? '';
$fullName = trim($_POST['full_name'] ?? '');
$email    = trim($_POST['email'] ?? '');

// Validate required fields
if (empty($login) || empty($password) || empty($fullName)) {
    $error = 'empty';
} else {
    $db = getDB();
    try {
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        $db->beginTransaction();

        // 1. Insert into account table
        $stmt1 = $db->prepare("INSERT INTO account (login, password) VALUES (?, ?)");
        $stmt1->execute([$login, $hashedPassword]);
        $accountId = $db->lastInsertId();

        // 2. Insert into customer table
        $stmt2 = $db->prepare("INSERT INTO customer (account_id, name, email) VALUES (?, ?, ?)");
        $stmt2->execute([$accountId, $fullName, $email]);
        $customerId = $db->lastInsertId();

        $db->commit();

        $_SESSION['logged_in']   = true;
          $_SESSION['username']    = $login;
        $_SESSION['name']        = $fullName;
        $_SESSION['customer_id'] = $customerId;

       header('Location: ../index.html'); exit;

    } catch (PDOException $e) {
        $db->rollBack();
        $error = 'exists';
    }
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

    <?php if ($error === 'empty'): ?>
        <p style="color:red; text-align:center;">⚠️ Please fill in all required fields</p>
    <?php elseif ($error === 'exists'): ?>
        <p style="color:red; text-align:center;">❌ That username is already taken, please choose another</p>
    <?php endif; ?>

    <form class="table" action="register_process.php" method="POST">
        Full Name<br>
        <input type="text" name="full_name" placeholder="Your Name"
               value="<?= htmlspecialchars($fullName ?? '') ?>" required><br><br>

        Email<br>
        <input type="email" name="email" placeholder="email@example.com"
               value="<?= htmlspecialchars($email ?? '') ?>"><br><br>

        Username<br>
        <input type="text" name="username" placeholder="Choose a username"
               value="<?= htmlspecialchars($login ?? '') ?>" required><br><br>

        Password<br>
        <input type="password" name="password" placeholder="Choose a password" required><br><br>

        <button type="submit">Sign Up &amp; Enter</button>
    </form>

    <p style="text-align:center;">
        Already have an account? <a href="login.php">Login here</a>
    </p>
</body>
</html>