import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Web3 from 'web3';

import ROYALTYABI from "./../contract_data/Royalty.json";
import addresses from "./../contract_data/dev.json";

import Gallery from '../pages/Gallery';
import Detail from '../pages/Detail';

import Navigation from '../components/Navigation';
import NotFound from '../pages/NotFound';

declare var window: any

export default () => {
  const { ethereum } = window;
  // ts-ignore
  const [royaltyContract, setRoyaltyContract] = useState(undefined);
  const [web3, setWeb3] = useState(undefined);
  const [address, setAddress] = useState("");

  useEffect(() => {
    ethereum.request({ method: "eth_requestAccounts" });
    let web3 = new Web3(
      new Web3.providers.HttpProvider("http://localhost:8545")
    );
    // @ts-ignore
    setWeb3(web3);
    // @ts-ignore
    setRoyaltyContract(new web3.eth.Contract(ROYALTYABI, addresses.royalty));
  }, []);

  useEffect(() => {
    async function fetchAddress() {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log(accounts);
      const account = accounts[0];
      setAddress(account[0]);
      console.log("=============== address: " + address)
    }

    fetchAddress();
  }, []);

  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Gallery />} />
        <Route path="/software/:id" element={<Detail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
