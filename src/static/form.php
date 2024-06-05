<?php
  if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = filter_var($_POST['cta_email'], FILTER_SANITIZE_EMAIL);
    $question = filter_var($_POST['cta_question'], FILTER_SANITIZE_STRING);
    $message = filter_var($_POST['cta_message'], FILTER_SANITIZE_STRING);

    $to = 'boyko1396@gmail.com';
    $subject = 'SWIPER - new mail';
    $body = "Email: $email\n\nQuestion: $question\n\nMessage:\n$message";
    $headers = 'From: webmaster@example.com' . "\r\n" .
           'Reply-To: ' . $email . "\r\n" .
           'X-Mailer: PHP/' . phpversion();

    if (mail($to, $subject, $body, $headers)) {
      echo 'success';
    } else {
      echo 'error';
    }
  }
?>