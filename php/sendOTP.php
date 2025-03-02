<?php
require_once 'src/PHPMailer.php';
require_once 'src/SMTP.php';
require_once 'src/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

function sendOTP($email, $otp,) {
    $mail = new PHPMailer(true);

    try {
        // Server settings
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'lockey.pass@gmail.com';
        $mail->Password = 'jrevsbegjkpwmsep';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        // Recipient
        $mail->setFrom('lockey.pass@gmail.com', 'Lockey');
        $mail->addAddress($email); // Pass the actual email address here

        // Email content
        $mail->isHTML(true);
        $mail->Subject = 'Sign Up for Lockey';
        $mail->Body = "
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    color: #333333;
                    background-color: #f9f9f9;
                    padding: 20px;
                }
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    background: #ffffff;
                    border: 1px solid #ddd;
                    border-radius: 10px;
                    padding: 20px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                }
                .header {
                    text-align: center;
                    margin-bottom: 20px;
                }
                .header img {
                    max-width: 120px;
                }
                .otp {
                    font-size: 24px;
                    font-weight: bold;
                    color: #1A73E8;
                    text-align: center;
                    margin: 20px 0;
                }
                .footer {
                    font-size: 12px;
                    color: #666;
                    text-align: center;
                    margin-top: 20px;
                }
                .footer a {
                    color: #1A73E8;
                    text-decoration: none;
                }
            </style>
        </head>
        <body>
            <div class='container'>
                <div class='header'>
                
                </div>
                <h1>Hi</h1>
                <p>Thank you for registering with <strong>Lockey</strong> - your trusted password manager. To complete your registration, please use the One-Time Password (OTP) below:</p>
                <div class='otp'>{$otp}</div>
                <p><strong>Note:</strong> This OTP is valid for <strong>10 minutes</strong>. Please do not share it with anyone.</p>
                <p>If you did not request this OTP, please ignore this email. Your account remains secure.</p>
                <p>Thank you for trusting <strong>Lockey</strong>!</p>
                <p>Warm regards,<br>The Lockey Team</p>
                
            </div>
        </body>
        </html>
        ";

        $mail->send();
        return "success";
    } catch (Exception $e) {
        return "error";
    }
}
?>
