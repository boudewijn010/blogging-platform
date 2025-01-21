<?php
include_once '../config/database.php';

function saveUser($username, $password)
{
    global $conn;
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);
    $stmt = $conn->prepare("INSERT INTO users (username, password) VALUES (?, ?)");
    $stmt->bind_param("ss", $username, $hashed_password);
    if ($stmt->execute()) {
        return true;
    } else {
        error_log("Error saving user: " . $stmt->error);
        return false;
    }
}
?>