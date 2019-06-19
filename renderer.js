const { ipcRenderer } = require("electron");

document.getElementById("main").innerHTML =
  "<h1>Connect your Ledger and open CasinoCoin app...</h1>";

ipcRenderer.on("casinocoinInfo", (event, arg) => {
  const h1 = document.createElement("h2");
  h1.textContent = arg.address;
  document.getElementById("main").innerHTML =
    "<h1>Your first CasinoCoin address:</h1>";
  document.getElementById("main").appendChild(h1);
  // ipcRenderer.send("verifyCasinoCoinInfo");

  var address = document.createElement('input');
  address.type = 'text';
  address.id = 'address';
  address.placeholder = 'Destination Address';
  document.body.appendChild(address);

  var amount = document.createElement('input');
  amount.type = 'text';
  amount.id = 'amount';
  amount.placeholder = 'Amount';
  document.body.appendChild(amount);

  var button = document.createElement('button');
  button.innerHTML = 'Submit Transaction';
  button.onclick = function(){
    var address = document.getElementById('address').value;
    var amount = document.getElementById('amount').value;
    document.getElementById('address').value = '';
    document.getElementById('amount').value = '';
    ipcRenderer.send("requestCasinoCoinSignTransaction", [address, amount]);
  };
  document.body.appendChild(button);
});

ipcRenderer.send("requestCasinoCoinInfo");
