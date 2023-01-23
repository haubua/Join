<?php

switch ($_SERVER['REQUEST_METHOD']) {
    case ("OPTIONS"): //Allow preflighting to take place.
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: POST");
        header("Access-Control-Allow-Headers: content-type");
        exit;
    case ("POST"): //Send the email;
        header("Access-Control-Allow-Origin: *");

        $email = $_POST['email'];

        $message = "Hello,\n
        \nFollow this link to reset your JOIN password for your " . $email . " account.\n
        \nhttps://robert-hahn.developerakademie.net/resetPassword.html?email=" . $email . "\n
        \nIf you didn't ask to reset your password, you can ignore this email.\n
        \nThanks,\n
        \nYour Join team\n";

        $recipient = $email;
        $subject = "Reset your password for JOIN App";
        $headers = "From:  noreply@https://robert-hahn.developerakademie.net";

        $result = mail($recipient, $subject, $message, $headers);
        print($result);
        # header("Location: " . $redirect);

        break;
    default: //Reject any non POST or OPTIONS requests.
        header("Allow: POST", true, 405);
        exit;
}