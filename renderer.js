const { ipcRenderer } = require("electron");

document.getElementById("main").innerHTML =
  "<h1>Connect your Ledger and open CasinoCoin app...</h1>";

ipcRenderer.on("casinocoinInfo", (event, arg) => {
  const h1 = document.createElement("h2");
  h1.textContent = arg.address;
  document.getElementById("main").innerHTML =
    "<h1>Your first CasinoCoin address:</h1>";
  document.getElementById("main").appendChild(h1);
  ipcRenderer.send("verifyCasinoCoinInfo");
});

ipcRenderer.send("requestCasinoCoinInfo");
