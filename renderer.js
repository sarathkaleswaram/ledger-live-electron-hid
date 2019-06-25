const { ipcRenderer } = require("electron");

document.getElementById("main").innerHTML =
  "<h1>Connect your Ledger and open CasinoCoin app...</h1>";

ipcRenderer.on("casinocoinInfo", (event, arg) => {
  const h1 = document.createElement("h2");
  h1.textContent = arg.address;

  var a = document.createElement('a');
  a.appendChild(h1);
  a.href = "#";
  a.onclick = function() {
    ipcRenderer.send("redirectToExplorer", arg.address);
  }

  document.getElementById("main").innerHTML =
    "<h1>Your first CasinoCoin address:</h1>";
  document.getElementById("main").appendChild(a);

  const balance = document.createElement("h4");
  balance.id = "balance";
  balance.textContent = "Balance: 0 CSC";
  document.getElementById("main").appendChild(balance);

  var verify = document.createElement('button');
  verify.innerHTML = 'Verify Address';
  verify.onclick = function() {
    ipcRenderer.send("verifyCasinoCoinInfo");
  }
  document.getElementById("main").appendChild(verify);

  document.getElementById("main").appendChild(document.createElement("br"));
  document.getElementById("main").appendChild(document.createElement("br"));

  var address = document.createElement('input');
  address.type = 'text';
  address.id = 'address';
  address.placeholder = 'Destination Address';
  document.getElementById("main").appendChild(address);
  // document.body.appendChild(address);
  
  var destinationTag = document.createElement('input');
  destinationTag.type = 'number';
  destinationTag.id = 'destinationTag';
  destinationTag.placeholder = 'Destination Tag';
  document.getElementById("main").appendChild(destinationTag);

  var amount = document.createElement('input');
  amount.type = 'text';
  amount.id = 'amount';
  amount.placeholder = 'Amount';
  document.getElementById("main").appendChild(amount);
  // document.body.appendChild(amount);

  var submit = document.createElement('button');
  submit.innerHTML = 'Submit Transaction';
  submit.onclick = function(){
    var address = document.getElementById('address').value;
    var destinationTag = document.getElementById('destinationTag').value;
    var amount = document.getElementById('amount').value;
    document.getElementById('address').value = '';
    document.getElementById('amount').value = '';
    ipcRenderer.send("requestCasinoCoinSignTransaction", [address, destinationTag, amount]);
  };
  document.getElementById("main").appendChild(submit);
  // document.body.appendChild(submit);
});

ipcRenderer.on("updateBalance", (event, arg) => {
  document.getElementById('balance').textContent = "Balance: " + arg + " CSC";
});

ipcRenderer.send("requestCasinoCoinInfo");
