<?php 
// 1 - Pedro | 2 - Andreas | 3 - Filipe

$careerEquityPercentage = 20;
$careerGoalUSD = 10000;

if (isset($_GET['id']))
{
    $id = $_GET['id'];

    // default wallet - Andreas
    $receiverAddress = "0xD8915c2C3bbd7A620464b75E47E0111beEA12071";

    if ($id == "1") { $receiverAddress = "0xD39a0FD246b2934D493Cd1a8fe3da327DB63E718"; }
    else if ($id == "2") { $receiverAddress = "0xD8915c2C3bbd7A620464b75E47E0111beEA12071"; }
    else if ($id == "3") { $receiverAddress = "0xD8915c2C3bbd7A620464b75E47E0111beEA12071"; }
?>

<div class="col-lg-12 entries">

    <div class="entry">

        <h3 class="sidebar-title">TOKEN CAREER INVESTMENT</h3> <span style="display:none" id="talentId"><?php echo $id;?></span>
        <h6 class="sidebar-title">CAREER EQUITY: <?php echo $careerEquityPercentage; ?>%</h6>
        <h6 class="sidebar-title">CAREER INVESTMENT GOAL: <?php echo $careerGoalUSD; ?> USD</h6>
        <br/>
        
        <div id="progress" style="display:none">
            <div class="progress">
                <div id="progressBar" class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 20%"> 20% </div>
            </div>
            <p class="sidebar-title" style="color: #283B57; font-size: 0.8rem">Total investment to date:  <span id="balanceAddress"></span></p>

            <p style="color: #283B57; font-size: 0.8rem">Address: <span id="receiverAddress"><?php echo $receiverAddress; ?></span> </br> Currency: ETH (<i>or USDT ERC-20</i>)</p>

        </div>

        <div style="margin-top: 40px;">
            <?php  include "components/web3-wallet.php"; ?>
        </div>
    </div>

</div>


<?php } ?>