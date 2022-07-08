const web3 = new Web3(Web3.givenProvider || "ws://localhost:7545");
// var web3 = new Web3(new Web3.providers.WebsocketProvider("ws://localhost:7545"));
console.log(web3);
window.web3 = web3;
// console.log(web3);
// // const web3 = new Web3("http://localhost:8545")

import Greeter from '/artifacts/DAO.json'

console.log("Greeter ABI: ", Greeter.abi)

web3.eth.getBlockNumber(function (error, result) {
  console.log(result)
})
let web3js;
window.addEventListener('load', function() {


    var myContract;
    function startApp() {
        var myContractsAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
        myContract = new web3js.eth.Contract(myContractsAddressABI, myContractsAddress);
      }

    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
        // Use Mist/MetaMask's provider
        web3js = new Web3(web3.currentProvider);
    } else {
        // Handle the case where the user doesn't have web3. Probably
        // show them a message telling them to install Metamask in
        // order to use our app.
    }

    // Now you can start your app & access web3js freely:
    startApp()

})