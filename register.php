<?php
include_once 'functions/user.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = $_POST['username'];
    $email = $_POST['email'];
    $password = $_POST['password'];

    if (saveUser($username, $email, $password)) {
        header("Location: /dashboard.php");
        exit();
    } else {
        echo "Failed to register user.";
    }
}
?>