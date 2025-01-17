<?php
include_once 'functions/post.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $title = $_POST['title'];
    $content = $_POST['content'];

    if (savePost($title, $content)) {
        echo "Post saved successfully!";
    } else {
        echo "Failed to save post.";
    }
}
?>