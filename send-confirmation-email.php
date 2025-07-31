<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $date = $_POST["date"];
    $slot = $_POST["slot"];

    $to = $email;
    $subject = "Potwierdzenie rezerwacji spotkania";
    $message = "Cześć $name,\n\nTwoja rezerwacja na $date o $slot została przyjęta i oczekuje na potwierdzenie.\n\nDziękujemy!";
    $headers = "From: spotkanie@lukaszpietrzyk.pl";

    mail($to, $subject, $message, $headers);

    // Send notification to admin
    $accept_url = "https://lukaszpietrzyk.pl/accept-booking.php?email=" . urlencode($email) . "&date=" . urlencode($date) . "&slot=" . urlencode($slot) . "&name=" . urlencode($name);
    $deny_url = "https://lukaszpietrzyk.pl/deny-booking.php?email=" . urlencode($email) . "&date=" . urlencode($date) . "&slot=" . urlencode($slot) . "&name=" . urlencode($name);
    $admin_message = "Nowa rezerwacja od $name ($email) na $date o $slot.\n\nAkceptuj: $accept_url\nOdrzuć: $deny_url";
    mail("spotkanie@lukaszpietrzyk.pl", "Nowa rezerwacja spotkania", $admin_message, $headers);

    echo "success";
}
?>
