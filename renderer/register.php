<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve user input
    $username = $_POST["username"];
    $password = $_POST["password"];
    $confirm_password = $_POST["confirm_password"];

    // Validate user input
    if ($password !== $confirm_password) {
        echo "Passwords do not match. Please try again.";
    } else {
        // Store user data in a text file (simplified example, not secure for production)
        $userData = "$username,$password\n";
        file_put_contents('user_data.txt', $userData, FILE_APPEND | LOCK_EX);

        // Display a success message with a link back to index.html
        echo "Registration successful. Welcome, $username! <br>";
        echo '<a href="index.html">Back to Login</a>';
    }
}
?>
