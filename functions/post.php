<?php
include_once '../config/database.php';

function savePost($title, $content)
{
    global $conn;
    $stmt = $conn->prepare("INSERT INTO posts (title, content) VALUES (?, ?)");
    $stmt->bind_param("ss", $title, $content);
    if ($stmt->execute()) {
        return ['id' => $conn->insert_id];
    } else {
        return false;
    }
}
?>