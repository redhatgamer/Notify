<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve user input
    $username = $_POST["username"];
    $password = $_POST["password"];

    // Validate user credentials (This is a simplified example, please use secure methods in a real application)
    $validUsername = "example_user";
    $validPassword = "password123";

    if ($username === $validUsername && $password === $validPassword) {
        // Successful login
        echo "Login successful. Welcome, $username!";
    } else {
        // Failed login
        echo "Invalid username or password. Please try again.";
    }
}
?>
