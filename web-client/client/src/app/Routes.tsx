import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Web3 from 'web3';

import ROYALTYABI from './../contract_data/Royalty.json';
import addresses from './../contract_data/dev.json';

import Gallery from '../pages/Gallery';
import Detail from '../pages/Detail';
import Create from '../pages/Create';
import Home from '../pages/Home';

import Navigation from '../components/Navigation';
import NotFound from '../pages/NotFound';

declare var window: any;

export default () => {
  const { ethereum } = window;
  // ts-ignore
  const [royaltyContract, setRoyaltyContract] = useState(undefined);
  const [web3, setWeb3] = useState(undefined);
  const [address, setAddress] = useState<string>('');

  useEffect(() => {
    ethereum.request({ method: 'eth_requestAccounts' });
    let web3 = new Web3(
      new Web3.providers.HttpProvider('http://localhost:8545')
    );
    // @ts-ignore
    setWeb3(web3);
    // @ts-ignore
    setRoyaltyContract(new web3.eth.Contract(ROYALTYABI, addresses.royalty));
  }, []);

  useEffect(() => {
    async function fetchAddress() {
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts'
      });
      const account = accounts[0];
      setAddress(account);
    }

    console.log(address);

    fetchAddress();
  }, [address]);

  console.log('==========');
  console.log(address);
  console.log(royaltyContract);

  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/gallery"
          element={
            <Gallery
              address={address}
              royaltyContractInstance={royaltyContract}
            />
          }
        />
        <Route
          path="/create"
          element={
            <Create
              address={address}
              royaltyContractInstance={royaltyContract}
            />
          }
        />
        <Route path="/software/:id" element={<Detail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
