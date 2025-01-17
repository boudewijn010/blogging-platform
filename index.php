<!DOCTYPE html>
<html>

<head>
    <title>Blogging Platform</title>
</head>

<body>
    <h1>Create a New Post</h1>
    <form action="save_post.php" method="POST">
        <label for="title">Title:</label><br>
        <input type="text" id="title" name="title"><br>
        <label for="content">Content:</label><br>
        <textarea id="content" name="content"></textarea><br>
        <input type="submit" value="Submit">
    </form>
    <br>
    <a href="register_form.php">Register</a>
</body>

</html>