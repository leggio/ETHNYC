import logo from "./logo.svg";
import "./App.css";

import React, { useState, useEffect } from "react";
import Web3 from "web3";
import ROYALTYABI from "./contract_data/Royalty.json";
import addresses from "./contract_data/dev.json";

function App() {
  const { ethereum } = window;
  const [royaltyContract, setRoyaltyContract] = useState(undefined);
  const [web3, setWeb3] = useState(undefined);
  const [address, setAddress] = useState(undefined);

  useEffect(() => {
    ethereum.request({ method: "eth_requestAccounts" });
    let web3 = new Web3(
      new Web3.providers.HttpProvider("http://localhost:8545")
    );
    setWeb3(web3);
    setRoyaltyContract(new web3.eth.Contract(ROYALTYABI, addresses.royalty));
  }, []);

  useEffect(() => {
    async function fetchAddress() {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      const account = accounts[0];
      setAddress(account);
      console.log("=============== address: " + address)
    }

    fetchAddress();
  }, []);

  if (address === undefined || royaltyContract === undefined) {
    console.log("address not yet loaded");
    return <div className="App"></div>;
  } else {
    console.log(address);
    console.log(royaltyContract);
    return (
      <div className="App">
        <h1>{address}</h1>
      </div>
    );
  }
}

export default App;
