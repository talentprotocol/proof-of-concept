"use strict";

/**
 * Example JavaScript code that interacts with the page and Web3 wallets
 */

 // Unpkg imports
const Web3Modal = window.Web3Modal.default;
const WalletConnectProvider = window.WalletConnectProvider.default;

const Fortmatic = window.Fortmatic;
const evmChains = window.evmChains;

// Web3modal instance
let web3Modal

// Chosen wallet provider given by the dialog window
let provider;


// Address of the selected account
let selectedAccount;

let ethRates;

function getEthRates(callback)
{
    var xobj = new XMLHttpRequest();
    xobj.open('GET', 'https://min-api.cryptocompare.com/data/price?tsyms=USD&fsym=ETH', true);
	
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
              callback(xobj.responseText);
          }
    };
    xobj.send(null); 
}


function storeTransaction(talentId, transactionId, email, amount) {
    var xobj = new XMLHttpRequest();
    xobj.open('GET', 'api/storeTransaction.php?' + 'talentId=' + talentId + '&transactionId=' + transactionId + '&email=' + email + '&amount=' + amount, true);

    xobj.onreadystatechange = function () { };
    xobj.send(null);
}


function updateEstimatedUsd(eth) {
    document.querySelector("#investmentHelp").textContent = "Estimated USD: " + parseFloat(ethRates.USD * eth).toFixed(2);
}

/**
 * Setup the orchestra
 */
function init() {

    console.log("Initializing example");
    console.log("WalletConnectProvider is", WalletConnectProvider);
  console.log("Fortmatic is", Fortmatic);
  console.log("window.web3 is", window.web3, "window.ethereum is", window.ethereum);

    getEthRates(function (response) { ethRates = JSON.parse(response); console.log("ethRates: " + ethRates.USD); updateEstimatedUsd(0.50); });

  // Check that the web page is run in a secure context,
  // as otherwise MetaMask won't be available
  if(location.protocol !== 'https:') {
    const alert = document.querySelector("#alert-error-https");
    alert.style.display = "block";
    document.querySelector("#btn-connect").setAttribute("disabled", "disabled")
    return;
  }

  // Tell Web3modal what providers we have available.
  // Built-in web browser provider (only one can exist as a time)
  // like MetaMask, Brave or Opera is added automatically by Web3modal
  const providerOptions = {
      walletconnect: {
          package: WalletConnectProvider,
          options: {
              // Mikko's test key - don't copy as your mileage may vary
              infuraId: "e91c45f37e5b4b968f0d3212865358ec",
          }
      },
  };

  web3Modal = new Web3Modal({
    cacheProvider: false, // optional
    providerOptions, // required
    disableInjectedProvider: false, // optional. For MetaMask / Brave / Opera.
  });

  console.log("Web3Modal instance is", web3Modal);
}


/**
 * Kick in the UI action after Web3modal dialog has chosen a provider
 */
async function fetchAccountData() {


  // Get a Web3 instance for the wallet
  const web3 = new Web3(provider);

  console.log("Web3 instance is", web3);

  // Get connected chain id from Ethereum node
  const chainId = await web3.eth.getChainId();
  // Load chain information over an HTTP API
  const chainData = evmChains.getChain(chainId);

  // Get list of accounts of the connected wallet
  const accounts = await web3.eth.getAccounts();

  // MetaMask does not give you all accounts, only the selected account
  console.log("Got accounts", accounts);
  selectedAccount = accounts[0];

  // Get a handl
  const template = document.querySelector("#template-balance");
  const accountContainer = document.querySelector("#accounts");

  // Purge UI elements any previously loaded accounts
  accountContainer.innerHTML = '';

  // Go through all accounts and get their ETH balance
  const rowResolvers = accounts.map(async (address) => {
    const balance = await web3.eth.getBalance(address);
    // ethBalance is a BigNumber instance
    // https://github.com/indutny/bn.js/
    const ethBalance = web3.utils.fromWei(balance, "ether");
      const humanFriendlyBalance = parseFloat(ethBalance).toFixed(4);

      var ethRateConvertedUsd = parseFloat(ethRates.USD * humanFriendlyBalance).toFixed(2);

    // Fill in the templated row and put in the document
    const clone = template.content.cloneNode(true);
    clone.querySelector(".address").textContent = address;
      clone.querySelector(".balance").textContent = humanFriendlyBalance + " (" + ethRateConvertedUsd + "$)";
    accountContainer.appendChild(clone);
  });

  
  // Because rendering account does its own RPC commucation
  // with Ethereum node, we do not want to display any results
  // until data for all accounts is loaded
  await Promise.all(rowResolvers);

  // Display fully loaded UI for wallet data
  document.querySelector("#prepare").style.display = "none";
    document.querySelector("#connected").style.display = "block";

    document.querySelector("#progress").style.display = "block";
    document.querySelector("#btn-invest").style.display = "block";

}

