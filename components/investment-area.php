<?php 
// 1 - Pedro | 2 - Andreas | 3 - Filipe

$careerEquityPercentage = 20;
$careerGoalUSD = 10000;
$totalSupply = "5,000,000.00";
$initialOffering = "1,000,000.00";
$tokenStartingPrice = "0,01";

if (isset($_GET['id']))
{
    $id = $_GET['id'];

    // default wallet - Andreas
    $receiverAddress = "0xD8915c2C3bbd7A620464b75E47E0111beEA12071";

    if ($id == "1") {
        $receiverAddress = "0xD39a0FD246b2934D493Cd1a8fe3da327DB63E718";
        $teamMemberName = "Pedro";
        $teamMemberTicker = "\$PCBO";
    }
    else if ($id == "2") {
        $receiverAddress = "0xD8915c2C3bbd7A620464b75E47E0111beEA12071";
        $teamMemberName = "Andreas";
        $teamMemberTicker = "\$AVIL";
    }
    else if ($id == "3") {
        $receiverAddress = "0x5f23c81d20d15b1d6504add2599301cd668cec63";
        $teamMemberName = "Filipe";
        $teamMemberTicker = "\$FMAC";
    }
?>

<div class="col-lg-12 entries">

    <div class="entry">
        <h3 class="sidebar-title mb-3">Invest In <?php echo $teamMemberName; ?>'s Career</h3> <span style="display:none" id="talentId"><?php echo $id;?></span>
        <div class="row">
            <h6 class="w-50"><b>Ticker</b>: <?php echo $teamMemberTicker; ?></h6>
            <h6 class="w-50"><b>Total Supply</b>: <?php echo $totalSupply; ?> <?php echo $teamMemberTicker; ?></h6>
        </div>
        <div class="row">
            <h6 class="w-50"><b><?php echo $teamMemberTicker; ?> Token Price</b>: $<?php echo $tokenStartingPrice; ?></h6>
            <h6 class="w-50"><b>Initial Offering Size</b>: <?php echo $initialOffering; ?> <?php echo $teamMemberTicker; ?></h6>
        </div>
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

        <p>If you decide to invest in <?php echo $teamMemberName; ?>, your funds will be transferred to his personal wallet. But, as soon as the Talent Protocol launches publicly, your initial investment will be automatically transferred to the platform, and you will maintain the exact same share of tokens which, by then, will likely be worth exponentially more. At that point you are free to cash out your tokens at market price or to hold them for the long run.</p>
        <h3>Token Benefits and Uses</h3>
        <p>By buying and holding <?php echo $teamMemberTicker; ?> you are supporting this talent and participating in their career economy. As a <?php echo $teamMemberTicker; ?> holder you are eligible to the following benefits or rewards:</p>
        <ol>
            <li>"I will share monthly investor updates with all <?php echo $teamMemberTicker; ?> token holders."</li>
            <li>"Token holders can have a direct 1:1 communication channel with me."</li>
        </ol>
        <p class="text-muted"><i><b>Disclaimer</b>: This offering is experimental. Career tokens are not a security and should not be treated as such. This is not financial advice. This offering outcome may fail. Invest at your own risk.</i></p>
    </div>

</div>


<?php } ?>