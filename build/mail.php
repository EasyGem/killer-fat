<?php

$orderCustomerName = $_POST['orderCustomerName'];
$orderCustomerPhone = $_POST['orderCustomerPhone'];
$orderName = $_POST['orderName'];
$orderDays = $_POST['orderDays'];
$orderPrice = $_POST['orderPrice'];
$formcontent="Сообщение с сайта KillerFood\n\nИмя: $orderCustomerName \n\nТелефон: $orderCustomerPhone";

if($orderName) {
    $formcontent .= "\n\nЗаказал: $orderName \nТариф: $orderDays \nСтоимость: $orderPrice";
} else {
    $formcontent .= "\n\nЗаявка на консультацию.";
}

$recipient = "san4es-ag@yandex.ru";
// $recipient = "";
$subject = "KillerFood – Заявка с сайта";

if(isset($orderCustomerName) and isset($orderCustomerPhone)) {
    mail($recipient, $subject, $formcontent);
}

?>