async function getAccountBalance() {

    const web3 = new Web3(provider);
    var receiverAddress = document.querySelector("#receiverAddress").innerHTML;

    console.log("receiverAddress: " + receiverAddress);

    const balance = await web3.eth.getBalance(receiverAddress);

    const ethBalance = web3.utils.fromWei(balance, "ether");
    const humanFriendlyBalance = parseFloat(ethBalance).toFixed(4);

    var ethRateConvertedUsd = parseFloat(ethRates.USD * humanFriendlyBalance).toFixed(2);

    var percentageGoal = ((ethRateConvertedUsd / 10000) * 100).toFixed(2);
    
    document.querySelector("#balanceAddress").innerHTML = humanFriendlyBalance + " ETH (" + ethRateConvertedUsd + "$)";

    document.querySelector("#progressBar").innerHTML = percentageGoal + "%";
    document.querySelector("#progressBar").style = "width: " + percentageGoal + "%";

    
    console.log("ETH balance: " + humanFriendlyBalance);
    console.log("ETH Converted usd: " + ethRateConvertedUsd);
}

/*
async function getAccountDataUsdt(selectedAccount) {

	let minABI = [
	  // balanceOf
	  {
		"constant":true,
		"inputs":[{"name":"_owner","type":"address"}],
		"name":"balanceOf",
		"outputs":[{"name":"balance","type":"uint256"}],
		"type":"function"
	  },
	  // decimals
	  {
		"constant":true,
		"inputs":[],
		"name":"decimals",
		"outputs":[{"name":"","type":"uint8"}],
		"type":"function"
	  }
	];

  const web3 = new Web3(provider);

  contract = new web3.eth.Contract(minABI,contractAddress);
  
  const balance = await contract.methods.balanceOf(selectedAccount).call();
  
  const decimals = await contract.methods.decimals().call();
  
  const finalBalance = parseFloat(balance) / Math.pow(10, decimals);
  console.log("BALANCE: " + finalBalance);
  
	//document.querySelector("#usdt").textContent = "USDT Balance: " + finalBalance;
	
}*/


/**
 * Fetch account data for UI when
 * - User switches accounts in wallet
 * - User switches networks in wallet
 * - User connects wallet initially
 */
async function refreshAccountData() {

  // If any current data is displayed when
  // the user is switching acounts in the wallet
  // immediate hide this data
  document.querySelector("#connected").style.display = "none";
  document.querySelector("#prepare").style.display = "block";

  // Disable button while UI is loading.
  // fetchAccountData() will take a while as it communicates
  // with Ethereum node via JSON-RPC and loads chain data
  // over an API call.
  document.querySelector("#btn-connect").setAttribute("disabled", "disabled")
  await fetchAccountData(provider);
  document.querySelector("#btn-connect").removeAttribute("disabled")
}


/**
 * Connect wallet button pressed.
 */
async function onConnect() {

      console.log("Opening a dialog", web3Modal);
      try {
        provider = await web3Modal.connect();
      } catch(e) {
        console.log("Could not get a wallet connection", e);
        return;
      }

      // Subscribe to accounts change
      provider.on("accountsChanged", (accounts) => {
        fetchAccountData();
      });

      // Subscribe to chainId change
      provider.on("chainChanged", (chainId) => {
        fetchAccountData();
      });

      // Subscribe to networkId change
      provider.on("networkChanged", (networkId) => {
        fetchAccountData();
      });

    await getAccountBalance();
    await refreshAccountData();
}

/**
 * Disconnect wallet button pressed.
 */
async function onDisconnect() {

  console.log("Killing the wallet connection", provider);

  // TODO: Which providers have close method?
  if(provider.close) {
    await provider.close();

    // If the cached provider is not cleared,
    // WalletConnect will default to the existing session
    // and does not allow to re-scan the QR code with a new wallet.
    // Depending on your use case you may want or want not his behavir.
    await web3Modal.clearCachedProvider();
    provider = null;
  }

  selectedAccount = null;

  // Set the UI back to the initial state
  document.querySelector("#prepare").style.display = "block";
    document.querySelector("#connected").style.display = "none";

    document.querySelector("#btn-invest").style.display = "none";
    document.querySelector("#my_investment").style.display = "none";
    document.querySelector("#progress").style.display = "none";
}


function onInvest() {
    document.querySelector("#my_investment").style.display = "block";
}

async function onSend() {

    const web3 = new Web3(provider);

    var talentId = document.querySelector("#talentId").innerHTML;
    var receiverAddress = document.querySelector("#receiverAddress").innerHTML;
    var transferAmount = document.querySelector("#inputInvestment").value;
    var emailInput = document.querySelector("#inputEmail").value;
	
	var wei = web3.utils.toWei(transferAmount, 'ether');
	
	web3.eth.sendTransaction({
	  from: selectedAccount,
	  to: receiverAddress,
	  value: wei,
    }, function (error, result) {
            if (error) { alert(error.message); }
            else {
                console.log(result); fetchAccountData();
                storeTransaction(talentId, result, emailInput, transferAmount);
                alert("You've submmited your investment successfully.");
            }

            
    });

}

/**
 * Main entry point.
 */
window.addEventListener('load', async () => {
    init();
    
    document.querySelector("#btn-connect").addEventListener("click", onConnect);
    document.querySelector("#btn-disconnect").addEventListener("click", onDisconnect);
    document.querySelector("#btn-invest").addEventListener("click", onInvest);
    document.querySelector("#btn-send").addEventListener("click", onSend);
});
