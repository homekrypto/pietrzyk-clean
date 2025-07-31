<?php
// accept-booking.php
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $email = $_GET["email"];
    $date = $_GET["date"];
    $slot = $_GET["slot"];
    $name = $_GET["name"];

    $subject = "Twoja rezerwacja została zaakceptowana";
    $message = "Cześć $name,\n\nTwoja rezerwacja na $date o $slot została zaakceptowana. Do zobaczenia!";
    $headers = "From: spotkanie@lukaszpietrzyk.pl";

    mail($email, $subject, $message, $headers);
    echo "Rezerwacja zaakceptowana i e-mail wysłany.";
}
?>
