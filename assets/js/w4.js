//1 - connectMetamask
var MyAccount;
var chainId = '31337'; // hardhat
var _contractAddress = '0x663F3ad617193148711d28f5334eE4Ed07016602';
var token_price = 0;
var _contractABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "_spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "success",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "buyToken",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "success",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "_from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "_to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "success",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "remaining",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "balance",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "theDecimal",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getPriceToken",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "tokenPrice",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "theName",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "theSymbol",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "theTotalSupply",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

const connectMetamask = async (auto) => {
	
	if (window.ethereum !== 'undifiden') {
		console.log('s');
		let accounts;
		accounts = await ethereum.request({method: 'eth_accounts'});
		if (accounts && accounts.length > 0) {
			console.log("user is connected");
		} else {
			console.log("user not connected");
			if (!auto){
				accounts = await ethereum.request({method: 'eth_requestAccounts'});
				console.log('amal');
			}
		}
		MyAccount = accounts[0]
		console.log('account - ', MyAccount)
		var str1 = MyAccount.slice(0,5);
		var str2 = MyAccount.substr(MyAccount.length - 5);
		to_button = str1 + '...' + str2
		cm_button.innerHTML = to_button
    }
	if (window.ethereum.networkVersion !== chainId) {
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: web3.utils.toHex(chainId) }]
        });
      } catch (err) {
          // This error code indicates that the chain has not been added to MetaMask
        if (err.code === 4902) {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainName: 'hardhatt',
                chainId: web3.utils.toHex(chainId),
                nativeCurrency: { name: 'GO', decimals: 18, symbol: 'GO' },
                // rpcUrls: ['https://polygon-rpc.com/']
              }
            ]
          });
        }
      }
    }

	
	//  document.getElementId('accountArea').innerHTML = account;
}
//2 - connectContract
const connectContract = async () => {
	const ABI = _contractABI;
	const Address = _contractAddress;
	window.web3 = await new Web3(window.ethereum);
	window.contract = await new window.web3.eth.Contract(ABI, Address);
	console.log('connect contract success');
}

//3 - get from contract 
const getDataFromContract = async () => {
	const data = await window.contract.methods.greet().call().then(function(result) {
		console.log("Zombie 15: " + JSON.stringify(result));
	})
}
//4 - add to contract
const addDataToContract = async (text) => {
	console.log('MyAccount', MyAccount);
	
	const data = await window.contract.methods.setGreeting(text)
	.send({from: MyAccount})
	.on("receipt", function(receipt) {
		// $("#txStatus").text("Successfully created " + name + "!");
		console.log('success', name);
		// Transaction was accepted into the blockchain, let's redraw the UI
		// getZombiesByOwner(userAccount).then(displayZombies);
	})
	.on("error", function(error) {
		console.log('error', error);
		// Do something to alert the user their transaction has failed
		// $("#txStatus").text(error);
	});
}

//5 - buy token
const buyToken = async (count) => {
	console.log('MyAccount', MyAccount);
	console.log('count', count);
	token_price = await getPrice()
	v = web3.utils.toWei(`${count * token_price}`, "wei");
	const data = await window.contract.methods.buyToken()
	.send({from: MyAccount, value: v})
	.on("receipt", function(receipt) {
		// $("#txStatus").text("Successfully created " + name + "!");
		console.log('success', receipt);
		// Transaction was accepted into the blockchain, let's redraw the UI
		// getZombiesByOwner(userAccount).then(displayZombies);
	})
	.on("error", function(error) {
		console.log('error', error);
		// Do something to alert the user their transaction has failed
		// $("#txStatus").text(error);
	});
}

//6 - get balance
const getBalance = async (account) => {
	console.log('MyAccount', MyAccount);
	const data = await window.contract.methods.balanceOf(account).call().then(function(result) {
		console.log("Balance account-" + JSON.stringify(result));
	})
}

//7 - transfer
const transfer = async (_to, _amount) => {
	console.log(`Transfer - ${MyAccount} to - ${_to} - ${_amount}`);
	const data = await window.contract.methods.transfer(_to, _amount)
	.send({from: MyAccount})
	.on("receipt", function(receipt) {
		// $("#txStatus").text("Successfully created " + name + "!");
		console.log('success', name);
		// Transaction was accepted into the blockchain, let's redraw the UI
		// getZombiesByOwner(userAccount).then(displayZombies);
	})
	.on("error", function(error) {
		console.log('error', error);
		// Do something to alert the user their transaction has failed
		// $("#txStatus").text(error);
	});
}


//7 - get token price
const getPrice = async () => {
	return await window.contract.methods.getPriceToken().call().then(function (result) {
		console.log("Price token -" + result, parseFloat(result) + 2);
		return result
	})
}

window.addEventListener('load', function() {
	connectMetamask(true)
	connectContract()
	window.ethereum.on('all', async(data) => {
		console.log(data);
	});
	
})