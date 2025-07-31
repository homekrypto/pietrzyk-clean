<?php
// deny-booking.php
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $email = $_GET["email"];
    $date = $_GET["date"];
    $slot = $_GET["slot"];
    $name = $_GET["name"];

    $subject = "Twoja rezerwacja została odrzucona";
    $message = "Cześć $name,\n\nNiestety Twoja rezerwacja na $date o $slot została odrzucona. Skontaktuj się z nami, aby ustalić inny termin.";
    $headers = "From: spotkanie@lukaszpietrzyk.pl";

    mail($email, $subject, $message, $headers);
    echo "Rezerwacja odrzucona i e-mail wysłany.";
}
?>
