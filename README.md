# Lockey - Password Manager

Lockey is a web-based password manager application that helps users securely store, manage, and generate strong passwords. It allows users to save their credentials, including usernames, passwords, and associated URLs, in an encrypted format.

## Features

- **Secure Storage**: Encrypts and securely stores passwords.
- **Password Generation**: Generates strong, random passwords.
- **User Authentication**: Implements a secure login system.
- **Cross-Platform Access**: Web-based and accessible from any device.
- **Easy Management**: Add, edit, and delete stored credentials.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: PHP
- **Database**: MySQL
- **Server Environment**: XAMPP
- **Encryption**: AES-256 (Encrypting) , SHA-256(Hashing)

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/lockey.git
   cd lockey
   ```
2. Move the project to the XAMPP htdocs directory:
   ```sh
   mv lockey /xampp/htdocs/
   ```
3. Start XAMPP and ensure Apache and MySQL services are running.
4. Import the database:
   - Open **phpMyAdmin** in your browser (`http://localhost/phpmyadmin`).
   - Create a new database named `lockey_db`.
   - Import the `lockey_db.sql` file from the project folder.
5. Configure database connection in `config.php`:
   ```php
   <?php
   $servername = "localhost";
   $username = "root";
   $password = "";
   $dbname = "lockey_db";

   $conn = new mysqli($servername, $username, $password, $dbname);
   if ($conn->connect_error) {
       die("Connection failed: " . $conn->connect_error);
   }
   ?>
   ```
6. Start the application:
   - Open your browser and go to `http://localhost/lockey`

## Usage

- Sign up and log in to your account.
- Store and manage your passwords securely.

## Future Enhancements

- **Password generation**
- **Secure Sharing of Passwords**

**Developed by**: Pritsh Prasant Sahoo (https://github.com/pritishps) & Jyotiranjan Sahnkua (https://github.com/jnscdndn)
