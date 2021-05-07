<?php

if (isset($_GET['talentId']) && isset($_GET['transactionId']) && isset($_GET['email']) && isset($_GET['amount']))
{
	$talentId = $_GET['talentId'];
	$transactionId = $_GET['transactionId'];
	$email = $_GET['email'];
	$amount = $_GET['amount'];

	$data = $talentId . "|" . $transactionId . "|" . $email . "|" . $amount . "\r\n";

	file_put_contents('transactions.txt', $data, FILE_APPEND);

}
?>